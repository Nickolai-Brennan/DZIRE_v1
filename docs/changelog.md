# Changelog

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

## Unreleased
- Initial project structure planned.
