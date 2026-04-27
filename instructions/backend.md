# instructions/backend.md

**Owner**: `backend-agent` | **Skill**: `backend-builder`

---

## Stack
- FastAPI (Python 3.11+)
- SQLAlchemy (async ORM) or asyncpg
- Pydantic v2 (schemas)
- python-jose / authlib (JWT)
- Alembic (migrations)
- PostgreSQL on MotherDuck

## Folder Structure
```
backend/app/
├── routes/    # APIRouter route handlers (thin — delegate to services)
├── services/  # Business logic
├── models/    # SQLAlchemy ORM models
├── schemas/   # Pydantic request / response models
├── auth/      # JWT creation, validation, refresh logic
├── core/      # App config, DB session, middleware
└── main.py    # FastAPI app factory and router registration
```

## Rules
1. Routes must be thin — logic goes in `services/`.
2. All API inputs/outputs use Pydantic v2 schemas.
3. Use `async def` for all route and service functions.
4. Protect endpoints with `Depends(get_current_user)` unless explicitly public.
5. Return consistent error shapes: `{"detail": "...", "code": "..."}`.
6. Never hard-code secrets — use `config/env.example` vars loaded via `python-dotenv`.

## Reference
- [`prompts/backend-prompt.md`](../prompts/backend-prompt.md)
- [`workflows/backend-build.md`](../workflows/backend-build.md)
