import Applicant from '../models/Applicant';
import { IApplicant } from '../models/Applicant';
import csv from 'csv-parser';
import fs from 'fs';

interface ProcessApplicantDataResult {
  success: boolean;
  savedCount: number;
  errors?: { applicant: string; message: string; details: string[] }[];
  savedApplicants?: IApplicant[];
}

interface CustomError extends Error {
  statusCode?: number;
}

const processApplicantData = async (data: { applicants: any[] }): Promise<ProcessApplicantDataResult> => {
  // 1. Data validation (basic example, more comprehensive validation would be needed)
  if (!data || !Array.isArray(data.applicants) || data.applicants.length === 0) {
    // Throw a more specific error that can be caught by errorMiddleware
    const error: CustomError = new Error('Invalid or empty applicant data provided. Expected an object with an "applicants" array.');
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const savedApplicants: IApplicant[] = [];
  const errors: { applicant: string; message: string; details: string[] }[] = []; // Collect errors

  for (const applicantData of data.applicants) {
    try {
      // 2. Data transformation (if needed, e.g., normalize skills)
      // For now, directly save to model

      // 3. Saving data to the database (Applicant model)
      const applicant = new Applicant(applicantData);
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

const parseCsvFile = (filePath: string): Promise<any[]> => { // Can refine 'any[]' if CSV structure is known
  return new Promise((resolve, reject) => {
    const results: any[] = []; // Can refine 'any[]' if CSV structure is known
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: any) => results.push(data)) // Can refine 'any' if CSV row structure is known
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
};

export { processApplicantData, parseCsvFile };
