import axios from 'axios';
import { UploadResult } from '../types/upload'; // Import UploadResult
import { ApplicantData } from '../types/applicant'; // Import ApplicantData

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to upload applicant data
export const uploadApplicants = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post<UploadResult>('/upload', formData, { // Specify response type
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) { // Use 'any' for now, or define a more specific AxiosError interface
    throw error.response?.data || error.message;
  }
};

// Function to fetch ranked applicants
export const getRankedApplicants = async (): Promise<ApplicantData[]> => { // Specify return type
  try {
    const response = await api.get<ApplicantData[]>('/rank'); // Specify response type
    return response.data;
  } catch (error: any) { // Use 'any' for now
    throw error.response?.data || error.message;
  }
};

// You can add other API calls here (e.g., for authentication if needed)