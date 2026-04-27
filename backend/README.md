# backend/

FastAPI + Python backend for DZIRE_v1.

## Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── deps.py          # Admin auth dependency (require_admin)
│   │   └── routes/
│   │       └── admin_auth.py  # POST /api/admin/login, /logout, GET /me
│   ├── auth/        # JWT creation and validation
│   ├── core/        # Config, DB session
│   ├── models/      # SQLAlchemy ORM models
│   ├── routes/      # Public API route handlers
│   ├── schemas/     # Pydantic v2 request/response schemas
│   ├── seed/        # Dev-only seed scripts
│   ├── services/    # Business logic
│   └── main.py      # FastAPI entry point
├── alembic/         # Alembic migrations
│   └── versions/
│       └── 0001_initial.py
├── alembic.ini
├── requirements.txt
├── .env.example
└── README.md
```

## Stack
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Auth**: JWT (admin access tokens in Authorization header)
- **Database**: PostgreSQL (asyncpg)
- **Migrations**: Alembic
- **Hosting**: Render

## Local Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Edit .env: set DATABASE_URL to your local PostgreSQL instance

# 3. Run migrations
cd backend
alembic upgrade head

# 4. Start dev server
uvicorn app.main:app --reload --port 8000
```

On startup in `ENV=development`, the server automatically seeds a temporary admin user:
- **username**: `admin`
- **password**: `admin`

> ⚠️ **WARNING**: Temporary credentials — **change before any production deploy.**

## Admin Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/admin/login` | — | Login; returns JWT |
| POST | `/api/admin/logout` | Bearer | No-op (client discards token) |
| GET | `/api/admin/me` | Bearer | Returns current admin user |
| GET | `/health` | — | Health check |

## Owner
`backend-agent` → `backend-builder` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
