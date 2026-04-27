# API Docs — DZIRE_v1

## Overview
The DZIRE_v1 API follows REST conventions. Public API uses the `/api/v1/` prefix. Admin API uses `/api/admin/`.

## Base URL
- Development: `http://localhost:8000`
- Production: `https://[render-service].onrender.com`

## Auth
Protected endpoints require an `Authorization: Bearer <access_token>` header.
Public access tokens are short-lived (60 min). Use `POST /auth/refresh` to renew.
Admin access tokens use a separate `admin_access` JWT type.

## Routes

### Health
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | None | Health check |

### Public Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Login, returns access + refresh tokens |
| `POST` | `/auth/refresh` | Cookie | Refresh access token |
| `POST` | `/auth/logout` | Cookie | Clear refresh token |
| `GET` | `/auth/me` | Bearer | Current user profile |

### Admin Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | None | Admin login → JWT; records login attempt |
| `POST` | `/api/admin/logout` | Bearer | No-op MVP (client discards token) |
| `GET` | `/api/admin/me` | Bearer | Current admin user |

### Positions
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/positions` | None | List positions |
| `GET` | `/api/v1/positions/{slug}` | None | Get position detail |

### Reviews
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/reviews` | None | List reviews |
| `GET` | `/api/v1/reviews/{slug}` | None | Get review detail |

## Admin Login Response
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 3600
}
```

## Full Contract Reference
See [`api/contracts.md`](../api/contracts.md) for full Pydantic schemas and example payloads.

## Reference
- [`instructions/api.md`](../instructions/api.md)
- [`workflows/api-build.md`](../workflows/api-build.md)
- [`api/routes.md`](../api/routes.md)

