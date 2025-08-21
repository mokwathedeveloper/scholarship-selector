const Applicant = require('../models/Applicant');

const performRanking = async (criteria) => {
  // 1. Fetching applicant data from the database.
  // For now, fetch all applicants. In a real scenario, you'd filter based on criteria.
  const applicants = await Applicant.find({}).exec();

  // 2. Applying AI-powered ranking algorithms based on criteria.
  // This is a placeholder for complex ranking logic.
  // For demonstration, we'll assign a dummy score or sort by GPA/experience.
  const rankedApplicants = applicants.map(applicant => ({
    id: applicant._id,
    name: applicant.name,
    email: applicant.email,
    gpa: applicant.gpa,
    experience: applicant.experience,
    skills: applicant.skills,
    // Assign a dummy score based on some criteria, e.g., GPA + experience * 10
    score: (applicant.gpa * 10) + (applicant.experience * 5) + (applicant.skills.length * 2),
  }));

  // 3. Returning sorted/ranked list of applicants.
  // Sort by score in descending order
  rankedApplicants.sort((a, b) => b.score - a.score);

  console.log('Performing ranking with criteria:', criteria);

  return rankedApplicants;
};

module.exports = { performRanking };