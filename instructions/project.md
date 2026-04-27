# instructions/project.md

**Priority**: Project-level — defines what DZIRE_v1 is and enforces project-wide rules.

---

## Project Identity

| Field | Value |
|-------|-------|
| Name | DZIRE_v1 |
| Type | Full-stack web application |
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Backend | FastAPI + Python 3.11+ |
| Database | PostgreSQL (MotherDuck) |
| API | REST + GraphQL |
| Auth | JWT (access + refresh in HttpOnly cookie) |
| Hosting | Vercel (frontend), Render (backend), MotherDuck (DB) |

## Project-Wide Rules

1. All new features must follow the layered folder structure defined in `phases/step-2.md`.
2. Stack choices are locked in `config/stack.config.json`. Do not introduce new framework dependencies without updating that file.
3. JWT auth is the only auth method. Do not implement session-based or OAuth-only flows without user approval.
4. Every new API endpoint must have a Pydantic schema, a route, and a test.
5. Every new frontend page must have a route, a TypeScript interface for its data, and a service function.

## Source of Truth Files
- Stack: [`config/stack.config.json`](../config/stack.config.json)
- Docs: [`docs/stack.md`](../docs/stack.md)
- Repo controller: [`.github/copilot-instructions.md`](../.github/copilot-instructions.md)
