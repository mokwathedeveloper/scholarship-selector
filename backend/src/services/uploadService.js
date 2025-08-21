const Applicant = require('../models/Applicant');

const processApplicantData = async (data) => {
  // 1. Data validation (basic example, more comprehensive validation would be needed)
  if (!data || !Array.isArray(data.applicants) || data.applicants.length === 0) {
    // Throw a more specific error that can be caught by errorMiddleware
    const error = new Error('Invalid or empty applicant data provided. Expected an object with an "applicants" array.');
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const savedApplicants = [];
  const errors = []; // Collect errors

  for (const applicantData of data.applicants) {
    try {
      // 2. Data transformation (if needed, e.g., normalize skills)
      // For now, directly save to model

      // 3. Saving data to the database (Applicant model)
      const applicant = new Applicant(applicantData);
      const savedApplicant = await applicant.save();
      savedApplicants.push(savedApplicant);
    } catch (error) {
      // Collect individual applicant saving errors
      errors.push({
        applicant: applicantData.email || 'unknown',
        message: error.message,
        details: error.errors ? Object.keys(error.errors).map(key => error.errors[key].message) : [],
      });
    }
  }

  if (errors.length > 0) {
    // If there are errors, return a partial success or a failure with details
    return { success: false, savedCount: savedApplicants.length, errors: errors, savedApplicants };
  }

  // 4. Potentially triggering ranking process (future enhancement)

  return { success: true, savedCount: savedApplicants.length, savedApplicants };
};

module.exports = { processApplicantData };