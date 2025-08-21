import request from 'supertest';
import app from '../../src/app'; // Your Express app
import mongoose from 'mongoose'; // Keep mongoose import for User.deleteMany
// Remove MongoMemoryServer import
import { performRanking } from '../../src/services/rankService';
import { register, login } from '../../src/services/authService';
import User from '../../src/models/User';

jest.mock('../../src/services/rankService');

jest.setTimeout(30000); // Keep timeout for individual test cases if needed

// Remove mongoServer declaration

describe('Rank API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Remove mongoServer setup and mongoose.connect()
    // The global setup will handle the connection

    const testUser = {
      name: 'Test User',
      email: 'testrank@example.com',
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

  it('should rank applicants successfully', async () => {
    const rankingCriteria = {
      criteria: {
        minGpa: 3.5,
        requiredSkills: ['Python', 'Machine Learning'],
      },
    };

    (performRanking as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Ranked Applicant 1', email: 'rank1@example.com', gpa: 3.8, experience: 2, skills: ['Python'], score: 100 },
      { id: '2', name: 'Ranked Applicant 2', email: 'rank2@example.com', gpa: 3.6, experience: 1, skills: ['Machine Learning'], score: 90 },
    ]);

    const res = await request(app)
      .post('/api/rank')
      .set('Authorization', `Bearer ${authToken}`)
      .send(rankingCriteria);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Applicants ranked successfully');
    expect(res.body.rankedApplicants).toBeDefined();
    expect(Array.isArray(res.body.rankedApplicants)).toBe(true);
    expect(res.body.rankedApplicants.length).toBeGreaterThan(0);
  });

  it('should return 500 if an error occurs during ranking', async () => {
    (performRanking as jest.Mock).mockRejectedValue(new Error('Simulated ranking error'));

    const rankingCriteria = {
      criteria: {
        minGpa: 3.0,
      },
    };

    const res = await request(app)
      .post('/api/rank')
      .set('Authorization', `Bearer ${authToken}`)
      .send(rankingCriteria);

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Simulated ranking error');
  });
});