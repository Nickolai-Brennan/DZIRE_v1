---
name: deployment-planner
description: Plan and execute deployment of the frontend, backend, and database to production. Use when the user asks to deploy, configure hosting, write Dockerfiles, or set up CI/CD.
category: deployment
version: v1.0
inputs:
  - config/stack.config.json
  - config/env.example
  - existing frontend/ and backend/
outputs:
  - Dockerfile
  - CI/CD workflow file
  - Deployment checklist
  - Hosting guide
---

# Deployment Planner Skill

## Purpose
Prepare and document the full deployment pipeline for Vercel (frontend), Render (backend), and MotherDuck (database).

## When To Use
Use this skill when the user asks to:
- Deploy the application to production
- Write a Dockerfile for the backend
- Configure Vercel or Render
- Set up CI/CD via GitHub Actions
- Produce a deployment checklist

## Inputs
- `config/stack.config.json` (locked stack)
- `config/env.example` (required env vars)
- Built frontend in `frontend/`
- Built backend in `backend/`

## Workflow
1. Verify environment variables against `config/env.example`
2. Build frontend (`npm run build`)
3. Build and containerize backend (`Dockerfile`)
4. Run database migrations (`alembic upgrade head`)
5. Run full test suite (`scripts/test-all.sh`)
6. Configure Vercel project (frontend)
7. Configure Render service (backend)
8. Deploy preview and smoke test
9. Document deployment steps

## Deployment Targets
- **Frontend**: Vercel — auto-deploy from `main` branch
- **Backend**: Render — Python/Docker service
- **Database**: MotherDuck — managed PostgreSQL

## Quality Checklist
- [ ] All env vars set in hosting provider dashboards
- [ ] Dockerfile builds without errors
- [ ] Database migrations run cleanly
- [ ] All tests pass before deploy
- [ ] Preview URL smoke-tested
- [ ] Deployment documented in `docs/`

## Reference
- [`instructions/deployment.md`](../../instructions/deployment.md)
- [`workflows/deployment.md`](../../workflows/deployment.md)
- [`config/env.example`](../../config/env.example)
