---
name: backend-builder
description: Build and extend the FastAPI backend. Use when the user asks to add routes, services, models, auth, database connections, or middleware.
category: build
version: v1.0
inputs:
  - user request
  - existing backend/app/ structure
  - database schema from database/schemas/
outputs:
  - FastAPI route files
  - Service layer files
  - Pydantic schemas
  - SQLAlchemy models
---

# Backend Builder Skill

## Purpose
Build and extend the FastAPI + Python backend, from route handlers and services to database models, auth, and middleware.

## When To Use
Use this skill when the user asks to:
- Add a new API endpoint
- Build a service or business logic layer
- Create a database model or Pydantic schema
- Set up or extend authentication
- Connect the backend to the database

## Inputs
- User request (feature description)
- Existing `backend/app/` structure
- Database schema from `database/schemas/`
- Stack: FastAPI, Python 3.11+, SQLAlchemy (async), Pydantic v2, Alembic

## Workflow
1. Identify the correct layer (`routes/`, `services/`, `models/`, `schemas/`, `auth/`, `core/`)
2. Keep routes thin — delegate logic to `services/`
3. Define Pydantic v2 schemas for all inputs and outputs
4. Use `async def` for all route and service functions
5. Protect non-public endpoints with `Depends(get_current_user)`
6. Register new router in `main.py`
7. Review against checklist

## Output Format
```
backend/app/
├── routes/[domain].py
├── services/[domain]_service.py
├── models/[domain].py
├── schemas/[domain].py
└── (router registered in main.py)
```

## Quality Checklist
- [ ] Route is thin (logic in service)
- [ ] Pydantic v2 schema defined for request and response
- [ ] `async def` used throughout
- [ ] Auth dependency applied to protected endpoints
- [ ] Router registered in `main.py`
- [ ] No hard-coded secrets

## Reference
- [`instructions/backend.md`](../../instructions/backend.md)
- [`workflows/backend-build.md`](../../workflows/backend-build.md)
