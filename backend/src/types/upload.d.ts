export interface CsvApplicantData {
  name: string;
  email: string;
  gpa: number;
  experience: number;
  skills: string; // Assuming skills come as a comma-separated string in CSV
  // Add other fields as they appear in your CSV
}

export interface ProcessApplicantDataPayload {
  applicants: CsvApplicantData[];
}

export interface UploadResponse {
  message: string;
  result: {
    success: boolean;
    savedCount: number;
    errors?: { applicant: string; message: string; details: string[] }[];
    savedApplicants?: any[]; // Can be IApplicant[] if you want to import it here
  };
}