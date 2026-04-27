# Setup Guide — DZIRE_v1

## Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 14+ (local or managed)
- Git

## 1. Clone the Repository

```bash
git clone https://github.com/Nickolai-Brennan/DZIRE_v1.git
cd DZIRE_v1
```

## 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_URL if needed
npm run dev
```

Frontend runs at `http://localhost:5173`.

## 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` and fill in:

| Variable | Description |
|---|---|
| `ENV` | `development` or `production` |
| `DATABASE_URL` | PostgreSQL async URL, e.g. `******localhost:5432/dzire` |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_ALGORITHM` | e.g. `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | e.g. `60` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | e.g. `30` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins, e.g. `http://localhost:5173` |
| `SEED_DEV_ADMIN` | `true` to auto-seed temporary admin on startup (dev only) |

## 4. Run Database Migrations

```bash
cd backend
alembic upgrade head
```

This creates all tables (`users`, `admin_roles`, `admin_users`, `admin_login_attempts`).

## 5. Start Backend

```bash
uvicorn app.main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`.

On first startup in `ENV=development`, the server auto-seeds a temporary admin:
- **username**: `admin` · **password**: `admin`
- ⚠️ **Temporary** — change before any production deploy.

## 6. Verify the Stack

Open `http://localhost:8000/health` — should return `{"status": "ok"}`.

```bash
# Optional: run both servers at once
bash scripts/run-dev.sh
```

## 7. Admin Login (Dev)

Navigate to `http://localhost:5173` — a floating shield icon appears bottom-right in dev mode.
Click it to go to `/admin/login`, then sign in with `admin` / `admin`.

## 8. Run All Tests

```bash
bash scripts/test-all.sh
```

## Reference
- [`backend/.env.example`](../backend/.env.example)
- [`frontend/.env.example`](../frontend/.env.example)
- [`docs/stack.md`](./stack.md)
- [`scripts/run-dev.sh`](../scripts/run-dev.sh)

