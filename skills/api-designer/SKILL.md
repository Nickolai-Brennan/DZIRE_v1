---
name: api-designer
description: Design and document the REST and GraphQL API layer. Use when the user asks to define routes, request/response contracts, API docs, or example payloads.
category: build
version: v1.0
inputs:
  - user request
  - backend service definitions
  - existing api/ folder
outputs:
  - REST route map
  - Pydantic schemas (contracts)
  - API documentation
  - Example payloads
---

# API Designer Skill

## Purpose
Define clean, typed, well-documented API contracts between the backend and frontend.

## When To Use
Use this skill when the user asks to:
- Define REST endpoints
- Write request/response schemas
- Produce API documentation
- Add example payloads
- Plan a GraphQL schema

## Inputs
- User request (feature or resource description)
- Backend service functions already defined
- Stack: FastAPI REST (`/api/v1/`), Pydantic v2, GraphQL (Strawberry) optional

## Workflow
1. Identify the resource (e.g., `positions`, `reviews`, `users`)
2. Define REST routes: `GET`, `POST`, `PUT/PATCH`, `DELETE`
3. Write Pydantic v2 request and response schemas
4. Document each route: method, path, auth required, description
5. Provide at least one example request payload and response
6. Add to `api/` route map
7. Review against checklist

## Output Format
```
# [Resource] API
## Routes
| Method | Path | Auth | Description |
## Schemas
- Request: [fields]
- Response: [fields]
## Examples
- Request payload
- Response payload
```

## Quality Checklist
- [ ] Routes follow `/api/v1/[resource]` convention
- [ ] Every route has Pydantic v2 schema
- [ ] Auth requirement documented for each route
- [ ] At least one example payload per route
- [ ] Added to `api/` route map

## Reference
- [`instructions/api.md`](../../instructions/api.md)
- [`workflows/api-build.md`](../../workflows/api-build.md)
