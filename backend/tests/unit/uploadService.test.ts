import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Applicant, { IApplicant } from '../../src/models/Applicant';
import { processApplicantData } from '../../src/services/uploadService'; // Import named export

let mongoServer: MongoMemoryServer;

describe('Upload Service', () => {
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

  it('should process and save valid applicant data', async () => {
    const applicantData = {
      applicants: [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          gpa: 3.8,
          experience: 2,
          skills: 'JavaScript, Node.js', // Assuming skills are comma-separated string from CSV
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          gpa: 3.9,
          experience: 3,
          skills: 'Python, Machine Learning',
        },
      ],
    };

    const result = await processApplicantData(applicantData); // Use named import

    expect(result.success).toBe(true);
    expect(result.savedCount).toBe(2);
    expect(result.savedApplicants?.length).toBe(2); // Use optional chaining

    const savedApplicantsInDb: IApplicant[] = await Applicant.find({}).exec(); // Type savedApplicantsInDb
    expect(savedApplicantsInDb.length).toBe(2);
    expect(savedApplicantsInDb[0].email).toBe('john.doe@example.com');
  });

  it('should throw an error for invalid or empty applicant data', async () => {
    await expect(processApplicantData({} as any)).rejects.toThrow( // Cast to any for empty object
      'Invalid or empty applicant data provided.'
    );
    await expect(processApplicantData({ applicants: [] })).rejects.toThrow(
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
          skills: 'React',
        },
        {
          name: 'Invalid Applicant',
          email: 'invalid-email', // Invalid email
          gpa: 2.0,
          experience: 0,
          skills: 'HTML',
        },
      ],
    };

    const result = await processApplicantData(applicantData);

    expect(result.success).toBe(false);
    expect(result.savedCount).toBe(1);
    expect(result.errors).toBeDefined(); // Check that errors array is defined
    expect(result.errors?.length).toBe(1); // Check that there is one error
    expect(result.errors?.[0].applicant).toBe('invalid-email'); // Check the content of the error

    const savedApplicantsInDb: IApplicant[] = await Applicant.find({}).exec();
    expect(savedApplicantsInDb.length).toBe(1);
    expect(savedApplicantsInDb[0].email).toBe('valid@example.com');
  });
});