# Workflow: Full-Stack Integration

**Owner**: `system-architect-agent` | **Skills**: `frontend-builder` + `backend-builder` + `api-designer`

---

## Purpose
Connect the frontend, backend, API, and database into a working full-stack flow.

## Steps

1. **Start all services**
   ```bash
   # Terminal 1 — backend
   cd backend && uvicorn app.main:app --reload

   # Terminal 2 — frontend
   cd frontend && npm run dev
   ```

2. **Verify API reachability from frontend**
   - Set `VITE_API_BASE_URL=http://localhost:8000/api/v1` in `frontend/.env`.
   - Confirm a health-check endpoint (`GET /api/v1/health`) returns `200 OK`.

3. **Wire a feature end-to-end**
   - Backend: route → service → DB query → Pydantic response.
   - Frontend: service function → API call → state update → UI render.

4. **Test auth flow end-to-end**
   - `POST /auth/login` → returns access token + sets refresh cookie.
   - Subsequent requests include `Authorization: Bearer <access_token>`.
   - `POST /auth/refresh` → rotates refresh cookie, returns new access token.

5. **Verify CORS**
   - Confirm frontend origin is listed in `config/settings.json` > `cors_origins`.

6. **Run integration tests**
   ```bash
   pytest tests/api/
   npm run test
   ```

## Outputs
- Working end-to-end feature
- Auth flow confirmed
- Integration tests passing
