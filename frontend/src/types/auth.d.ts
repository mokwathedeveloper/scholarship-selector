export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
  token: string;
}