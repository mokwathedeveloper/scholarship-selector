const Applicant = require('../models/Applicant');

const processApplicantData = async (data) => {
  // 1. Data validation (basic example, more comprehensive validation would be needed)
  if (!data || !Array.isArray(data.applicants) || data.applicants.length === 0) {
    throw new Error('Invalid or empty applicant data provided.');
  }

  const savedApplicants = [];
  for (const applicantData of data.applicants) {
    try {
      // 2. Data transformation (if needed, e.g., normalize skills)
      // For now, directly save to model

      // 3. Saving data to the database (Applicant model)
      const applicant = new Applicant(applicantData);
      const savedApplicant = await applicant.save();
      savedApplicants.push(savedApplicant);
    } catch (error) {
      // Handle individual applicant saving errors
      console.error(`Error saving applicant ${applicantData.email || 'unknown'}: ${error.message}`);
      // Depending on requirements, you might want to:
      // - Continue and log errors
      // - Stop and return an error for the whole batch
      // For now, we'll just log and continue.
    }
  }

  // 4. Potentially triggering ranking process (future enhancement)

  return { success: true, savedCount: savedApplicants.length, savedApplicants };
};

module.exports = { processApplicantData };