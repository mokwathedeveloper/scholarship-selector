const request = require('supertest');
const app = require('../../src/app'); // Your Express app
const mongoose = require('mongoose');

describe('Rank API', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should rank applicants successfully', async () => {
    const rankingCriteria = {
      criteria: {
        minGpa: 3.5,
        requiredSkills: ['Python', 'Machine Learning'],
      },
    };

    const res = await request(app)
      .post('/api/rank')
      .send(rankingCriteria);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Applicants ranked successfully');
    expect(res.body.rankedApplicants).toBeDefined();
    expect(Array.isArray(res.body.rankedApplicants)).toBe(true);
    expect(res.body.rankedApplicants.length).toBeGreaterThan(0);
  });

  it('should return 500 if an error occurs during ranking', async () => {
    // Mock the service to throw an error
    jest.spyOn(require('../../src/services/rankService'), 'performRanking').mockImplementationOnce(() => {
      throw new Error('Simulated ranking error');
    });

    const rankingCriteria = {
      criteria: {
        minGpa: 3.0,
      },
    };

    const res = await request(app)
      .post('/api/rank')
      .send(rankingCriteria);

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Server Error');
    expect(res.body.error).toEqual('Simulated ranking error');
  });
});