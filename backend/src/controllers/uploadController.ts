import { processApplicantData, parseCsvFile } from '../services/uploadService';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { CsvApplicantData, UploadResponse } from '../types/upload';
import AppError from '../utils/AppError'; // Import AppError

// @desc    Upload applicant data
// @route   POST /api/upload
// @access  Private (will add authentication later)
const uploadApplicantData = asyncHandler(async (req: Request, res: Response<UploadResponse>) => {
  if (!req.file) {
    throw new AppError('No file uploaded.', 400); // Use AppError
  }

  try {
    const parsedApplicants: CsvApplicantData[] = await parseCsvFile(req.file.path);

    const result = await processApplicantData({ applicants: parsedApplicants });

    res.status(200).json({ message: 'File uploaded and data processed successfully', result });
  } catch (error: unknown) {
    console.error('Error in uploadApplicantData controller:', error);
    throw error;
  }
});

export { uploadApplicantData };