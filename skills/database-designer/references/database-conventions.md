# Database Design Conventions

Reference for the `database-designer` skill. Covers PostgreSQL schema conventions, Alembic migration patterns, index strategy, and seed data rules for DZIRE_v1.

## Table Conventions

- All table names are **plural snake_case**: `users`, `job_postings`, `review_scores`
- Every table **must** have:
  - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
  - `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Columns use snake_case: `first_name`, `is_active`
- Boolean columns prefixed with `is_` or `has_`: `is_active`, `has_verified_email`

## Foreign Key Conventions

- Name FK columns `[referenced_table_singular]_id`: `user_id`, `position_id`
- Always specify `ON DELETE` behavior:
  - `ON DELETE CASCADE` — child records are deleted with parent
  - `ON DELETE SET NULL` — FK becomes NULL when parent deleted
  - `ON DELETE RESTRICT` — prevents parent deletion if child exists

```sql
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
```

## Naming Conventions

| Object | Convention | Example |
|--------|-----------|---------|
| Tables | plural_snake_case | `job_applications` |
| Columns | snake_case | `applied_at` |
| Indexes | `idx_[table]_[column]` | `idx_users_email` |
| Unique indexes | `uq_[table]_[column]` | `uq_users_email` |
| FK columns | `[ref_table_singular]_id` | `user_id` |
| Junction tables | `[table1]_[table2]` | `user_roles` |

## Alembic Migration Rules

- One migration file per logical change (not one per table)
- Migration file name: `[timestamp]_[short_description].py`
- Always implement both `upgrade()` and `downgrade()`
- Test rollback (`alembic downgrade -1`) before committing

```python
def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", pg.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("email", sa.String, nullable=False, unique=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

def downgrade() -> None:
    op.drop_table("users")
```

## Index Strategy

- Always index foreign key columns
- Index columns used in `WHERE`, `ORDER BY`, or `JOIN`
- Use partial indexes for soft-deleted or status-filtered queries
- Composite indexes: order by cardinality (high → low)

```sql
-- Single column
CREATE INDEX idx_users_email ON users(email);

-- Composite
CREATE INDEX idx_posts_user_status ON posts(user_id, status);

-- Partial
CREATE INDEX idx_users_active ON users(email) WHERE is_active = true;
```

## Seed Data Rules

- Seed files go in `database/seeds/`
- Seeds must be idempotent (`INSERT ... ON CONFLICT DO NOTHING`)
- Use deterministic UUIDs for seed records (not `gen_random_uuid()`)
- Include at least 3–5 realistic records per table for testing

## Environments

| Environment | Database | Host |
|------------|---------|------|
| Local dev | PostgreSQL (Docker) | `localhost:5432` |
| Staging | MotherDuck | cloud |
| Production | MotherDuck | cloud |
