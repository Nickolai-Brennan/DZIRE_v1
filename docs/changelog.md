# Changelog

## 2026-04-27 — Step 6: Design System + Brand Guidelines (T-076..T-100)

### Design System — Tokens (`frontend/src/design-system/tokens/`)
- Added: `colors.ts` — full DZIRE brand palette (background, surface, primary, accent, gold, VIP, sponsor) + semantic tokens (success, warning, danger, info) + overlay values
- Added: `typography.ts` — display (Barlow Condensed), body (Inter), mono (JetBrains Mono) families; full size scale, weight, leading, and tracking maps
- Added: `spacing.ts` — 4px-base spacing scale with named aliases (`xs`–`4xl`)
- Added: `radii.ts` — border-radius presets from `none` (0px) to `full` (999px)
- Added: `shadows.ts` — elevation levels + brand glow effects (glowPrimary, glowGold, glowVip) + glass shadow
- Added: `z-index.ts` — explicit stacking order (base → modal → toast → tooltip → max)
- Added: `breakpoints.ts` — mobile-first breakpoints (`sm` 640px → `2xl` 1536px)
- Added: `index.ts` — barrel export for all tokens

### Design System — Components (`frontend/src/design-system/components/`)
- Added: `Button.tsx` — 8 variants (primary/secondary/accent/ghost/outline/danger/vip/sponsor), 3 sizes, loading spinner, left/right icon slots, accessible focus ring
- Added: `Card.tsx` — 6 variants (default/glass/elevated/outline/vip/sponsor) + `CardHeader`, `CardBody`, `CardFooter` sub-components
- Added: `Badge.tsx` — 9 variants (default/category/success/warning/danger/info/vip/sponsor/trophy), 2 sizes
- Added: `FormField.tsx` — accessible label/hint/error/required wrapper; auto-wires `aria-describedby`, `aria-invalid`, `aria-required`; exports `inputBaseClasses`
- Added: `Modal.tsx` — React Portal modal with Escape-to-close, backdrop click, scroll lock, auto-focus; `role="dialog"` + `aria-modal`
- Added: `DataTable.tsx` — generic typed `DataTable<T>` with striped rows, empty-state slot, column alignment, semantic `<table>` markup
- Added: `StatCard.tsx` — KPI metric card with icon pill, trend direction indicator, description
- Added: `index.ts` — barrel export for all components

### Design System — Layouts (`frontend/src/design-system/layouts/`)
- Added: `PublicLayout.tsx` — Header + children + Footer; optional fluid (full-bleed) mode
- Added: `AdminLayout.tsx` — re-export of `admin/AdminLayout.tsx` for single import path
- Added: `ArticleLayout.tsx` — narrow reading column (max-w-2xl) + optional sidebar slot
- Added: `DashboardLayout.tsx` — collapsible off-canvas sidebar (mobile) + top header bar + scrollable content area
- Added: `LandingPageLayout.tsx` — full-width, no container; header/footer optional
- Added: `index.ts` — barrel export for all layouts

### Design System — Patterns (`frontend/src/design-system/patterns/`)
- Added: `BlogCardGrid.tsx` — responsive 2/3/4-column article card grid with category, VIP, and sponsor badges
- Added: `HeroSection.tsx` — full-width hero with headline, sub-copy, primary + secondary CTA, optional background image
- Added: `FeatureGrid.tsx` — icon + title + description grid with optional heading section
- Added: `SponsorStrip.tsx` — horizontal partner/sponsor logo strip with accessible links
- Added: `index.ts` — barrel export for all patterns

### Design System — Root
- Added: `frontend/src/design-system/README.md` — usage guide with import examples and token/component reference table
- Added: `frontend/src/design-system/index.ts` — single root barrel export

### Brand Assets
- Added: `frontend/public/brand/README.md` — logo file structure, expected variants, usage rules, placeholder note

### Documentation
- Added: `docs/brand-guidelines.md` — brand foundation, logo system, color palette, typography, spacing, iconography, voice/tone, accessibility (T-076)
- Added: `docs/design-system.md` — full architecture reference: tokens, components, layouts, patterns, import paths (T-077)
- Added: `docs/ui-components.md` — complete component API reference (Button, Card, Badge, FormField, Modal, DataTable, StatCard)
- Added: `docs/social-media-style-guide.md` — graphic types, platform dimensions, design rules, post templates (T-096)
- Added: `docs/admin-dashboard-style.md` — layout, KPI cards, nav, tables, forms, charts, filters, destructive-action pattern (T-097)

### Agents (`.github/agents/`)
- Added: `design-system-agent.md` — builds/extends design tokens and components (T-098)
- Added: `brand-guidelines-agent.md` — defines/enforces visual identity rules (T-099)
- Added: `ui-component-agent.md` — creates accessible reusable UI primitives
- Added: `social-graphics-agent.md` — defines social asset rules and templates

### Skills (`skills/`)
- Added: `design-system-builder/SKILL.md`
- Added: `brand-guidelines-builder/SKILL.md`
- Added: `ui-component-builder/SKILL.md`
- Added: `social-graphics-builder/SKILL.md`

### Updated Docs
- Updated: `docs/checklist.md` — all Step 6 checklist items marked complete `[x]`
- Updated: `docs/task-list.md` — T-076..T-100 marked complete (T-095 VIPPaywall deferred)
- Updated: `docs/frontend.md` — added `design-system/` to folder structure
- Updated: `docs/architecture.md` — added design-system layer to frontend structure
- Updated: `docs/stack.md` — corrected React 18 → 19, Tailwind v4, added Design System row and domain-ownership row

### Build Verification
- `npm run build` — ✅ 0 TypeScript errors, 1814 modules, 441 KB JS bundle

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

