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
│   │   ├── deps.py          # require_admin FastAPI dependency
│   │   └── routes/
│   │       └── admin_auth.py  # Admin auth endpoints (/api/admin/*)
│   ├── auth/      # JWT creation, validation, refresh
│   ├── core/      # App config, DB session
│   ├── models/    # SQLAlchemy ORM models
│   ├── routes/    # Public route handlers
│   ├── schemas/   # Pydantic v2 request/response schemas
│   ├── seed/      # Dev-only seed scripts (dev_admin.py)
│   ├── services/  # Business logic
│   └── main.py    # App factory and router registration
├── alembic/       # Alembic async migration runner
│   └── versions/
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
├── design-system/       # ← NEW (Step 6) — centralised design system
│   ├── tokens/          # Design tokens: colors, typography, spacing, radii, shadows, z-index, breakpoints
│   ├── components/      # Primitive UI components (Button, Card, Badge, FormField, Modal, DataTable, StatCard)
│   ├── layouts/         # Page layout shells (PublicLayout, AdminLayout, ArticleLayout, DashboardLayout, LandingPageLayout)
│   ├── patterns/        # Composed sections (HeroSection, BlogCardGrid, FeatureGrid, SponsorStrip)
│   └── README.md        # Usage guide with import examples
├── components/  # Reusable UI components (legacy + domain-specific)
├── pages/       # Route-level page components
├── services/    # API client functions
├── data/        # Mock data (replaced by services/ as API is built)
├── utils/       # Utility/helper functions
└── assets/      # Static assets
```

## Reference
- [`config/stack.config.json`](../config/stack.config.json)
- [`config/agents.config.json`](../config/agents.config.json)
- [`docs/stack.md`](./stack.md)
