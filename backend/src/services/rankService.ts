import Applicant from '../models/Applicant';
import { IApplicant } from '../models/Applicant';

interface RankingCriteria {
  minGpa?: number;
  // Add other criteria properties here
}

interface RankedApplicant {
  id: string;
  name: string;
  email: string;
  gpa: number;
  experience: number;
  skills: string[];
  score: number;
}

const performRanking = async (criteria: RankingCriteria): Promise<RankedApplicant[]> => {
  // 1. Fetching applicant data from the database.
  let query: any = {}; // Use 'any' for now, can be refined with Mongoose types
  if (criteria.minGpa) {
    query.gpa = { $gte: criteria.minGpa };
  }
  // Add more criteria filtering here (e.g., experience, skills)

  const applicants: IApplicant[] = await Applicant.find(query).exec();

  // 2. Applying AI-powered ranking algorithms based on criteria.
  // This is a placeholder for complex ranking logic.
  // For demonstration, we'll assign a dummy score or sort by GPA/experience.
  const rankedApplicants: RankedApplicant[] = applicants.map(applicant => ({
    id: applicant._id.toString(), // Convert ObjectId to string
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

export { performRanking };