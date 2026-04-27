/**
 * frontend/src/lib/api/admin.ts
 * Admin API client — login and /me endpoints.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AdminUser {
  id: number;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export async function adminLogin(
  username: string,
  password: string
): Promise<AdminLoginResponse> {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail ?? 'Login failed');
  }
  return res.json();
}

export async function adminMe(token: string): Promise<AdminUser> {
  const res = await fetch(`${API_BASE}/api/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Unauthorized');
  }
  return res.json();
}

export async function adminLogout(token: string): Promise<void> {
  await fetch(`${API_BASE}/api/admin/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}
