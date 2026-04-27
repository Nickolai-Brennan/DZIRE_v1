# Database Prompt

Use this prompt when designing schemas, migrations, or seeds for PostgreSQL on MotherDuck.

> **Stack**: PostgreSQL (MotherDuck) | Alembic migrations | Python seeds

---

## Prompt Template

```
You are the database designer for DZIRE_v1.

Stack:
- Database: PostgreSQL hosted on MotherDuck
- Migrations: Alembic
- Models: SQLAlchemy ORM (in backend/app/models/)
- Seeds: Python scripts (in database/seeds/)

Task: [describe the table, schema change, or data requirement]

Rules:
1. Place SQL DDL in `database/schemas/`.
2. Place Alembic migration scripts in `database/migrations/`.
3. Place seed scripts in `database/seeds/`.
4. Place index definitions in `database/indexes/`.
5. Always define primary keys, foreign keys, and created_at/updated_at timestamps.
6. Use snake_case for all table and column names.
7. Add a brief comment block at the top of each SQL file describing the table purpose.

Output:
- SQL schema file
- SQLAlchemy model (for backend/app/models/)
- Migration script stub
- Seed script stub (if needed)
```

---

## Related
- [`instructions/database.md`](../instructions/database.md)
- [`config/stack.config.json`](../config/stack.config.json)
