# Workflow: Deployment

**Owner**: `deployment-agent` | **Skill**: `deployment-planner`

---

## Purpose
Deploy DZIRE_v1 to production: frontend on Vercel, backend on Render, database on MotherDuck.

## Stack
- **Frontend**: Vercel (auto-deploys from `main` branch)
- **Backend**: Render (Docker or Python service)
- **Database**: MotherDuck (PostgreSQL)

## Steps

### 1. Environment setup
- Confirm production `.env` values are set in Vercel and Render dashboards.
- Key vars: `DATABASE_URL`, `JWT_SECRET_KEY`, `MOTHERDUCK_TOKEN`, `VITE_API_BASE_URL`.

### 2. Database migration (run before deploying backend)
```bash
cd backend
alembic upgrade head
```

### 3. Deploy backend (Render)
- Push to `main` branch (Render auto-deploys if connected).
- Or manually trigger via Render dashboard.
- Confirm: `curl https://your-render-url/api/v1/health`

### 4. Deploy frontend (Vercel)
- Push to `main` branch (Vercel auto-deploys if connected).
- Or: `vercel --prod` from `frontend/`.
- Confirm: visit Vercel URL and test login flow.

### 5. Smoke test production
- [ ] Health check endpoint returns `200 OK`.
- [ ] Login and token refresh work.
- [ ] Key features load without errors.

### 6. Post-deploy
- Tag the release in GitHub.
- Update `docs/changelog.md`.

## Outputs
- Live frontend on Vercel
- Live backend API on Render
- Database connected via MotherDuck
