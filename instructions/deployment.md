# instructions/deployment.md

**Owner**: `deployment-agent` | **Skill**: `deployment-planner`

---

## Hosting Targets

| Layer | Host | Notes |
|-------|------|-------|
| Frontend | Vercel | Auto-deploys from `main` branch |
| Backend | Render | Python/Docker service |
| Database | MotherDuck | Managed PostgreSQL |

## Pre-Deploy Checklist
- [ ] `alembic upgrade head` run against production DB
- [ ] All required env vars set in Vercel and Render dashboards
- [ ] Tests passing (`bash scripts/test-all.sh`)
- [ ] `config/stack.config.json` matches deployed stack
- [ ] No secrets in source code

## Key Environment Variables
See `config/env.example` for the full list. Production must have:
- `DATABASE_URL` (MotherDuck connection string)
- `MOTHERDUCK_TOKEN`
- `JWT_SECRET_KEY`
- `VITE_API_BASE_URL` (Vercel env var, set to Render URL)

## Deployment Commands
```bash
# Deploy backend (if not auto-deploy)
render deploy

# Deploy frontend (if not auto-deploy)
cd frontend && vercel --prod
```

## Post-Deploy
- Smoke test: `curl https://<render-url>/api/v1/health`
- Tag release in GitHub
- Update `docs/changelog.md`

## Reference
- [`workflows/deployment.md`](../workflows/deployment.md)
- [`config/env.example`](../config/env.example)
