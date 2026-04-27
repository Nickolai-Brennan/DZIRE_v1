import { useState, useCallback } from 'react';
const ADMIN_USER = 'admin'; const ADMIN_PASS = 'admin';
const AUTH_KEY = 'dzire_admin_auth';
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');
  const [error, setError] = useState<string | null>(null);
  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, 'true'); setIsAuthenticated(true); setError(null); return true;
    }
    setError('Invalid credentials'); return false;
  }, []);
  const logout = useCallback(() => { sessionStorage.removeItem(AUTH_KEY); setIsAuthenticated(false); }, []);
  return { isAuthenticated, login, logout, error };
}
