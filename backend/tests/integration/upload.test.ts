import request from 'supertest';
import app from '../../src/app'; // Your Express app
import mongoose from 'mongoose'; // Keep mongoose import for User.deleteMany
// Remove MongoMemoryServer import
import { processApplicantData } from '../../src/services/uploadService';
import { register, login } from '../../src/services/authService';
import User from '../../src/models/User';
import path from 'path';
import fs from 'fs';

jest.mock('../../src/services/uploadService');

jest.setTimeout(30000); // Keep timeout for individual test cases if needed

// Remove mongoServer declaration

describe('Upload API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Remove mongoServer setup and mongoose.connect()
    // The global setup will handle the connection

    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    };
    await register(testUser.name, testUser.email, testUser.password, testUser.role);
    const { token } = await login(testUser.email, testUser.password);
    authToken = token;
  });

  afterAll(async () => {
    await User.deleteMany({}); // Clean up test user
    // Remove mongoose.connection.close() and mongoServer.stop()
    // The global teardown will handle the disconnection
  });

  it('should upload applicant data successfully', async () => {
    // Create a dummy CSV file for testing
    const csvContent = "name,email,gpa,experience,skills\nJohn Doe,john.doe@example.com,3.8,2,JavaScript;Node.js\nJane Smith,jane.smith@example.com,3.9,3,Python;Machine Learning";
    const filePath = path.join(__dirname, 'test.csv');
    fs.writeFileSync(filePath, csvContent);

    // Mock the successful response from processApplicantData
    (processApplicantData as jest.Mock).mockResolvedValue({
      success: true,
      savedCount: 2,
      // receivedData: applicantData, // This is no longer directly returned
    });

    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .attach('file', filePath) // Use .attach() for file upload
      .field('someOtherField', 'someValue'); // Add any other fields if necessary

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('File uploaded and data processed successfully');
    expect(res.body.result.success).toBe(true);
    expect(res.body.result.savedCount).toBe(2);

    // Clean up the dummy CSV file
    fs.unlinkSync(filePath);
  });

  it('should return 500 if an error occurs during upload', async () => {
    // Create a dummy CSV file for testing
    const csvContent = "name,email,gpa,experience,skills\nError Applicant,error@example.com,3.0,0,None";
    const filePath = path.join(__dirname, 'error.csv');
    fs.writeFileSync(filePath, csvContent);

    // Mock the service to throw an error
    (processApplicantData as jest.Mock).mockRejectedValue(new Error('Simulated upload error'));

    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .attach('file', filePath) // Use .attach() for file upload
      .field('someOtherField', 'someValue'); // Add any other fields if necessary

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Simulated upload error');

    // Clean up the dummy CSV file
    fs.unlinkSync(filePath);
  });
});
