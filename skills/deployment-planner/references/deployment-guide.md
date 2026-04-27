# Deployment Guide

Reference for the `deployment-planner` skill. Covers Vercel (frontend), Render (backend), MotherDuck (database), environment variable management, and CI/CD configuration for DZIRE_v1.

## Deployment Targets

| Layer | Platform | Trigger |
|-------|---------|---------|
| Frontend | Vercel | Push to `main` (auto-deploy) |
| Backend | Render | Push to `main` (Docker service) |
| Database | MotherDuck | Manual migration via Alembic |

## Pre-Deployment Checklist

Before deploying to any environment:
1. All env vars set in provider dashboard (cross-reference `config/env.example`)
2. Database migrations tested locally: `alembic upgrade head`
3. Tests passing: `scripts/test-all.sh`
4. Docker image builds locally: `docker build -t dzire-backend .`
5. Frontend builds locally: `npm run build`

## Environment Variables

Copy `config/env.example` to provider dashboards. Required vars:

```
DATABASE_URL=
SECRET_KEY=
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
FRONTEND_URL=
CORS_ORIGINS=
```

## Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project (first time)
vercel link

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

Vercel config (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Backend (Render)

Render reads `Dockerfile` from the repo root. Key settings:
- **Environment**: Docker
- **Branch**: `main`
- **Health check path**: `/health`
- **Port**: `8000`

```dockerfile
# See assets/dockerfile-template for the full template
```

## Database Migrations (MotherDuck)

```bash
# Apply migrations to production
DATABASE_URL=<motherduck-url> alembic upgrade head

# Rollback one migration
DATABASE_URL=<motherduck-url> alembic downgrade -1

# Check current migration
alembic current
```

## CI/CD (GitHub Actions)

Workflow file: `.github/workflows/deploy.yml`

Typical pipeline:
1. `lint` — ruff + eslint
2. `test` — pytest + vitest
3. `build` — Docker build (backend) + Vite build (frontend)
4. `deploy` — Trigger Vercel + Render deploys

## Smoke Testing After Deploy

After each deployment, verify:
- `GET /health` returns `{"status": "ok"}`
- Frontend loads at production URL
- Auth flow works (login, token refresh)
- One critical user flow end-to-end

## Rollback Plan

| Layer | Rollback method |
|-------|----------------|
| Frontend | `vercel rollback` (previous deployment) |
| Backend | Re-deploy previous Docker image tag |
| Database | `alembic downgrade -1` (then re-deploy old code) |
