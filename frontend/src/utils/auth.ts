
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  role: string;
  exp: number; // Expiration time
  iat: number; // Issued at time
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = (): JwtPayload | null => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const user = getUser();
  return !!user;
};

export const getUserRole = (): string | null => {
  const user = getUser();
  return user ? user.role : null;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole'); // Also remove userRole if stored separately
  // Optionally, redirect to login page
  // window.location.href = '/login';
};
