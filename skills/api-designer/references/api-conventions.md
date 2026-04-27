# API Design Conventions

Reference for the `api-designer` skill. Covers REST routing conventions, naming rules, auth patterns, and response standards used across DZIRE_v1.

## Route Naming

- Base path: `/api/v1/[resource]`
- Resources are **plural nouns**: `/api/v1/users`, `/api/v1/positions`
- Nested resources: `/api/v1/users/{user_id}/reviews`
- Use kebab-case for multi-word resources: `/api/v1/job-postings`

## HTTP Methods

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/[resource]` | List all (with optional query filters) |
| `GET` | `/api/v1/[resource]/{id}` | Get single by ID |
| `POST` | `/api/v1/[resource]` | Create new |
| `PUT` | `/api/v1/[resource]/{id}` | Full update |
| `PATCH` | `/api/v1/[resource]/{id}` | Partial update |
| `DELETE` | `/api/v1/[resource]/{id}` | Delete |

## Request/Response Shapes

### Success responses
```json
{
  "data": { ... },
  "meta": { "page": 1, "total": 42 }
}
```

### Error responses
```json
{
  "error": "not_found",
  "message": "User with id 123 was not found.",
  "status": 404
}
```

## Auth

- Protected endpoints use `Authorization: Bearer <token>` header
- Public endpoints are explicitly documented as `auth: none`
- JWT tokens issued by `/api/v1/auth/token`

## Pagination

Use query parameters for list endpoints:
- `?page=1&page_size=20` (default page_size: 20, max: 100)
- Response includes `meta.page`, `meta.page_size`, `meta.total`

## Versioning

All routes are versioned under `/api/v1/`. When breaking changes occur, increment to `/api/v2/` and maintain v1 until deprecated.

## Status Codes

| Code | Use case |
|------|----------|
| 200 | Successful GET, PUT, PATCH |
| 201 | Successful POST (created) |
| 204 | Successful DELETE (no content) |
| 400 | Validation error |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (valid token, insufficient permission) |
| 404 | Resource not found |
| 422 | Unprocessable entity (Pydantic validation) |
| 500 | Unexpected server error |

## Pydantic Schema Naming

- Request schemas: `[Resource]Create`, `[Resource]Update`
- Response schemas: `[Resource]Response`, `[Resource]List`
- Base schemas (shared fields): `[Resource]Base`
