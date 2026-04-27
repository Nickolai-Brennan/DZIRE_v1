# database/

PostgreSQL database layer for DZIRE_v1, hosted on MotherDuck.

## Structure

```
database/
├── schemas/      # Table definitions (SQL / DDL)
├── migrations/   # Schema version migrations
├── seeds/        # Starter / test data
├── indexes/      # Index definitions
└── README.md
```

## Stack
- **Engine**: PostgreSQL
- **Hosting**: MotherDuck
- **Migrations**: Alembic (planned)

## Owner
`database-agent` → `database-designer` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
