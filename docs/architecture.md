# Architecture — DZIRE_v1

## Layers

```
┌─────────────────────────────────────┐
│           AI Control Layer          │
│  .github/ agents/ skills/           │
│  instructions/ workflows/ prompts/  │
│  templates/ evals/                  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           App Build Layer           │
│  frontend/  backend/                │
│  database/  api/  tests/            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Support Layer             │
│  scripts/  docs/  config/           │
└─────────────────────────────────────┘
```

## Data Flow

```
Browser (React)
  → frontend/src/services/
  → /api/v1/ (FastAPI routes)
  → backend/app/services/
  → backend/app/models/
  → PostgreSQL (MotherDuck)
```

## Agent Flow

```
project-startup-agent
→ stack-verifier-agent
→ system-architect-agent
→ database-agent
→ backend-agent
→ api-agent
→ frontend-agent
→ testing-agent
→ documentation-agent
→ deployment-agent
→ code-cleaner-agent
→ workflow-builder-agent
```

## Instruction Cascade

```
instructions/root.md
→ instructions/system.md
→ instructions/project.md
→ domain instruction (frontend/backend/database/api/docs/testing/deployment)
→ agent instruction (.github/agents/)
→ skill instruction (skills/*/SKILL.md)
→ user request
```

## Backend Folder Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── deps.py              # require_admin FastAPI dependency (admin JWT)
│   │   └── routes/
│   │       └── admin_auth.py    # Admin auth endpoints (/api/admin/*)
│   ├── auth/                    # Step 7 — full auth module
│   │   ├── dependencies.py      # get_current_user (cookie + Bearer)
│   │   ├── jwt.py               # Legacy JWT helpers
│   │   ├── models.py            # AuditLog ORM model
│   │   ├── routes.py            # /api/auth/* endpoints
│   │   ├── schemas.py           # Auth request/response schemas
│   │   ├── security.py          # bcrypt password hashing
│   │   ├── services.py          # Business logic + email stubs
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
│   ├── core/      # App config, DB session
│   ├── models/    # SQLAlchemy ORM models
│   ├── routes/    # Legacy public route handlers
│   ├── schemas/   # Legacy Pydantic v2 schemas
│   ├── seed/      # Dev-only seed scripts (dev_admin.py)
│   ├── services/  # Legacy business logic
│   └── main.py    # App factory and router registration
├── alembic/       # Alembic async migration runner
│   └── versions/
│       ├── 0001_initial.py    # Base schema
│       └── 0002_step7_auth.py # Extended users + audit_logs
├── alembic.ini
├── requirements.txt
└── .env.example
```

## Database Folder Structure

```
database/
├── schemas/     # SQL DDL table definitions
├── migrations/  # Alembic migration scripts
├── seeds/       # Seed / fixture data scripts
└── indexes/     # Index definitions
```

## Frontend Folder Structure

```
frontend/src/
├── auth/                    # Step 7 — auth pages
│   ├── LoginPage.tsx        # Cookie-based login
│   ├── RegisterPage.tsx     # Cookie-based registration
│   ├── ForgotPasswordPage.tsx
│   └── ResetPasswordPage.tsx
├── design-system/           # Step 6 — centralised design system
│   ├── tokens/              # Design tokens: colors, typography, spacing, radii, shadows, z-index, breakpoints
│   ├── components/          # Primitive UI components (Button, Card, Badge, FormField, Modal, DataTable, StatCard)
│   ├── layouts/             # Page layout shells (PublicLayout, AdminLayout, ArticleLayout, DashboardLayout, LandingPageLayout)
│   ├── patterns/            # Composed sections (HeroSection, BlogCardGrid, FeatureGrid, SponsorStrip)
│   └── README.md            # Usage guide with import examples
├── components/
│   ├── auth/                # Step 7 — auth components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── RoleGate.tsx
│   └── ...                  # Reusable UI components (legacy + domain-specific)
├── context/
│   ├── AuthContext.tsx      # Step 7 — real API auth + session restore
│   ├── FavoritesContext.tsx
│   └── PlaylistContext.tsx
├── hooks/                   # Step 7 — custom hooks
│   ├── useAuth.ts
│   └── usePermissions.ts
├── pages/       # Route-level page components
├── services/    # API client functions (api.ts, authService.ts, ...)
├── data/        # Mock data (replaced by services/ as API is built)
├── utils/       # Utility/helper functions
└── assets/      # Static assets
```

## Reference
- [`config/stack.config.json`](../config/stack.config.json)
- [`config/agents.config.json`](../config/agents.config.json)
- [`docs/stack.md`](./stack.md)
