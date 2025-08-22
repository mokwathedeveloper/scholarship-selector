import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import Applicant from '../models/Applicant';
import AppError from '../utils/AppError';

// @desc    Get all applicants
// @route   GET /api/applicants
// @access  Private (will add authentication later)
const getApplicants = asyncHandler(async (req: Request, res: Response) => {
  const applicants = await Applicant.find({});
  res.status(200).json({ success: true, data: applicants });
});

// @desc    Get single applicant
// @route   GET /api/applicants/:id
// @access  Private (will add authentication later)
const getApplicant = asyncHandler(async (req: Request, res: Response) => {
  const applicant = await Applicant.findById(req.params.id);

  if (!applicant) {
    throw new AppError('Applicant not found with id of ' + req.params.id, 404);
  }

  res.status(200).json({ success: true, data: applicant });
});

export { getApplicants, getApplicant };
