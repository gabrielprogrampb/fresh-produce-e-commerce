
import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { authenticateUser, registerUser } from '../services/api';

type UserSession = Omit<User, 'password'>;

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<UserSession | null>;
  register: (name: string, email: string, pass: string) => Promise<UserSession | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      sessionStorage.removeItem('user');
    }
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<UserSession | null> => {
    const authenticatedUser = await authenticateUser(email, pass);
    if (authenticatedUser) {
      sessionStorage.setItem('user', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      return authenticatedUser;
    }
    return null;
  }, []);

  const register = useCallback(async (name: string, email: string, pass: string): Promise<UserSession | null> => {
      const newUser = await registerUser(name, email, pass);
      if (newUser) {
          sessionStorage.setItem('user', JSON.stringify(newUser));
          setUser(newUser);
          return newUser;
      }
      return null;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }, [navigate]);
  
  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }), [user, isAuthenticated, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
