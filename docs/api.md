# API Docs — DZIRE_v1

## Overview
The DZIRE_v1 API follows REST conventions under the `/api/v1/` prefix. GraphQL (Strawberry) is planned as a secondary layer.

## Base URL
- Development: `http://localhost:8000`
- Production: `https://[render-service].onrender.com`

## Auth
Protected endpoints require an `Authorization: Bearer <access_token>` header.
Access tokens are short-lived (15 min). Use `POST /auth/refresh` to renew.

## Routes

### Health
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/health` | None | Health check |

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Login, returns access + refresh tokens |
| `POST` | `/auth/refresh` | Cookie | Refresh access token |
| `POST` | `/auth/logout` | Cookie | Clear refresh token |
| `GET` | `/me` | Bearer | Current user profile |

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

## Full Contract Reference
See [`api/contracts.md`](../api/contracts.md) for full Pydantic schemas and example payloads.

## Reference
- [`instructions/api.md`](../instructions/api.md)
- [`workflows/api-build.md`](../workflows/api-build.md)
- [`api/routes.md`](../api/routes.md)
