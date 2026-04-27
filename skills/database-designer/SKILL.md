---
name: database-designer
description: Design and document the PostgreSQL database schema, migrations, seeds, and indexes. Use when the user asks to create tables, relationships, migrations, or seed data.
category: build
version: v1.0
inputs:
  - user request
  - existing database/schemas/
  - instructions/database.md
outputs:
  - SQL DDL schema files
  - Alembic migration scripts
  - Seed data scripts
  - Index definitions
---

# Database Designer Skill

## Purpose
Design a well-structured PostgreSQL schema with migrations, seeds, and indexes following the DZIRE_v1 database rules.

## When To Use
Use this skill when the user asks to:
- Create a new database table
- Define relationships between tables
- Write a migration
- Add seed or fixture data
- Define database indexes

## Inputs
- User request (entity or feature description)
- Existing `database/schemas/` files
- Stack: PostgreSQL on MotherDuck, Alembic, SQLAlchemy ORM

## Workflow
1. Identify the entity and its attributes
2. Define the SQL DDL with `id`, `created_at`, `updated_at` (required on all tables)
3. Add foreign keys with `ON DELETE` behavior specified
4. Write corresponding Alembic migration in `database/migrations/`
5. Add seed data script to `database/seeds/` if needed
6. Place index DDL in `database/indexes/`
7. Review against checklist

## Output Format
```
database/
├── schemas/[entity].sql
├── migrations/[timestamp]_[description].py
├── seeds/[entity]_seed.py
└── indexes/[entity]_indexes.sql
```

## Quality Checklist
- [ ] Table has `id`, `created_at`, `updated_at`
- [ ] snake_case naming throughout
- [ ] Foreign keys have `ON DELETE` behavior
- [ ] Alembic migration created for every schema change
- [ ] Indexes defined in `database/indexes/`

## Reference
- [`instructions/database.md`](../../instructions/database.md)
- [`workflows/database-build.md`](../../workflows/database-build.md)
