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

| Table | Description | Migration |
|---|---|---|
| `users` | Platform user accounts (auth, roles, VIP, status) | 0001 + 0002 |
| `admin_roles` | Admin role definitions | 0001 |
| `admin_users` | Admin panel users (separate from public users) | 0001 |
| `admin_login_attempts` | Admin login audit log | 0001 |
| `audit_logs` | Security event log (logins, resets, role changes) | 0002 |

## `users` Table (Step 7 — full schema)

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | String | Unique, indexed |
| `username` | String | Unique, indexed |
| `hashed_password` | String | bcrypt hash |
| `first_name` | String(128) | Nullable |
| `last_name` | String(128) | Nullable |
| `avatar_url` | String(512) | Nullable |
| `role` | String | Default: `member` |
| `status` | String(32) | `active` \| `inactive` \| `suspended` \| `banned` |
| `is_active` | Boolean | Default: `true` |
| `is_verified` | Boolean | Default: `false` |
| `is_vip` | Boolean | Default: `false` |
| `vip_plan_id` | String(128) | Nullable |
| `email_verify_token` | String(256) | Nullable; cleared on verify |
| `password_reset_token` | String(256) | Nullable; cleared after reset |
| `password_reset_expires` | DateTime(tz) | Nullable |
| `last_login` | DateTime(tz) | Nullable; updated on login |
| `created_at` | DateTime(tz) | Server default: `now()` |
| `updated_at` | DateTime(tz) | Server default + `onupdate` |

## `audit_logs` Table (Step 7)

| Column | Type | Notes |
|---|---|---|
| `id` | Integer | PK, autoincrement |
| `actor_id` | String(128) | UUID of acting user, indexed |
| `event` | String(128) | Event type, indexed |
| `target_id` | String(128) | Affected resource UUID (nullable) |
| `detail` | Text | Free-form details (nullable) |
| `ip` | String(45) | Client IP (nullable) |
| `created_at` | DateTime(tz) | Server default: `now()` |

## Rules
- All tables have `created_at` (+ `updated_at` where applicable)
- snake_case naming throughout
- Foreign keys specify `ON DELETE` behavior
- Every schema change has a corresponding Alembic migration
- Indexes defined inline via SQLAlchemy `index=True` and explicit `op.create_index` in migrations

## Connection
- `DATABASE_URL` env var — `postgresql+asyncpg://user:pass@host/db`
- `MOTHERDUCK_TOKEN` env var for MotherDuck access

## Migrations

```bash
cd backend
alembic upgrade head          # apply all migrations
alembic current               # show current revision
alembic history               # list all revisions
alembic downgrade -1          # roll back one revision
```

| Revision | Description |
|---|---|
| `0001_initial` | users, admin_roles, admin_users, admin_login_attempts |
| `0002_step7_auth` | Extend users + add audit_logs |

## Reference
- [`docs/authentication.md`](./authentication.md)
- [`instructions/database.md`](../instructions/database.md)
- [`workflows/database-build.md`](../workflows/database-build.md)
- [`database/schemas/`](../database/schemas/)
