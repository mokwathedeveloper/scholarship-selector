import jwt_decode from 'jwt-decode';

interface DecodedToken {
  id: string;
  role: string;
  exp: number; // Expiration time
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getDecodedToken = (): DecodedToken | null => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt_decode<DecodedToken>(token);
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token'); // Remove expired token
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getDecodedToken();
};

export const getUserRole = (): string | null => {
  const decodedToken = getDecodedToken();
  return decodedToken ? decodedToken.role : null;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};