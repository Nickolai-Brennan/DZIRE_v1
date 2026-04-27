# API Docs — DZIRE_v1

## Overview
The DZIRE_v1 API follows REST conventions. All Step 7+ endpoints use the `/api/` prefix.

## Base URL
- Development: `http://localhost:8000`
- Production: `https://[render-service].onrender.com`

## Auth

### Cookie-based (Step 7 — recommended for browsers)
Both `access_token` and `refresh_token` are set as `HttpOnly; Secure; SameSite=Strict` cookies automatically on login/register. No manual token handling required in the browser.

### Bearer header (for API clients)
The access token is also returned in the login/register JSON response body:
```
Authorization: Bearer <access_token>
```

### Token lifetime
| Token | Default TTL | Env var |
|---|---|---|
| Access | 60 min | `ACCESS_TOKEN_EXPIRE_MINUTES` |
| Refresh | 30 days | `REFRESH_TOKEN_EXPIRE_DAYS` |

---

## Routes

### Health
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | None | Health check |

### User Auth (Step 7)
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Create account; sets auth cookies |
| `POST` | `/api/auth/login` | None | Login; sets auth cookies; returns access token |
| `POST` | `/api/auth/logout` | Cookie | Clear access + refresh cookies |
| `POST` | `/api/auth/refresh` | Cookie | Rotate tokens; returns new access token |
| `POST` | `/api/auth/forgot-password` | None | Send password reset email (stub: logged) |
| `POST` | `/api/auth/reset-password` | None | Set new password using reset token |
| `POST` | `/api/auth/verify-email` | None | Verify email address using verify token |

### Users (Step 7)
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | Cookie/Bearer | Current user profile |
| `PUT` | `/api/users/update` | Cookie/Bearer | Update own profile fields |
| `GET` | `/api/users/list` | Admin | List all users (offset/limit pagination) |
| `GET` | `/api/users/{id}` | Admin | Get user by UUID |
| `PATCH` | `/api/users/{id}/admin-update` | Admin | Update role / status / VIP flags |
| `DELETE` | `/api/users/delete/{id}` | Admin | Delete user |

### Legacy Public Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Login → access token in body + refresh cookie |
| `POST` | `/auth/refresh` | Cookie | Refresh access token |
| `POST` | `/auth/logout` | Cookie | Clear refresh cookie |
| `GET` | `/auth/me` | Bearer | Current user profile |

### Admin Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | None | Admin login → JWT; records login attempt |
| `POST` | `/api/admin/logout` | Bearer | No-op MVP |
| `GET` | `/api/admin/me` | Bearer | Current admin user |

### CMS / Content
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/cms/posts` | None | List posts |
| `POST` | `/api/cms/posts` | Admin | Create post |
| `PATCH` | `/api/cms/posts/{id}` | Admin | Update post |
| `DELETE` | `/api/cms/posts/{id}` | Admin | Delete post |

### Analytics
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/analytics/events` | None | Track event |
| `POST` | `/api/analytics/page-view` | None | Track page view |
| `POST` | `/api/analytics/click` | None | Track click |

### VIP / Subscriptions
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/vip/plans` | None | List VIP plans |
| `POST` | `/api/vip/plans` | Admin | Create VIP plan |
| `POST` | `/api/vip/subscribe` | Cookie/Bearer | Subscribe to VIP plan |

---

## Response Schemas

### User (Step 7)
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "my_username",
  "first_name": "Jane",
  "last_name": "Doe",
  "avatar_url": null,
  "role": "member",
  "status": "active",
  "is_verified": false,
  "is_vip": false,
  "vip_plan_id": null,
  "created_at": "2026-04-27T00:00:00Z",
  "last_login": null
}
```

### Token Response
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

### Admin Login Response
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 3600
}
```

---

## Reference
- [`docs/authentication.md`](./authentication.md) — cookie flow, email integration
- [`docs/roles-permissions.md`](./roles-permissions.md) — RBAC
- [`docs/security.md`](./security.md) — passwords, CSRF, rate limiting
- [`instructions/api.md`](../instructions/api.md)
- [`api/routes.md`](../api/routes.md)

