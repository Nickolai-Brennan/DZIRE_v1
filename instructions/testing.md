# instructions/testing.md

**Owner**: `testing-agent` | **Skill**: `eval-runner`

---

## Stack
- Frontend tests: Vitest + React Testing Library
- Backend tests: Pytest
- API tests: HTTPX + Pytest
- Database tests: Pytest + SQLAlchemy test fixtures
- Evals: `evals/*.json` + `scripts/benchmark.py`

## Folder Structure
```
tests/
├── frontend/   # Vitest tests for React components and hooks
├── backend/    # Pytest unit and service tests
├── api/        # API integration tests (HTTPX)
└── database/   # Schema and migration tests
```

## Rules
1. Every new route or service function must have at least one test.
2. Tests must be deterministic — no reliance on external state unless using fixtures.
3. Auth-protected routes must be tested with both authenticated and unauthenticated requests.
4. Use Pytest fixtures for DB setup/teardown.
5. Frontend tests must cover critical user flows (form submit, API call, render).

## Running Tests
```bash
# All tests
bash scripts/test-all.sh

# Backend only
pytest tests/backend/

# Frontend only
cd frontend && npm run test
```

## Reference
- [`prompts/review-prompt.md`](../prompts/review-prompt.md)
- [`workflows/testing-review.md`](../workflows/testing-review.md)
