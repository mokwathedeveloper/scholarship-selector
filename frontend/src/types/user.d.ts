export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string; // Optional from some endpoints
  updatedAt?: string; // Optional from some endpoints
}
