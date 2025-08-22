import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import Criteria from '../models/criteria.model';
import AppError from '../utils/AppError';
import ScoringService from '../services/scoring.service';
import Applicant from '../models/Applicant';

// @desc    Create new criteria
// @route   POST /api/criteria
// @access  Private (will add authentication later)
const createCriteria = asyncHandler(async (req: Request, res: Response) => {
  const { programId, requiredSkills, niceToHaveSkills, minYearsExperience, educationLevels, weights, keywordBoosts } = req.body;

  const criteria = await Criteria.create({
    programId,
    requiredSkills,
    niceToHaveSkills,
    minYearsExperience,
    educationLevels,
    weights,
    keywordBoosts,
  });

  res.status(201).json({ success: true, data: criteria });
});

// @desc    Get all criteria
// @route   GET /api/criteria
// @access  Private (will add authentication later)
const getCriteria = asyncHandler(async (req: Request, res: Response) => {
  const criteria = await Criteria.find();
  res.status(200).json({ success: true, data: criteria });
});

// @desc    Get single criteria
// @route   GET /api/criteria/:id
// @access  Private (will add authentication later)
const getCriteriaById = asyncHandler(async (req: Request, res: Response) => {
  const criteria = await Criteria.findById(req.params.id);

  if (!criteria) {
    throw new AppError('Criteria not found with id of ' + req.params.id, 404);
  }

  res.status(200).json({ success: true, data: criteria });
});

// @desc    Update criteria
// @route   PUT /api/criteria/:id
// @access  Private (will add authentication later)
const updateCriteria = asyncHandler(async (req: Request, res: Response) => {
  const criteria = await Criteria.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!criteria) {
    throw new AppError('Criteria not found with id of ' + req.params.id, 404);
  }

  res.status(200).json({ success: true, data: criteria });
});

// @desc    Delete criteria
// @route   DELETE /api/criteria/:id
// @access  Private (will add authentication later)
const deleteCriteria = asyncHandler(async (req: Request, res: Response) => {
  const criteria = await Criteria.findByIdAndDelete(req.params.id);

  if (!criteria) {
    throw new AppError('Criteria not found with id of ' + req.params.id, 404);
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc    Rank applicants by program criteria
// @route   POST /api/programs/:programId/rank
// @access  Private (will add authentication later)
const rankApplicantsByProgram = asyncHandler(async (req: Request, res: Response) => {
  const { programId } = req.params;
  const { topK } = req.query; // Optional: number of top applicants to return

  const criteria = await Criteria.findOne({ programId });

  if (!criteria) {
    throw new AppError('Criteria not found for programId ' + programId, 404);
  }

  const applicants = await Applicant.find({}); // Fetch all applicants for now

  // Apply program-specific scoring weights and rules
  // This will require modifying the ScoringService to accept criteria
  // For now, a placeholder:
  const rankedApplicants = await ScoringService.rankApplicants(applicants); // This needs to be updated to use criteria

  let result = rankedApplicants;
  if (topK) {
    result = rankedApplicants.slice(0, parseInt(topK as string, 10));
  }

  res.status(200).json({ success: true, data: result });
});

export {
  createCriteria,
  getCriteria,
  getCriteriaById,
  updateCriteria,
  deleteCriteria,
  rankApplicantsByProgram,
};
