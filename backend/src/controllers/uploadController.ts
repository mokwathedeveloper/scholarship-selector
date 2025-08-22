import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import AppError from '../utils/AppError';
import UploadProcessorService from '../services/uploadProcessor.service';
import fs from 'fs'; // Import fs for file deletion

// @desc    Upload applicant data
// @route   POST /api/upload
// @access  Private (will add authentication later)
const uploadApplicantData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded.', 400);
  }

  // Assuming documentType is sent as a query parameter or in body
  const documentType = req.body.documentType || req.query.documentType;
  if (!documentType) {
    // Clean up the uploaded file if documentType is missing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting uploaded file:', err);
    });
    throw new AppError('Document type is required.', 400);
  }

  try {
    await UploadProcessorService.processUpload(req.file.path, documentType as string);
    res.status(200).json({ message: "File uploaded and processed successfully." });
  } catch (error: any) {
    // Clean up the uploaded file on processing error
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting uploaded file:', err);
    });
    throw new AppError('File processing failed: ' + error.message, 500);
  } finally {
    // Ensure the uploaded file is deleted after processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting uploaded file in finally block:', err);
    });
  }
});

export { uploadApplicantData };
