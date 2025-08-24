
import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const decodedUser = jwtDecode(token);
    return decodedUser;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
