# Workflow: Backend Build

**Owner**: `backend-agent` | **Skill**: `backend-builder`

---

## Purpose
Build and extend the FastAPI Python backend.

## Stack
- FastAPI + Python 3.11+
- SQLAlchemy / asyncpg
- Pydantic v2
- JWT auth (python-jose / authlib)
- PostgreSQL on MotherDuck

## Steps

1. **Start dev server**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. **Add a new route**
   - Create `backend/app/routes/resource.py`.
   - Define FastAPI `APIRouter` with prefix `/api/v1/resource`.
   - Register router in `backend/app/main.py`.

3. **Add a service**
   - Create `backend/app/services/resource_service.py`.
   - Place all business logic here; keep routes thin.

4. **Add a Pydantic schema**
   - Create `backend/app/schemas/resource.py`.
   - Define `ResourceCreate`, `ResourceRead`, `ResourceUpdate` models.

5. **Protect an endpoint**
   - Add `current_user: User = Depends(get_current_user)` to route signature.

6. **Run backend tests**
   ```bash
   pytest tests/backend/
   ```

## Outputs
- Working FastAPI routes
- Pydantic schemas for all endpoints
- Passing backend tests
