import Applicant, { IApplicant } from '../models/Applicant';
import csv from 'csv-parser';
import fs from 'fs';
import { CsvApplicantData, ProcessApplicantDataPayload } from '../types/upload';
import AppError from '../utils/AppError'; // Import AppError

interface ProcessApplicantDataResult {
  success: boolean;
  savedCount: number;
  errors?: { applicant: string; message: string; details: string[] }[];
  savedApplicants?: IApplicant[];
}

// Removed CustomError interface as AppError is used

const processApplicantData = async (payload: ProcessApplicantDataPayload): Promise<ProcessApplicantDataResult> => {
  // 1. Data validation (basic example, more comprehensive validation would be needed)
  if (!payload || !Array.isArray(payload.applicants) || payload.applicants.length === 0) {
    throw new AppError('Invalid or empty applicant data provided. Expected an object with an "applicants" array.', 400); // Use AppError
  }

  const savedApplicants: IApplicant[] = [];
  const errors: { applicant: string; message: string; details: string[] }[] = []; // Collect errors

  for (const applicantData of payload.applicants) { // Use payload.applicants
    try {
      // 2. Data transformation (if needed, e.g., normalize skills)
      // For now, directly save to model
      // Convert skills string to array
      const skillsArray = applicantData.skills ? applicantData.skills.split(',').map(s => s.trim()) : [];

      // 3. Saving data to the database (Applicant model)
      const applicant = new Applicant({
        name: applicantData.name,
        email: applicantData.email,
        gpa: applicantData.gpa,
        experience: applicantData.experience,
        skills: skillsArray,
      });
      const savedApplicant = await applicant.save();
      savedApplicants.push(savedApplicant);
    } catch (error: unknown) {
      // Collect individual applicant saving errors
      if (error instanceof Error) {
        errors.push({
          applicant: applicantData.email || 'unknown',
          message: error.message,
          details: (error as any).errors ? Object.keys((error as any).errors).map((key: string) => (error as any).errors[key].message) : [],
        });
      } else {
        errors.push({
          applicant: applicantData.email || 'unknown',
          message: 'An unknown error occurred',
          details: [],
        });
      }
    }
  }

  if (errors.length > 0) {
    // If there are errors, return a partial success or a failure with details
    return { success: false, savedCount: savedApplicants.length, errors: errors, savedApplicants };
  }

  // 4. Potentially triggering ranking process (future enhancement)

  return { success: true, savedCount: savedApplicants.length, savedApplicants };
};

const parseCsvFile = (filePath: string): Promise<CsvApplicantData[]> => {
  return new Promise((resolve, reject) => {
    const results: CsvApplicantData[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: CsvApplicantData) => results.push(data)) // Refined type
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
};

export { processApplicantData, parseCsvFile };

