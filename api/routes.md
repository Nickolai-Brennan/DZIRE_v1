# API Route Map — DZIRE_v1

## Base URL
- Development: `http://localhost:8000`
- Production: `https://[render-service].onrender.com`

## Convention
- REST routes: `/api/v1/[resource]`
- Auth routes: `/auth/[action]`
- All responses: JSON

---

## Health

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/health` | None | Service health check |

---

## Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Login with email + password. Sets refresh cookie. Returns access token. |
| `POST` | `/auth/refresh` | HttpOnly Cookie | Exchange refresh token for new access token. |
| `POST` | `/auth/logout` | HttpOnly Cookie | Clear refresh token cookie. |
| `GET` | `/auth/me` | Bearer token | Get current authenticated user profile. |

---

## Positions

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/positions` | None | List all published positions |
| `GET` | `/api/v1/positions/{slug}` | None | Get single position by slug |
| `POST` | `/api/v1/positions` | Admin | Create new position |
| `PUT` | `/api/v1/positions/{id}` | Admin | Update position |
| `DELETE` | `/api/v1/positions/{id}` | Admin | Delete position |

---

## Reviews

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/reviews` | None | List all published reviews |
| `GET` | `/api/v1/reviews/{slug}` | None | Get single review by slug |
| `POST` | `/api/v1/reviews` | Member | Create new review |
| `PUT` | `/api/v1/reviews/{id}` | Author/Admin | Update review |
| `DELETE` | `/api/v1/reviews/{id}` | Admin | Delete review |

---

## Users (Admin)

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/users` | Admin | List all users |
| `GET` | `/api/v1/users/{id}` | Admin | Get user by ID |
| `PATCH` | `/api/v1/users/{id}` | Admin | Update user role or status |
| `DELETE` | `/api/v1/users/{id}` | Admin | Delete user |

---

## Implementation Status

| Route Group | Status |
|---|---|
| Health | ✅ Implemented |
| Auth | ✅ Implemented |
| Positions | 🔲 Planned |
| Reviews | 🔲 Planned |
| Users (Admin) | 🔲 Planned |

## Reference
- [`api/contracts.md`](./contracts.md)
- [`backend/app/routes/`](../backend/app/routes/)
- [`docs/api.md`](../docs/api.md)
