# Workflow: Database Build

**Owner**: `database-agent` | **Skill**: `database-designer`

---

## Purpose
Design, migrate, and seed the PostgreSQL database on MotherDuck.

## Stack
- PostgreSQL (MotherDuck)
- Alembic (migrations)
- SQLAlchemy ORM (models in `backend/app/models/`)
- Python seed scripts

## Steps

1. **Define a new table**
   - Write SQL DDL in `database/schemas/table_name.sql`.
   - Create corresponding SQLAlchemy model in `backend/app/models/`.

2. **Create a migration**
   ```bash
   cd backend
   alembic revision --autogenerate -m "add_table_name"
   alembic upgrade head
   ```
   - Migration file saved to `database/migrations/`.

3. **Add indexes**
   - Write index DDL in `database/indexes/table_name_indexes.sql`.

4. **Seed data**
   - Add seed script to `database/seeds/`.
   - Run: `python scripts/seed-database.py`

5. **Verify schema**
   ```bash
   psql $DATABASE_URL -c "\dt"
   ```

## Outputs
- SQL schema files
- SQLAlchemy models
- Alembic migration scripts
- Seed data scripts
