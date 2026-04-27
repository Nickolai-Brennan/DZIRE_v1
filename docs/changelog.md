# Changelog

## 2026-04-27 — Phase 1 + Phase 2 (MVP Backend Foundation + Admin Auth)

### Backend — Phase 1: Foundation
- Added: `backend/requirements.txt` (FastAPI, SQLAlchemy, Alembic, passlib[bcrypt], python-jose, asyncpg, pydantic[email])
- Added: `backend/.env.example` (DATABASE_URL, ENV, JWT_SECRET, ALLOWED_ORIGINS, SEED_DEV_ADMIN)
- Added: `backend/.gitignore`
- Changed: `backend/app/core/config.py` — added `ENV` flag, `is_development` property, `seed_dev_admin` setting
- Changed: `backend/app/core/database.py` — lazy async engine init (no crash without DATABASE_URL)
- Changed: `backend/app/main.py` — wired admin router, `/health` endpoint, startup dev-seed hook
- Added: `backend/alembic.ini` — Alembic configuration (DATABASE_URL read from env)
- Added: `backend/alembic/env.py` — async SQLAlchemy Alembic runner
- Added: `backend/alembic/versions/0001_initial.py` — initial migration: `users`, `admin_roles`, `admin_users`, `admin_login_attempts`
- Changed: `backend/README.md` — full local setup guide + admin endpoint table

### Backend — Phase 2: Admin Auth (JWT)
- Added: `backend/app/models/admin_role.py` — `AdminRole` ORM model (`id`, `name` unique, `created_at`)
- Added: `backend/app/models/admin_user.py` — `AdminUser` ORM model (`id`, `username` unique, `password_hash`, `role_id` FK, `is_active`, timestamps)
- Added: `backend/app/models/admin_login_attempt.py` — `AdminLoginAttempt` ORM model (`id`, `username`, `ip` nullable, `success`, `created_at`)
- Changed: `backend/app/models/__init__.py` — exports all new models
- Added: `backend/app/schemas/admin_auth.py` — Pydantic v2 schemas: `AdminLoginRequest`, `AdminTokenResponse` (with `expires_in`), `AdminUserResponse`
- Added: `backend/app/services/admin_service.py` — bcrypt hash/verify, `authenticate_admin`, `get_or_create_role`
- Changed: `backend/app/auth/jwt.py` — added `create_admin_access_token` (type: `admin_access`)
- Added: `backend/app/api/deps.py` — `require_admin` FastAPI dependency (Bearer token → `AdminUser`)
- Added: `backend/app/api/routes/admin_auth.py` — `POST /api/admin/login`, `POST /api/admin/logout` (no-op), `GET /api/admin/me`
- Added: `backend/app/seed/dev_admin.py` — dev-only seed: `admin/admin` with bcrypt hash, explicit `⚠️ TEMPORARY` warning, guarded by `ENV=development`

### Frontend — Phase 2: Admin UI
- Changed: `frontend/src/components/layout/AdminButton.tsx` — rendered only in `import.meta.env.DEV`, added "Admin" hover tooltip with `aria-hidden`
- Added: `frontend/src/lib/auth/token.ts` — `getAdminToken`, `setAdminToken`, `clearAdminToken`, `isAdminAuthenticated` (structure + expiry validated)
- Added: `frontend/src/lib/api/admin.ts` — typed fetch client: `adminLogin`, `adminMe`, `adminLogout`
- Added: `frontend/src/pages/admin/AdminLoginPage.tsx` — username/password form, dev warning banner (`⚠️ Temporary admin credentials`), redirect to `/admin/dashboard` on success
- Added: `frontend/src/pages/admin/AdminDashboardPage.tsx` — auth-guarded dashboard (redirect to `/admin/login` if token absent/expired), logout, placeholder content
- Changed: `frontend/src/App.tsx` — admin routes (`/admin/login`, `/admin/dashboard`) rendered outside `PublicLayout`

