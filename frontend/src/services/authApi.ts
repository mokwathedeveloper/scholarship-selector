import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

interface AuthResponse {
  message: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
  refreshToken?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

// Helper function for API calls
const apiCall = async <T>(url: string, method: string, data?: any): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json();
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  return apiCall<AuthResponse>('/auth/client/login', 'POST', { email, password });
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return apiCall<AuthResponse>('/auth/client/signup', 'POST', { name, email, password });
};

export const loginAdmin = async (email: string, password: string): Promise<AuthResponse> => {
  return apiCall<AuthResponse>('/auth/admin/login', 'POST', { email, password });
};

export const registerAdmin = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return apiCall<AuthResponse>('/auth/admin/signup', 'POST', { name, email, password });
};

export const refreshAccessToken = async (refreshToken: string): Promise<AuthResponse> => {
  return apiCall<AuthResponse>('/auth/refresh', 'POST', { refreshToken });
};

export const logoutUser = async (): Promise<void> => {
  // For logout, we might just clear tokens client-side, or hit a backend endpoint
  // For now, client-side clearing is sufficient as per prompt's focus on login/signup
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  toast.success('Logged out successfully!');
};
