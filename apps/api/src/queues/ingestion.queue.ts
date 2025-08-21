import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { AIService } from '../../../packages/ai/src';
import ApplicantModel from '../../../packages/db/src/models/applicant';
import { IApplicant } from '../../../packages/db/src/models/applicant';

const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  maxRetriesPerRequest: null,
});

export const ingestionQueue = new Queue('ingestionQueue', { connection });

const aiService = new AIService();

// Worker to process jobs from the ingestionQueue
export const ingestionWorker = new Worker('ingestionQueue', async (job) => {
  const { filePath, applicantId } = job.data;
  console.log(`Processing ingestion job for applicant ${applicantId} from file: ${filePath}`);

  try {
    // In a real scenario, you'd read the file content here
    // For now, we'll use the filePath as resumeText directly
    const resumeText = filePath; // Placeholder for actual file reading

    const { extracted, embedding } = await aiService.extractAndEmbed(resumeText);

    // Update the applicant with extracted data and embeddings
    const updatedApplicant: IApplicant | null = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      {
        $set: {
          resumeText: resumeText, // Save the actual content if read
          extracted: {
            skills: extracted.skills,
            totalYearsExp: extracted.totalYearsExp,
            highestEducation: extracted.highestEducation,
            certifications: extracted.certifications,
            keywords: extracted.keywords,
          },
          vectors: {
            resumeEmbedding: embedding,
          },
        },
      },
      { new: true }
    );

    if (!updatedApplicant) {
      throw new Error(`Applicant with ID ${applicantId} not found.`);
    }

    console.log(`Successfully processed and updated applicant ${applicantId}`);
    return updatedApplicant;
  } catch (error) {
    console.error(`Error processing ingestion job for ${applicantId}:`, error);
    throw error; // Re-throw to mark job as failed
  }
}, { connection });

ingestionWorker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

ingestionWorker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} has failed with error ${err.message}`);
});