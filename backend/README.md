# backend/

FastAPI + Python backend for DZIRE_v1.

## Structure

```
backend/
├── app/
│   ├── routes/      # API route handlers
│   ├── services/    # Business logic
│   ├── models/      # SQLAlchemy / Pydantic models
│   ├── schemas/     # Request / response schemas
│   ├── auth/        # JWT auth logic
│   ├── core/        # Config, DB connection, middleware
│   └── main.py      # FastAPI entry point
└── README.md
```

## Stack
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Auth**: JWT (access + refresh in HttpOnly cookie)
- **Database**: PostgreSQL via MotherDuck
- **Hosting**: Render

## Owner
`backend-agent` → `backend-builder` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
