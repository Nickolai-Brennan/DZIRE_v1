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
backend/app/
├── routes/    # Thin route handlers (APIRouter)
├── services/  # Business logic
├── models/    # SQLAlchemy ORM models
├── schemas/   # Pydantic v2 request/response schemas
├── auth/      # JWT creation, validation, refresh
├── core/      # App config, DB session, middleware
└── main.py    # App factory and router registration
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
├── components/  # Reusable UI components
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