## 2026-04-27 — T-006
- Added: `.github/agents/project-startup-agent.md`
- Added: `.github/agents/stack-verifier-agent.md`
- Added: `.github/agents/api-agent.md`
- Added: `.github/agents/documentation-agent.md`
- Added: `.github/agents/testing-agent.md`
- Added: `.github/agents/deployment-agent.md`
- Added: `.github/agents/code-cleaner-agent.md`
- Added: `.github/agents/workflow-builder-agent.md`
- Notes: Completes the 11-agent `.github/agents/` sub-agent layer

## 2026-04-27 — T-008
- Added: `skills/project-planner/SKILL.md`
- Added: `skills/stack-verifier/SKILL.md`
- Added: `skills/frontend-builder/SKILL.md`
- Added: `skills/backend-builder/SKILL.md`
- Added: `skills/database-designer/SKILL.md`
- Added: `skills/api-designer/SKILL.md`
- Added: `skills/documentation-generator/SKILL.md`
- Added: `skills/eval-runner/SKILL.md`
- Added: `skills/deployment-planner/SKILL.md`
- Notes: All 9 required domain skill folders created

## 2026-04-27 — T-013
- Added: `docs/changelog.md` (this file)
- Added: `docs/architecture.md`
- Added: `docs/project-overview.md`
- Added: `docs/setup.md`
- Added: `docs/frontend.md`
- Added: `docs/backend.md`
- Added: `docs/database.md`
- Added: `docs/api.md`
- Added: `docs/agents.md`
- Added: `docs/skills.md`
- Added: `docs/workflows.md`
- Notes: Completes the required docs/ structure

## 2026-04-27 — T-015–T-018
- Added: `database/schemas/` folder
- Added: `database/migrations/` folder
- Added: `database/seeds/` folder
- Added: `database/indexes/` folder
- Added: `database/schemas/users.sql`
- Added: `database/schemas/positions.sql`
- Added: `database/schemas/reviews.sql`
- Notes: Core database scaffold with initial schema tables

## 2026-04-27 — T-019–T-023
- Added: `backend/app/routes/`
- Added: `backend/app/services/`
- Added: `backend/app/models/`
- Added: `backend/app/schemas/`
- Added: `backend/app/auth/`
- Added: `backend/app/core/`
- Added: `backend/app/core/config.py`
- Added: `backend/app/core/database.py`
- Added: `backend/app/auth/jwt.py`
- Added: `backend/app/auth/dependencies.py`
- Added: `backend/app/models/user.py`
- Added: `backend/app/schemas/user.py`
- Added: `backend/app/services/user_service.py`
- Added: `backend/app/routes/auth.py`
- Changed: `backend/app/main.py` expanded with router registration
- Notes: Backend service layer + auth foundation

## 2026-04-27 — T-024–T-025
- Added: `api/routes.md`
- Added: `api/contracts.md`
- Notes: REST route map and request/response contracts documented

## 2026-04-27 — T-029
- Added: `frontend/src/services/api.ts`
- Added: `frontend/src/services/positionsService.ts`
- Added: `frontend/src/services/reviewsService.ts`
- Added: `frontend/src/services/authService.ts`
- Notes: Frontend API client layer scaffolded

## 2026-04-27 — Step 4 Completion (T-031–T-045)
- Expanded: `evals/evals.json` — added 5 realistic project-ai-system eval entries
- Expanded: `evals/frontend-evals.json` — added 4 realistic frontend-builder eval entries
- Expanded: `evals/backend-evals.json` — added 4 realistic backend-builder eval entries
- Expanded: `evals/database-evals.json` — added 4 realistic database-designer eval entries
- Expanded: `evals/api-evals.json` — added 4 realistic api-designer eval entries
- Notes: All Step 4 required files verified present; eval stubs replaced with full entries per `phases/Step 4.md` template. All 11 `.github/agents/` sub-agents, 4 `agents/` runtime agents, 9 `skills/` SKILL.md files, and `tests/README.md` confirmed in place.

## Unreleased
- Initial project structure planned.

