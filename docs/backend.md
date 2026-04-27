# Backend Docs — DZIRE_v1

## Stack
- FastAPI (Python 3.11+)
- SQLAlchemy (async ORM)
- Pydantic v2 (schemas)
- Alembic (migrations)
- python-jose (JWT)
- passlib[bcrypt] (password hashing)
- asyncpg (PostgreSQL async driver)
- PostgreSQL

## Folder Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── deps.py          # require_admin dependency
│   │   └── routes/
│   │       └── admin_auth.py  # Admin auth endpoints
│   ├── auth/      # JWT creation, validation (access + admin_access tokens)
│   ├── core/      # App config, DB session
│   ├── models/    # SQLAlchemy ORM models
│   ├── routes/    # Public route handlers (auth, etc.)
│   ├── schemas/   # Pydantic v2 request/response schemas
│   ├── seed/      # Dev-only seed scripts
│   ├── services/  # Business logic
│   └── main.py    # FastAPI app factory + router registration
├── alembic/       # Alembic migrations
│   └── versions/
│       └── 0001_initial.py
├── alembic.ini
├── requirements.txt
├── .env.example
└── .gitignore
```

## App Entry Point
`backend/app/main.py` — FastAPI app factory. Registers all routers; runs dev seed on startup.

## Public Auth
- Access token: short-lived (60 min), returned in JSON body, stored in memory on client
- Refresh token: long-lived (30 days), stored in `Secure; HttpOnly; SameSite=Strict` cookie

## Public Auth Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Get access + refresh tokens |
| `POST` | `/auth/refresh` | Cookie | Exchange refresh token for new access token |
| `POST` | `/auth/logout` | Cookie | Clear refresh token cookie |
| `GET` | `/auth/me` | Bearer | Get current user profile |

## Admin Auth Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | None | Admin login → JWT access token |
| `POST` | `/api/admin/logout` | Bearer | No-op MVP (client discards token) |
| `GET` | `/api/admin/me` | Bearer | Current admin user details |

## Health Check
`GET /health` → `{"status": "ok"}`

## Dev Admin Seed
On startup (when `ENV=development`), the server auto-seeds a temporary admin account:
- **username**: `admin` · **password**: `admin` (bcrypt-hashed in DB)
- ⚠️ **TEMPORARY** — `TODO: Change admin credentials before production.`

## Local Setup
```bash
pip install -r requirements.txt
cp .env.example .env        # set DATABASE_URL
alembic upgrade head        # apply migrations
uvicorn app.main:app --reload
```

## Reference
- [`instructions/backend.md`](../instructions/backend.md)
- [`workflows/backend-build.md`](../workflows/backend-build.md)
- [`backend/.env.example`](../backend/.env.example)

