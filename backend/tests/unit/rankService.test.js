const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Applicant = require('../../src/models/Applicant');
const rankService = require('../../src/services/rankService');

let mongoServer;

describe('Rank Service', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    await Applicant.deleteMany({}).exec();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should return ranked applicants based on dummy scoring', async () => {
    const applicantsData = [
      {
        name: 'Applicant C',
        email: 'c@example.com',
        gpa: 3.0,
        experience: 1,
        skills: ['JS'],
      },
      {
        name: 'Applicant A',
        email: 'a@example.com',
        gpa: 3.8,
        experience: 3,
        skills: ['Python', 'ML', 'AI'],
      },
      {
        name: 'Applicant B',
        email: 'b@example.com',
        gpa: 3.5,
        experience: 2,
        skills: ['Java', 'Spring'],
      },
    ];

    await Applicant.insertMany(applicantsData);

    const rankedApplicants = await rankService.performRanking({});

    expect(rankedApplicants).toBeDefined();
    expect(rankedApplicants.length).toBe(3);

    // Expecting Applicant A to be ranked highest based on dummy scoring
    expect(rankedApplicants[0].email).toBe('a@example.com');
    expect(rankedApplicants[0].score).toBeGreaterThan(rankedApplicants[1].score);
  });

  it('should return an empty array if no applicants are found', async () => {
    const rankedApplicants = await rankService.performRanking({});
    expect(rankedApplicants).toEqual([]);
  });
});