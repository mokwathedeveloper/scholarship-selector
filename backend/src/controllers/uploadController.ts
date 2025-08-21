import { processApplicantData, parseCsvFile } from '../services/uploadService';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

// @desc    Upload applicant data
// @route   POST /api/upload
// @access  Private (will add authentication later)
const uploadApplicantData = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder for actual upload logic
  // This will involve parsing the uploaded file (e.g., CSV, Excel)
  // and then processing the data.
  if (!req.file) {
    const error: CustomError = new Error('No file uploaded.');
    error.statusCode = 400; // Bad Request
    throw error;
  }

  try {
    // Parse the uploaded CSV file
    const parsedApplicants = await parseCsvFile(req.file.path);

    // Process and save the parsed applicant data to the database
    // The processApplicantData expects an object with an 'applicants' array
    const result = await processApplicantData({ applicants: parsedApplicants });

    res.status(200).json({ message: 'File uploaded and data processed successfully', result });
  } catch (error: unknown) {
    console.error('Error in uploadApplicantData controller:', error);
    // Re-throw the error so it's caught by the errorMiddleware
    throw error;
  }
});

export { uploadApplicantData };