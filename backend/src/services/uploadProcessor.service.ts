import fs from 'fs';
import csv from 'csv-parser';
import Applicant from '../models/Applicant';
import { IApplicant } from '../models/Applicant';
import ExtractionService from './extraction.service';

interface CsvApplicantData {
  name: string;
  email: string;
  gpa: string; // Read as string, convert to number
  experience: string; // Read as string, convert to number
  skills: string; // Read as string, convert to array
  resumeText?: string;
  coverLetterText?: string;
  documentType: string;
}

class UploadProcessorService {
  public async processUpload(filePath: string, documentType: string): Promise<void> {
    const applicantsData: CsvApplicantData[] = await this.parseCsv(filePath);

    for (const data of applicantsData) {
      const applicant: IApplicant = new Applicant({
        name: data.name,
        email: data.email,
        gpa: parseFloat(data.gpa),
        experience: parseInt(data.experience, 10),
        skills: data.skills.split(',').map(s => s.trim()),
        resumeText: data.resumeText,
        coverLetterText: data.coverLetterText,
        documentType: documentType,
      });

      // Extract additional data using NLP service
      const extracted = await ExtractionService.extractApplicantData(applicant);
      applicant.extracted = extracted.extracted;

      await applicant.save();
    }
  }

  private parseCsv(filePath: string): Promise<CsvApplicantData[]> {
    return new Promise((resolve, reject) => {
      const results: CsvApplicantData[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => reject(error));
    });
  }
}

export default new UploadProcessorService();

