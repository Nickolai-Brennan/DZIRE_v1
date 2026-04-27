# Authentication

DZIRE uses **JWT-based authentication** with both access and refresh tokens stored in **HttpOnly cookies** for browser clients. API clients may also use the `Authorization: Bearer <token>` header.

---

## Cookie-Based JWT Flow

```
Browser                          Server
  |                                |
  |  POST /api/auth/login          |
  |  { email, password }  ──────>  |
  |                                | ← verify credentials
  |  <── 200 OK                    |
  |  Set-Cookie: access_token      | (HttpOnly, Secure, SameSite=Strict)
  |  Set-Cookie: refresh_token     | (HttpOnly, Secure, SameSite=Strict)
  |  { access_token: "..." }       | (also in body for Bearer header use)
  |                                |
  |  GET /api/users/me             |
  |  Cookie: access_token=...  ──> |
  |                                | ← validate JWT, extract user_id, role, is_vip
  |  <── 200 { user }              |
```

### Access Token
- Short-lived (default: **60 minutes**).
- Claims: `user_id`, `email`, `role`, `is_vip`, `exp`, `type: "access"`.
- Stored in an `HttpOnly; Secure; SameSite=Strict` cookie (`access_token`).
- Also returned in the JSON response body so API clients can use `Authorization: Bearer`.

### Refresh Token
- Long-lived (default: **30 days**).
- Claims: `sub` (user_id), `exp`, `type: "refresh"`.
- Stored in an `HttpOnly; Secure; SameSite=Strict` cookie (`refresh_token`).
- Rotated on every `/api/auth/refresh` call (refresh rotation).

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `JWT_SECRET` | `changeme` | **Change in production.** HMAC signing key. |
| `JWT_ALGORITHM` | `HS256` | JWT signing algorithm. |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | Access token TTL (minutes). |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `30` | Refresh token TTL (days). |
| `DATABASE_URL` | *(required)* | Async Postgres URL (`postgresql+asyncpg://...`). |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated CORS origins. |

> **Security:** Never commit `JWT_SECRET` to source control. Use environment-specific secrets management (e.g., GitHub Actions secrets, AWS Secrets Manager, Doppler).

---

## API Endpoints

### `POST /api/auth/register`
Create a new user account.

**Body:**
```json
{
  "email": "user@example.com",
  "username": "my_username",
  "password": "minimum8chars",
  "first_name": "Jane",
  "last_name": "Doe"
}
```

**Response:** `201` — user profile JSON + cookies set.

---

### `POST /api/auth/login`
Authenticate with email + password.

**Body:** `{ "email": "...", "password": "..." }`

**Response:** `200` — `{ "access_token": "...", "token_type": "bearer" }` + cookies set.

---

### `POST /api/auth/logout`
Clear auth cookies. **Response:** `204 No Content`.

---

### `POST /api/auth/refresh`
Exchange refresh cookie for new access + refresh tokens (rotation).
**Response:** `200` — `{ "access_token": "..." }` + new cookies set.

---

### `POST /api/auth/forgot-password`
Initiate password reset flow.
**Body:** `{ "email": "..." }`
**Response:** `204` — always (to avoid email enumeration).

---

### `POST /api/auth/reset-password`
Complete password reset with the token from the email link.
**Body:** `{ "token": "...", "new_password": "..." }`
**Response:** `204` on success, `400` if token invalid/expired.

---

### `POST /api/auth/verify-email`
Verify email address with the token sent during registration.
**Body:** `{ "token": "..." }`
**Response:** `204` on success, `400` if token invalid.

---

## Email Integration (Placeholder)

During registration and password reset, the backend logs tokens to the application log instead of sending real emails:

```
INFO [EMAIL STUB] Verification email for user@example.com — token: abc123...
```

### Plugging in a Real Provider

1. Install the provider SDK, e.g.:
   ```bash
   pip install sendgrid
   ```
2. Replace `_send_verification_email` and `_send_password_reset_email` in
   `backend/app/auth/services.py` with real provider calls.
3. Add the provider API key to your environment:
   ```
   SENDGRID_API_KEY=SG.xxxxxxx
   ```

---

## Frontend Integration

The frontend uses `credentials: 'include'` on all fetch calls so HttpOnly cookies are sent automatically.

```typescript
// services/api.ts — base fetch wrapper
const response = await fetch(`${API_BASE}${path}`, {
  credentials: 'include',  // ← sends cookies
  headers: mergedHeaders,
  ...rest,
});
```

The `AuthContext` restores sessions on page load by calling `/api/auth/refresh` silently, so users stay logged in across tabs and refreshes.

---

## Audit Logging

Security events are written to the `audit_logs` table:

| Event | Trigger |
|---|---|
| `register` | New user registered |
| `login_success` | Successful login |
| `login_failure` | Failed login attempt |
| `email_verified` | Email address verified |
| `password_reset_requested` | Forgot-password submitted |
| `password_reset_complete` | Password successfully reset |
