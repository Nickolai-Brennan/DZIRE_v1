# Backend Docs — DZIRE_v1

## Stack
- FastAPI (Python 3.11+)
- SQLAlchemy (async ORM)
- Pydantic v2 (schemas)
- Alembic (migrations)
- python-jose (JWT)
- PostgreSQL on MotherDuck

## Folder Structure

```
backend/app/
├── routes/    # Thin APIRouter route handlers
├── services/  # Business logic
├── models/    # SQLAlchemy ORM models
├── schemas/   # Pydantic v2 request/response models
├── auth/      # JWT creation, validation, refresh
├── core/      # App config, DB session, middleware
└── main.py    # FastAPI app factory + router registration
```

## App Entry Point
`backend/app/main.py` — FastAPI app factory. All routers are registered here.

## Auth
- Access token: short-lived (15 min), returned in JSON response body, stored in memory on client
- Refresh token: long-lived (30 days), stored in `Secure; HttpOnly; SameSite=Strict` cookie

## Auth Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/login` | Get access + refresh tokens |
| `POST` | `/auth/refresh` | Exchange refresh token for new access token |
| `POST` | `/auth/logout` | Clear refresh token cookie |
| `GET` | `/me` | Get current user profile |

## Health Check
`GET /api/v1/health` → `{"status": "ok"}`

## Reference
- [`instructions/backend.md`](../instructions/backend.md)
- [`workflows/backend-build.md`](../workflows/backend-build.md)
