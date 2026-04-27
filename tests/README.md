# tests/

Test suite for DZIRE_v1 (frontend, backend, API, database).

## Structure

```
tests/
├── frontend/    # Vitest / React Testing Library tests
├── backend/     # Pytest unit and integration tests
├── api/         # API contract and integration tests
├── database/    # Schema and migration tests
└── README.md
```

## Stack
- **Frontend tests**: Vitest + React Testing Library
- **Backend tests**: Pytest
- **API tests**: HTTPX / Pytest

## Owner
`testing-agent` → `eval-runner` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
