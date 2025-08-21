const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Applicant = require('../../src/models/Applicant');
const uploadService = require('../../src/services/uploadService');

let mongoServer;

describe('Upload Service', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    await Applicant.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should process and save valid applicant data', async () => {
    const applicantData = {
      applicants: [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          gpa: 3.8,
          experience: 2,
          skills: ['JavaScript', 'Node.js'],
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          gpa: 3.9,
          experience: 3,
          skills: ['Python', 'Machine Learning'],
        },
      ],
    };

    const result = await uploadService.processApplicantData(applicantData);

    expect(result.success).toBe(true);
    expect(result.savedCount).toBe(2);
    expect(result.savedApplicants.length).toBe(2);

    const savedApplicantsInDb = await Applicant.find({}).exec();
    expect(savedApplicantsInDb.length).toBe(2);
    expect(savedApplicantsInDb[0].email).toBe('john.doe@example.com');
  });

  it('should throw an error for invalid or empty applicant data', async () => {
    await expect(uploadService.processApplicantData({})).rejects.toThrow(
      'Invalid or empty applicant data provided.'
    );
    await expect(uploadService.processApplicantData({ applicants: [] })).rejects.toThrow(
      'Invalid or empty applicant data provided.'
    );
  });

  it('should handle errors for individual invalid applicants', async () => {
    const applicantData = {
      applicants: [
        {
          name: 'Valid Applicant',
          email: 'valid@example.com',
          gpa: 3.5,
          experience: 1,
          skills: ['React'],
        },
        {
          name: 'Invalid Applicant',
          email: 'invalid-email', // Invalid email
          gpa: 2.0,
          experience: 0,
          skills: ['HTML'],
        },
      ],
    };

    // Expect no throw, but console.error will be called internally
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await uploadService.processApplicantData(applicantData);

    expect(result.success).toBe(true);
    expect(result.savedCount).toBe(1); // Only the valid applicant should be saved
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();

    const savedApplicantsInDb = await Applicant.find({}).exec();
    expect(savedApplicantsInDb.length).toBe(1);
    expect(savedApplicantsInDb[0].email).toBe('valid@example.com');
  });
});