import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getMe,
  refreshTokens,
  type CurrentUser,
  type LoginPayload,
  type RegisterPayload,
} from '../services/authService';
import { setAccessToken } from '../services/api';

export type { CurrentUser as User };

interface AuthContextValue {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isVip: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  upgradeToVip: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, try to restore session via refresh token cookie
  useEffect(() => {
    (async () => {
      try {
        await refreshTokens();
        const me = await getMe();
        setUser(me);
      } catch {
        // No valid session — that's OK
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await apiLogin({ email, password } as LoginPayload);
    const me = await getMe();
    setUser(me);
  }, []);

  const signup = useCallback(
    async (email: string, username: string, password: string, firstName?: string, lastName?: string) => {
      const payload: RegisterPayload = {
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      };
      const me = await apiRegister(payload);
      setUser(me);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  const upgradeToVip = useCallback(() => {
    setUser(prev => prev ? { ...prev, is_vip: true } : prev);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isVip: user?.is_vip ?? false,
        isLoading,
        login,
        signup,
        logout,
        upgradeToVip,
        refreshUser,
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
