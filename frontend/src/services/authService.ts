/**
 * frontend/src/services/authService.ts
 * Auth service — login, refresh, logout, current user.
 */

import { apiFetch, setAccessToken } from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export async function login(payload: LoginPayload): Promise<TokenResponse> {
  const data = await apiFetch<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  setAccessToken(data.access_token);
  return data;
}

export async function logout(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
  setAccessToken(null);
}

export async function getMe(): Promise<CurrentUser> {
  return apiFetch<CurrentUser>('/auth/me', { requiresAuth: true });
}
