import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Start as true to indicate initial loading from localStorage

  useEffect(() => {
    // On initial load, try to get token and role from localStorage
    // TODO: Migrate JWT storage from localStorage to secure HTTP-only cookies in future production.
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
    setLoading(false); // Finished loading from localStorage
  }, []);

  const login = (newToken: string, newRole: string) => {
    // TODO: Migrate JWT storage from localStorage to secure HTTP-only cookies in future production.
    localStorage.setItem('token', newToken);
    localStorage.setItem('userRole', newRole);
    setToken(newToken);
    setRole(newRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // TODO: Migrate JWT storage from localStorage to secure HTTP-only cookies in future production.
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, role, isAuthenticated, loading, login, logout, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
