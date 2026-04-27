/**
 * frontend/src/services/authService.ts
 * Auth service — login, register, refresh, logout, current user.
 * All auth routes are cookie-based (access + refresh in HttpOnly cookies).
 * The access_token is also returned in the JSON body for in-memory storage.
 */

import { apiFetch, setAccessToken } from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
  status: string;
  is_verified: boolean;
  is_vip: boolean;
  vip_plan_id: string | null;
  created_at: string;
  last_login: string | null;
}

/** Register a new user. Returns the created user profile. */
export async function register(payload: RegisterPayload): Promise<CurrentUser> {
  return apiFetch<CurrentUser>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** Login with email + password. Stores access token in memory. */
export async function login(payload: LoginPayload): Promise<TokenResponse> {
  const data = await apiFetch<TokenResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  setAccessToken(data.access_token);
  return data;
}

/** Logout — clears server-side cookies and in-memory access token. */
export async function logout(): Promise<void> {
  await apiFetch('/api/auth/logout', { method: 'POST' });
  setAccessToken(null);
}

/** Refresh access + refresh tokens using the HttpOnly refresh cookie. */
export async function refreshTokens(): Promise<TokenResponse> {
  const data = await apiFetch<TokenResponse>('/api/auth/refresh', {
    method: 'POST',
  });
  setAccessToken(data.access_token);
  return data;
}

/** Request a password reset email for the given address. */
export async function forgotPassword(email: string): Promise<void> {
  await apiFetch('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/** Complete a password reset using the token from the email link. */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiFetch('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, new_password: newPassword }),
  });
}

/** Verify email with the token from the verification link. */
export async function verifyEmail(token: string): Promise<void> {
  await apiFetch('/api/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

/** Get the current authenticated user's profile. */
export async function getMe(): Promise<CurrentUser> {
  return apiFetch<CurrentUser>('/api/users/me', { requiresAuth: true });
}

