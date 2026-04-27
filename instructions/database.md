# instructions/database.md

**Owner**: `database-agent` | **Skill**: `database-designer`

---

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

## Rules
1. All tables must have: primary key, `created_at`, `updated_at` timestamps.
2. Use snake_case for all table and column names.
3. Foreign keys must reference existing tables with `ON DELETE` behavior specified.
4. Every schema change requires a corresponding Alembic migration.
5. Place index DDL in `database/indexes/` (not inline with table DDL).
6. Comment each SQL file with table purpose and owner agent.

## Connection
- Connection string is `DATABASE_URL` in `.env` (see `config/env.example`).
- MotherDuck token: `MOTHERDUCK_TOKEN` env var.

## Reference
- [`prompts/database-prompt.md`](../prompts/database-prompt.md)
- [`workflows/database-build.md`](../workflows/database-build.md)
