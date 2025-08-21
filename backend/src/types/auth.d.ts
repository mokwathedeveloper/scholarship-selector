import { IUser } from '../models/User';
import mongoose from 'mongoose'; // Import mongoose for ObjectId type

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UserWithoutPassword {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  message: string;
  user?: UserWithoutPassword;
  token?: string;
}

export interface AuthServiceResponse {
  user: UserWithoutPassword;
  token: string;
}