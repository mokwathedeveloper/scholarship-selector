const request = require('supertest');
const app = require('../../src/app'); // Your Express app
const mongoose = require('mongoose');

describe('Upload API', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should upload applicant data successfully', async () => {
    const applicantData = {
      applicants: [
        { name: 'Test Applicant 1', email: 'test1@example.com' },
        { name: 'Test Applicant 2', email: 'test2@example.com' },
      ],
    };

    const res = await request(app)
      .post('/api/upload')
      .send(applicantData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Data uploaded successfully');
    expect(res.body.result.success).toBe(true);
    expect(res.body.result.receivedData).toEqual(applicantData);
  });

  it('should return 500 if an error occurs during upload', async () => {
    // Mock the service to throw an error
    jest.spyOn(require('../../src/services/uploadService'), 'processApplicantData').mockImplementationOnce(() => {
      throw new Error('Simulated upload error');
    });

    const applicantData = {
      applicants: [
        { name: 'Error Applicant', email: 'error@example.com' },
      ],
    };

    const res = await request(app)
      .post('/api/upload')
      .send(applicantData);

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Server Error');
    expect(res.body.error).toEqual('Simulated upload error');
  });
});