export interface UploadResult {
  message: string;
  result: {
    success: boolean;
    savedCount: number;
    errors?: { applicant: string; message: string; details: string[] }[];
    savedApplicants?: any[]; // Can be ApplicantData[] if you want to import it here
  };
}