import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import Applicant from '../models/Applicant';
import ScoringService from '../services/scoring.service';
import { RankedApplicant } from '../types/scoring';

// @desc    Get ranked applicants
// @route   GET /api/rank
// @access  Public (for now)
const getRankedApplicants = asyncHandler(async (req: Request, res: Response) => {
  const applicants = await Applicant.find({});
  const rankedApplicants: RankedApplicant[] = await ScoringService.rankApplicants(applicants);

  res.status(200).json({
    items: rankedApplicants,
  });
});

export { getRankedApplicants };
