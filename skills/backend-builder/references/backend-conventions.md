# Backend Development Conventions

Reference for the `backend-builder` skill. Covers FastAPI project structure, service patterns, auth, error handling, and async conventions used across DZIRE_v1.

## Project Structure

```
backend/app/
├── main.py              # FastAPI app, router registration, middleware
├── core/
│   ├── config.py        # Settings (pydantic-settings)
│   ├── database.py      # Async SQLAlchemy engine + session
│   └── security.py      # JWT creation + verification
├── auth/
│   ├── router.py        # /auth/token, /auth/refresh
│   └── dependencies.py  # get_current_user dependency
├── routes/              # Thin router files, one per domain
├── services/            # Business logic, one file per domain
├── models/              # SQLAlchemy ORM models
└── schemas/             # Pydantic v2 request/response schemas
```

## Route Conventions

- Routes must be **thin**: only parameter extraction, dependency injection, and a single service call
- Delegate ALL business logic to a service function
- Always use `async def` for route handlers

```python
@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserResponse:
    return await user_service.create(db, payload)
```

## Service Conventions

- One file per domain: `services/user_service.py`
- All service functions are `async def`
- Services receive `db: AsyncSession` as first arg
- Raise `HTTPException` for business logic errors

```python
async def create(db: AsyncSession, payload: UserCreate) -> UserResponse:
    existing = await db.execute(select(User).where(User.email == payload.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(**payload.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return UserResponse.model_validate(user)
```

## Model Conventions

- All models extend `Base` (from `core/database.py`)
- Required columns: `id` (UUID, primary key), `created_at`, `updated_at`
- Use `mapped_column` and `Mapped` (SQLAlchemy 2.x style)

```python
class User(Base):
    __tablename__ = "users"
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(onupdate=func.now(), server_default=func.now())
```

## Auth

- Use `Depends(get_current_user)` on all protected routes
- JWT tokens: access (15 min) + refresh (7 days)
- Never store raw passwords — use `passlib` bcrypt

## Error Handling

- Raise `HTTPException` with descriptive `detail` strings
- Use HTTP status codes correctly (see [api-conventions.md](../../api-designer/references/api-conventions.md))
- Add global exception handler in `main.py` for unexpected errors

## Environment / Config

- All config via `core/config.py` using `pydantic-settings`
- Never hard-code secrets — use `.env` file + `config/env.example`
- Access config via `from app.core.config import settings`
