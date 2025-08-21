const uploadService = require('../services/uploadService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Upload applicant data
// @route   POST /api/upload
// @access  Private (will add authentication later)
const uploadApplicantData = asyncHandler(async (req, res) => {
  // Placeholder for actual upload logic
  // This will involve parsing the uploaded file (e.g., CSV, Excel)
  // and then processing the data.
  const data = req.body; // Assuming data comes in the request body for now
  try {
    const result = await uploadService.processApplicantData(data);
    res.status(200).json({ message: 'Data uploaded successfully', result });
  } catch (error) {
    console.error('Error in uploadApplicantData controller:', error);
    // Re-throw the error so it's caught by the errorMiddleware
    throw error;
  }
});

module.exports = { uploadApplicantData };