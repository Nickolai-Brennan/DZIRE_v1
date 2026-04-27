# docs/stack.md — DZIRE_v1 Stack Reference

> **Source of truth**: [`config/stack.config.json`](../config/stack.config.json)
> This document is the human-readable version of the locked stack decisions.

---

## Stack Overview

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS | Strict TypeScript; Tailwind utility-first |
| Backend | FastAPI + Python 3.11+ | Async; Pydantic v2 schemas |
| Database | PostgreSQL (MotherDuck) | Managed Postgres; Alembic migrations |
| API | REST + GraphQL | REST primary (`/api/v1/`); GraphQL (Strawberry) planned |
| Auth | JWT (access + refresh) | Access token in memory; refresh token in HttpOnly cookie |
| Hosting — Frontend | Vercel | Auto-deploy from `main` branch |
| Hosting — Backend | Render | Python/Docker service |
| Hosting — Database | MotherDuck | Managed cloud PostgreSQL |
| Docs | Markdown | Stored in `docs/` |

---

## Auth Detail

- **Access token**: short-lived (15 min), stored in memory (not localStorage).
- **Refresh token**: long-lived (30 days), stored in a `Secure; HttpOnly; SameSite=Strict` cookie.
- **Endpoints**: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /me`.

---

## Environment Variables

See [`config/env.example`](../config/env.example) for the full list of required environment variables.

---

## Changing the Stack

1. Get explicit user confirmation.
2. Update [`config/stack.config.json`](../config/stack.config.json).
3. Update this file (`docs/stack.md`).
4. Update the relevant instruction file in [`instructions/`](../instructions/).
5. Update [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) if needed.

---

## Domain Ownership

| Domain | Folder | Agent |
|--------|--------|-------|
| UI | `frontend/` | `frontend-agent` |
| Server | `backend/` | `backend-agent` |
| Data | `database/` | `database-agent` |
| Contracts | `api/` | `api-agent` |
| Quality | `tests/` | `testing-agent` |
| Docs | `docs/` | `documentation-agent` |
| Automation | `scripts/` | `deployment-agent` |
| Config | `config/` | `stack-verifier-agent` |
