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
│   │   ├── deps.py              # require_admin dependency (admin JWT)
│   │   └── routes/
│   │       └── admin_auth.py    # Admin auth endpoints
│   ├── auth/                    # Step 7 — full auth module
│   │   ├── dependencies.py      # get_current_user (cookie + Bearer), get_current_user_optional
│   │   ├── jwt.py               # Legacy JWT helpers (access + admin_access tokens)
│   │   ├── models.py            # AuditLog ORM model
│   │   ├── routes.py            # /api/auth/* endpoints
│   │   ├── schemas.py           # Auth request/response schemas
│   │   ├── security.py          # bcrypt password hashing
│   │   ├── services.py          # Business logic, email stubs, audit logging
│   │   └── tokens.py            # JWT creation with rich claims
│   ├── permissions/             # Step 7 — RBAC
│   │   ├── guards.py            # require_admin, require_vip, require_permission
│   │   ├── permissions.py       # Permission enum + role→permission map
│   │   ├── roles.py             # Role enum + descriptions
│   │   └── services.py          # Permission lookup helpers
│   ├── users/                   # Step 7 — user management
│   │   ├── models.py            # Re-exports User from app.models.user
│   │   ├── routes.py            # /api/users/* endpoints
│   │   ├── schemas.py           # User CRUD schemas
│   │   └── services.py          # User CRUD business logic
│   ├── core/                    # App config, DB session
│   ├── models/                  # SQLAlchemy ORM models
│   ├── routes/                  # Legacy public route handlers
│   ├── schemas/                 # Legacy Pydantic schemas
│   ├── seed/                    # Dev-only seed scripts
│   ├── services/                # Legacy business logic
│   └── main.py                  # FastAPI app factory + router registration
├── alembic/                     # Alembic migrations
│   └── versions/
│       ├── 0001_initial.py      # users, admin_roles, admin_users, admin_login_attempts
│       └── 0002_step7_auth.py   # Extended users + audit_logs
├── alembic.ini
├── requirements.txt
├── .env.example
└── .gitignore
```

## App Entry Point
`backend/app/main.py` — FastAPI app factory. Registers all routers; runs dev seed on startup.

## Auth (Step 7)

Both access and refresh tokens are stored in `HttpOnly; Secure; SameSite=Strict` cookies.
The access token is also returned in the JSON body for API clients using `Authorization: Bearer`.

```
access_token  → HttpOnly cookie + JSON body   (60 min default)
refresh_token → HttpOnly cookie only          (30 days default)
```

### JWT Claims (access token)
```json
{ "sub": "<uuid>", "user_id": "<uuid>", "email": "...", "role": "member", "is_vip": false, "exp": 0, "type": "access" }
```

## API Endpoints

### Step 7 — User Auth (`/api/auth/*`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Create account + set cookies |
| `POST` | `/api/auth/login` | None | Login + set cookies |
| `POST` | `/api/auth/logout` | Cookie | Clear auth cookies |
| `POST` | `/api/auth/refresh` | Cookie | Rotate tokens (refresh rotation) |
| `POST` | `/api/auth/forgot-password` | None | Request password reset email |
| `POST` | `/api/auth/reset-password` | None | Complete reset with token |
| `POST` | `/api/auth/verify-email` | None | Verify email with token |

### Step 7 — Users (`/api/users/*`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | Cookie/Bearer | Current user profile |
| `PUT` | `/api/users/update` | Cookie/Bearer | Update own profile |
| `GET` | `/api/users/list` | Admin | List all users |
| `GET` | `/api/users/{id}` | Admin | Get user by UUID |
| `PATCH` | `/api/users/{id}/admin-update` | Admin | Change role/status/VIP |
| `DELETE` | `/api/users/delete/{id}` | Admin | Delete user |

### Legacy Public Auth (`/auth/*`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Login (Bearer token in body) |
| `POST` | `/auth/refresh` | Cookie | Refresh access token |
| `POST` | `/auth/logout` | Cookie | Clear refresh token |
| `GET` | `/auth/me` | Bearer | Current user profile |

### Admin Auth (`/api/admin/*`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | None | Admin login → JWT; records attempt |
| `POST` | `/api/admin/logout` | Bearer | No-op MVP |
| `GET` | `/api/admin/me` | Bearer | Current admin user |

### Health
`GET /health` → `{"status": "ok"}`

## Dev Admin Seed
On startup (when `ENV=development`), the server auto-seeds a temporary admin account:
- **username**: `admin` · **password**: `admin` (bcrypt-hashed in DB)
- ⚠️ **TEMPORARY** — `TODO: Change admin credentials before production.`

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | *(required)* | `postgresql+asyncpg://...` |
| `JWT_SECRET` | `changeme` | **Change in production** |
| `JWT_ALGORITHM` | `HS256` | Signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | Access token TTL |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `30` | Refresh token TTL |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated CORS origins |
| `ENV` | `development` | `development` \| `production` |

## Local Setup
```bash
pip install -r requirements.txt
cp .env.example .env        # set DATABASE_URL and JWT_SECRET
alembic upgrade head        # apply all migrations (0001 + 0002)
uvicorn app.main:app --reload
```

## Reference
- [`docs/authentication.md`](./authentication.md) — JWT cookie flow, email integration
- [`docs/roles-permissions.md`](./roles-permissions.md) — RBAC roles and permissions
- [`docs/security.md`](./security.md) — passwords, CSRF, rate limiting, audit logs
- [`instructions/backend.md`](../instructions/backend.md)
- [`backend/.env.example`](../backend/.env.example)

