# Stack Requirements

Reference for the `stack-verifier` skill. Documents the required tool versions, environment variables, and system dependencies for DZIRE_v1.

## Required Tools

| Tool | Minimum Version | Install command |
|------|----------------|-----------------|
| Node.js | 18.x | `nvm install 18` or https://nodejs.org |
| npm | 9.x | Bundled with Node.js |
| Python | 3.11 | `pyenv install 3.11` or https://python.org |
| pip | 23.x | `python -m pip install --upgrade pip` |
| Docker | 24.x | https://docs.docker.com/get-docker |
| Git | 2.x | https://git-scm.com |
| PostgreSQL client | 14.x | `brew install postgresql` (local dev only) |

## Frontend Dependencies

Verify with: `cd frontend && npm ls`

Required packages (from `frontend/package.json`):
- `react` ^18.x
- `react-dom` ^18.x
- `react-router-dom` ^6.x
- `typescript` ^5.x
- `vite` ^5.x
- `tailwindcss` ^3.x

## Backend Dependencies

Verify with: `pip list | grep -E "fastapi|sqlalchemy|alembic|pydantic"`

Required packages (from `backend/requirements.txt`):
- `fastapi` >=0.110
- `uvicorn[standard]` >=0.27
- `sqlalchemy[asyncio]` >=2.0
- `alembic` >=1.13
- `pydantic` >=2.5
- `pydantic-settings` >=2.1
- `asyncpg` >=0.29
- `python-jose[cryptography]` >=3.3
- `passlib[bcrypt]` >=1.7

## Environment Variables

Required variables (from `config/env.example`):

```bash
DATABASE_URL=          # PostgreSQL connection string
SECRET_KEY=            # JWT signing secret (min 32 chars)
JWT_ALGORITHM=HS256    # JWT algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
FRONTEND_URL=          # Used for CORS
CORS_ORIGINS=          # Comma-separated allowed origins
```

## Verification Steps

1. Check Node: `node --version`
2. Check Python: `python --version`
3. Check Docker: `docker --version`
4. Check frontend deps: `cd frontend && npm ls --depth=0`
5. Check backend deps: `pip list`
6. Check `.env` exists: `ls -la .env`
7. Check database connection: `alembic current`

## Common Issues

| Issue | Likely cause | Fix |
|-------|-------------|-----|
| `ModuleNotFoundError` | Missing Python dep | `pip install -r requirements.txt` |
| `Cannot find module` | Missing npm dep | `npm install` in `frontend/` |
| Database connection refused | DB not running | Start Docker: `docker compose up db -d` |
| Alembic: "Can't locate revision" | Migrations out of sync | `alembic stamp head` (dev only) |
| CORS error in browser | CORS_ORIGINS not set | Add frontend URL to `CORS_ORIGINS` in `.env` |
