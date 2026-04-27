# Security

This document covers the security model for DZIRE, including password handling, token storage, CORS, CSRF, and audit logging.

---

## Passwords

- Passwords are hashed using **bcrypt** via `passlib[bcrypt]`.
- Plaintext passwords are **never** stored or logged.
- Minimum password length: **8 characters** (enforced at both frontend and backend).

```python
# backend/app/auth/security.py
from passlib.context import CryptContext
_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
```

---

## Token Security

### Storage
- **Access token**: HttpOnly, Secure, SameSite=Strict cookie + JSON response body.
- **Refresh token**: HttpOnly, Secure, SameSite=Strict cookie only.
- Tokens are **never** stored in `localStorage` or `sessionStorage` for browser clients.
- Admin panel tokens use `localStorage` (MVP only — to be migrated to cookies in a future step).

### Rotation
- Refresh tokens are **rotated** on every `/api/auth/refresh` call.
- A compromised refresh token is invalidated as soon as a new one is issued.

### Lifetime
| Token | Default TTL | Config Variable |
|---|---|---|
| Access | 60 minutes | `ACCESS_TOKEN_EXPIRE_MINUTES` |
| Refresh | 30 days | `REFRESH_TOKEN_EXPIRE_DAYS` |

### JWT Claims (Access Token)
```json
{
  "sub": "<user_uuid>",
  "user_id": "<user_uuid>",
  "email": "user@example.com",
  "role": "member",
  "is_vip": false,
  "exp": 1712345678,
  "type": "access"
}
```

---

## CORS

CORS is configured in `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,  # from ALLOWED_ORIGINS env var
    allow_credentials=True,  # required for cookie-based auth
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Production checklist:**
- Set `ALLOWED_ORIGINS` to your exact frontend domain(s), e.g. `https://dzire.com`.
- Do **not** use `*` with `allow_credentials=True` (FastAPI will reject this anyway).

---

## CSRF Considerations

### Why CSRF matters with cookies

When tokens are stored in HttpOnly cookies, the browser automatically attaches them to every request to your origin — including requests triggered by malicious third-party sites (CSRF).

### Mitigations in place

1. **`SameSite=Strict`** on all auth cookies — the strongest protection. The browser will not send cookies on any cross-site request, including top-level navigation from another site.

2. **Content-Type check** — all state-changing endpoints require `Content-Type: application/json`, which the browser's `fetch` with `credentials: include` sends correctly but `<form>` submissions from foreign origins cannot spoof without a preflight.

3. **CORS origin allowlist** — requests from unlisted origins are rejected at the CORS middleware layer.

### Additional hardening (recommended for production)

- Implement the **Synchroniser Token Pattern**: generate a CSRF token per session, embed it in a `<meta>` tag, and read it in JavaScript. FastAPI doesn't include built-in CSRF middleware, but `starlette-csrf` or a custom dependency can be added:
  ```bash
  pip install starlette-csrf
  ```

---

## Rate Limiting

To protect the login endpoint against brute-force attacks:

### Current approach
- Login failures are written to the `audit_logs` table with `event = "login_failure"`.
- Downstream rate limiting can be applied at the reverse proxy (nginx / Cloudflare) layer.

### Recommended production approach
Add `slowapi` (Starlette-compatible rate limiter):

```bash
pip install slowapi
```

```python
# main.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# routes/auth.py
@router.post("/api/auth/login")
@limiter.limit("10/minute")
async def login(request: Request, ...):
    ...
```

---

## Input Validation

All request bodies are validated using **Pydantic v2** schemas. Invalid input returns `422 Unprocessable Entity` automatically.

Key constraints:
- Email: validated by Pydantic `EmailStr`.
- Password: minimum 8 characters (`Field(min_length=8)`).
- Username: 3–64 characters (`Field(min_length=3, max_length=64)`).

---

## Secrets Management

| Secret | Where to set |
|---|---|
| `JWT_SECRET` | Environment variable (never commit to git) |
| `DATABASE_URL` | Environment variable |
| Email provider API keys | Environment variables |

Use a secrets manager in production:
- **GitHub Actions**: repository secrets → `${{ secrets.JWT_SECRET }}`
- **AWS**: Secrets Manager or Parameter Store
- **Doppler**, **Vault**, etc.

---

## Audit Logging

Security-relevant events are recorded in the `audit_logs` table:

```sql
SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50;
```

| Field | Description |
|---|---|
| `actor_id` | UUID of the user who performed the action |
| `event` | Event type (e.g. `login_success`, `password_reset_complete`) |
| `target_id` | UUID of the affected resource (if applicable) |
| `detail` | Free-form text details |
| `ip` | Client IP address |
| `created_at` | Timestamp |

### Tracked events
- `register`
- `login_success` / `login_failure`
- `email_verified`
- `password_reset_requested` / `password_reset_complete`
- *(stub hooks for role changes, admin actions, content deletions, payment events — to be wired in Steps 8+)*

---

## Security Checklist

- [x] bcrypt password hashing
- [x] No plaintext password storage or logging
- [x] JWT in HttpOnly cookies
- [x] SameSite=Strict cookie attribute
- [x] Refresh token rotation
- [x] CORS allowlist with credentials
- [x] Pydantic input validation
- [x] Audit logging for auth events
- [ ] Rate limiting on login (add `slowapi` — see above)
- [ ] CSRF synchroniser token (add `starlette-csrf` — see above)
- [ ] Move admin tokens from localStorage to HttpOnly cookies (Step 8+)
- [ ] HTTPS enforced in production (reverse proxy / CDN layer)
