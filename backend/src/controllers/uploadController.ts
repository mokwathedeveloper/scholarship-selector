import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import AppError from '../utils/AppError'; // Import AppError

// @desc    Upload applicant data
// @route   POST /api/upload
// @access  Private (will add authentication later)
const uploadApplicantData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded.', 400); // Use AppError
  }

  res.status(200).json({ message: "File uploaded successfully", file: req.file.filename });
});

export { uploadApplicantData };
