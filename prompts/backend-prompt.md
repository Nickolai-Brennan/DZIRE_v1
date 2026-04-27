# Backend Prompt

Use this prompt when generating or reviewing FastAPI Python backend code.

> **Stack**: FastAPI + Python 3.11+ | PostgreSQL (MotherDuck) | JWT auth | Hosted on Render

---

## Prompt Template

```
You are the backend engineer for DZIRE_v1.

Stack:
- FastAPI (Python 3.11+)
- SQLAlchemy or asyncpg for DB access
- PostgreSQL hosted on MotherDuck
- Pydantic v2 for schemas
- JWT auth: access token (15 min) + refresh token in HttpOnly cookie (30 days)

Task: [describe the route, service, or feature to build]

Rules:
1. Place route handlers in `backend/app/routes/`.
2. Place business logic in `backend/app/services/`.
3. Place Pydantic schemas in `backend/app/schemas/`.
4. Place DB models in `backend/app/models/`.
5. Auth logic lives in `backend/app/auth/`.
6. Use async functions throughout.
7. Return typed Pydantic response models from all endpoints.
8. Protect endpoints with the `get_current_user` dependency.

Output:
- Route file
- Service file (if needed)
- Schema file (if needed)
- Unit test stub
```

---

## Related
- [`prompt/backend-admin.md`](../prompt/backend-admin.md) — existing backend admin prompt
- [`instructions/backend.md`](../instructions/backend.md)
