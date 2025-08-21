// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to upload applicant data
export const uploadApplicants = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Function to fetch ranked applicants
export const getRankedApplicants = async () => {
  try {
    const response = await api.get('/rank');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// You can add other API calls here (e.g., for authentication if needed)