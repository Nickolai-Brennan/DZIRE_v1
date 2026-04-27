/**
 * frontend/src/services/api.ts
 * Base API client for all service calls.
 * Access token is stored in memory — never in localStorage.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers = {}, ...rest } = options;

  const mergedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (requiresAuth && accessToken) {
    mergedHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include', // send HttpOnly refresh token cookie
    headers: mergedHeaders,
    ...rest,
  });

  if (response.status === 401 && requiresAuth) {
    // Attempt silent token refresh
    const refreshed = await tryRefresh();
    if (refreshed) {
      mergedHeaders['Authorization'] = `Bearer ${accessToken}`;
      const retryResponse = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers: mergedHeaders,
        ...rest,
      });
      if (!retryResponse.ok) {
        throw new ApiError(retryResponse.status, await retryResponse.json());
      }
      return retryResponse.json() as Promise<T>;
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, await response.json());
  }

  if (response.status === 204) return undefined as unknown as T;
  return response.json() as Promise<T>;
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const data = await res.json();
    setAccessToken(data.access_token);
    return true;
  } catch {
    return false;
  }
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`API error ${status}`);
    this.status = status;
    this.body = body;
  }
}
