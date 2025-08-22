import axios from 'axios';
import { UploadResult } from '../types/upload';
import { ApplicantData, RankedApplicant } from '../types/applicant'; // Import RankedApplicant
import { AuthResponse } from '../types/auth'; // Assuming AuthResponse is defined here or in auth.d.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to upload applicant data
export const uploadApplicants = async (file: File, documentType: string): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);

  try {
    const response = await api.post<UploadResult>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Function to fetch ranked applicants
export const getRank = async (topK?: number): Promise<RankedApplicant[]> => {
  try {
    const response = await api.get<{ items: RankedApplicant[] }>(`/rank${topK ? `?topK=${topK}` : ''}`);
    return response.data.items;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Function to fetch a single applicant by ID
export const getApplicant = async (id: string): Promise<ApplicantData> => {
  try {
    const response = await api.get<ApplicantData>(`/applicants/${id}`); // Assuming a /applicants/:id endpoint
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Function to register a user
export const registerUser = async (name: string, email: string, password: string, role?: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', { name, email, password, role });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Function to login a user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};