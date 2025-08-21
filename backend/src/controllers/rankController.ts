import { performRanking } from '../services/rankService';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { RankingCriteria, RankedApplicant, RankResponse } from '../types/rank'; // Import new interfaces

// @desc    Rank applicants
// @route   POST /api/rank
// @access  Private (will add authentication later)
const rankApplicants = asyncHandler(async (req: Request<{}, {}, RankingCriteria>, res: Response<RankResponse>) => {
  const criteria: RankingCriteria = req.body; // Assuming ranking criteria comes in the request body
  const rankedApplicants: RankedApplicant[] = await performRanking(criteria);
  res.status(200).json({ message: 'Applicants ranked successfully', rankedApplicants });
});

const getRankedApplicants = asyncHandler(async (req: Request, res: Response<RankedApplicant[]>) => {
  // Use the performRanking function from rankService to get ranked applicants
  // For GET request, we might not have specific criteria from req.body,
  // so we can pass an empty object or default criteria if needed.
  const rankedApplicants: RankedApplicant[] = await performRanking({}); // Pass empty criteria for now
  res.status(200).json(rankedApplicants); // Return the actual ranked applicants
});

export { rankApplicants, getRankedApplicants };