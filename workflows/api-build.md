# Workflow: API Build

**Owner**: `api-agent` | **Skill**: `api-designer`

---

## Purpose
Design and document REST endpoints and GraphQL schema for DZIRE_v1.

## Stack
- REST: FastAPI routes under `/api/v1/`
- GraphQL: Strawberry (`/graphql`)
- Contracts: Pydantic v2 schemas
- Docs: OpenAPI at `/docs`

## Steps

1. **Design a REST endpoint**
   - Document contract in `api/rest/resource.md`.
   - Define request/response schemas in `backend/app/schemas/`.
   - Implement route in `backend/app/routes/`.

2. **Add example request/response**
   - Create `api/examples/resource-examples.md` with `curl` and JSON samples.

3. **Design a GraphQL type (if applicable)**
   - Add Strawberry type in `api/graphql/types.py`.
   - Add query/mutation resolvers.
   - Register in `api/graphql/schema.py`.

4. **Verify API docs**
   - Start backend: `uvicorn app.main:app --reload`
   - Open `http://localhost:8000/docs` to confirm OpenAPI spec is correct.

5. **Run API tests**
   ```bash
   pytest tests/api/
   ```

## Outputs
- REST endpoint contracts
- GraphQL type definitions
- OpenAPI docs
- API test coverage
