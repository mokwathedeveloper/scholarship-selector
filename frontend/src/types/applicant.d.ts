export interface ApplicantData {
  id: string;
  name: string;
  email: string;
  gpa: number;
  experience: number;
  skills: string[];
  score: number;
}

export interface ApplicantCardProps {
  applicant: ApplicantData;
}