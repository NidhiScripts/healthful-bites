import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'healthfood_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Synchronously initialize user from localStorage to prevent auth race conditions
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Provide a default active user session so Dashboard is accessible immediately
      const defaultUser: User = {
        id: 'user_default',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    } catch {
      return {
        id: 'user_default',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com'
      };
    }
  });

  const login = (name: string, email: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: name.trim() || 'Health Enthusiast',
      email: email.trim() || 'user@example.com'
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const current = prev || { id: 'user_default', name: 'Alex Johnson', email: 'alex.johnson@example.com' };
      const updated = { ...current, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
