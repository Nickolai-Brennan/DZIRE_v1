/**
 * frontend/src/lib/auth/token.ts
 * JWT storage helpers for admin auth.
 * Stores the token in localStorage (acceptable for MVP admin tools).
 */

const ADMIN_TOKEN_KEY = 'dzire_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isAdminAuthenticated(): boolean {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    // Decode payload without verifying signature (verification is server-side)
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === 'number' && payload.exp > now;
  } catch {
    return false;
  }
}
