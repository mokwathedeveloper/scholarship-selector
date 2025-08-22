export interface ApplicantData {
  id: string;
  name: string;
  email: string;
  gpa: number;
  experience: number;
  skills: string[];
  documentType: string; // Added documentType
  score: number;
}

export interface RankedApplicant {
  applicantId: string;
  score: number;
  breakdown: {
    skillsScore: number;
    experienceScore: number;
    educationScore: number;
    assessmentsScore: number;
    semanticScore: number;
  };
  explanation: string;
}

export interface ApplicantCardProps {
  applicant: ApplicantData;
}