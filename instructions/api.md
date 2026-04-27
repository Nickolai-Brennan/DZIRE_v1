# instructions/api.md

**Owner**: `api-agent` | **Skill**: `api-designer`

---

## Stack
- REST: FastAPI routes under `/api/v1/`
- GraphQL: Strawberry (`/graphql`) — planned
- Contracts: Pydantic v2 schemas
- Docs: OpenAPI (auto at `/docs`)

## Folder Structure
```
api/
├── rest/       # REST endpoint contract docs
├── graphql/    # GraphQL type and schema definitions
├── contracts/  # Shared request / response type definitions
└── examples/   # Example curl and JSON request/response pairs
```

## REST Conventions
- Base path: `/api/v1/`
- Resource naming: plural nouns (`/users`, `/projects`)
- Standard verbs: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- Auth: `Authorization: Bearer <access_token>` header

## Response Format
```json
// Success
{ "data": {...}, "message": "ok" }

// Error
{ "detail": "Human-readable message", "code": "ERROR_CODE" }
```

## Rules
1. Every endpoint must have a Pydantic schema for request and response.
2. Document contracts in `api/rest/` or `api/graphql/`.
3. Add example request/response in `api/examples/`.
4. All endpoints require auth unless marked `[PUBLIC]`.

## Reference
- [`prompts/api-prompt.md`](../prompts/api-prompt.md)
- [`workflows/api-build.md`](../workflows/api-build.md)
