import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  displayName: string;
  isVip: boolean;
  interests: string[];
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isVip: boolean;
  login: (email: string, _password: string) => Promise<void>;
  signup: (email: string, displayName: string, _password: string) => Promise<void>;
  logout: () => void;
  upgradeToVip: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    // Mock: accept any credentials
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      isVip: false,
      interests: [],
    };
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (email: string, displayName: string, _password: string) => {
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      displayName,
      isVip: false,
      interests: [],
    };
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const upgradeToVip = useCallback(() => {
    setUser(prev => prev ? { ...prev, isVip: true } : prev);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isVip: user?.isVip ?? false,
        login,
        signup,
        logout,
        upgradeToVip,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
