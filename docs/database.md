# Database Docs — DZIRE_v1

## Stack
- PostgreSQL (hosted on MotherDuck)
- Alembic (schema migrations)
- SQLAlchemy ORM (models in `backend/app/models/`)
- Python seed scripts (`database/seeds/`)

## Folder Structure

```
database/
├── schemas/     # SQL DDL table definitions
├── migrations/  # Alembic migration scripts
├── seeds/       # Seed / fixture data scripts
└── indexes/     # Index definitions
```

## Tables

| Table | Description |
|---|---|
| `users` | Platform user accounts (auth, roles) |
| `positions` | Position content with scoring |
| `reviews` | User and editorial reviews |

## Rules
- All tables have: `id`, `created_at`, `updated_at`
- snake_case naming throughout
- Foreign keys specify `ON DELETE` behavior
- Every schema change has a corresponding Alembic migration
- Indexes are defined in `database/indexes/` (not inline)

## Connection
- `DATABASE_URL` env var (see `config/env.example`)
- `MOTHERDUCK_TOKEN` env var for MotherDuck access

## Running Migrations

```bash
cd backend
alembic upgrade head
```

## Reference
- [`instructions/database.md`](../instructions/database.md)
- [`workflows/database-build.md`](../workflows/database-build.md)
- [`database/schemas/`](../database/schemas/)
