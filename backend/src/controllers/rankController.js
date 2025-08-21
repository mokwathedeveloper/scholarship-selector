const rankService = require('../services/rankService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Rank applicants
// @route   POST /api/rank
// @access  Private (will add authentication later)
const rankApplicants = asyncHandler(async (req, res) => {
  // Placeholder for actual ranking logic
  // This will involve fetching applicant data, applying ranking algorithms,
  // and returning ranked results.
  const criteria = req.body; // Assuming ranking criteria comes in the request body
  const rankedApplicants = await rankService.performRanking(criteria);
  res.status(200).json({ message: 'Applicants ranked successfully', rankedApplicants });
});

const getRankedApplicants = asyncHandler(async (req, res) => {
  // Use the performRanking function from rankService to get ranked applicants
  // For GET request, we might not have specific criteria from req.body,
  // so we can pass an empty object or default criteria if needed.
  const rankedApplicants = await rankService.performRanking({}); // Pass empty criteria for now
  res.status(200).json(rankedApplicants); // Return the actual ranked applicants
});

module.exports = { rankApplicants, getRankedApplicants };