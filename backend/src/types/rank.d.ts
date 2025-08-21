import { IApplicant } from '../models/Applicant';

export interface RankingCriteria {
  minGpa?: number;
  // Add other criteria properties here as needed, e.g.:
  // minExperience?: number;
  // requiredSkills?: string[];
}

export interface RankedApplicant {
  id: string;
  name: string;
  email: string;
  gpa: number;
  experience: number;
  skills: string[];
  score: number;
}

export interface RankResponse {
  message: string;
  rankedApplicants: RankedApplicant[];
}