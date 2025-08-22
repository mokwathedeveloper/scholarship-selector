import { Types } from 'mongoose';

/**
 * Represents the detailed breakdown of an applicant\'s total score.
 */
export interface ScoreBreakdown {
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  assessmentsScore: number;
  semanticScore: number;
}

/**
 * Represents a ranked applicant, including their score, breakdown, and an explanation.
 */
export interface RankedApplicant {
  applicantId: Types.ObjectId | string;
  score: number;
  breakdown: ScoreBreakdown;
  explanation: string;
}
