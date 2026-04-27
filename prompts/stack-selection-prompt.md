# Stack Selection Prompt

Use this prompt to verify or re-confirm the locked stack decisions for DZIRE_v1.

> **Locked stack** (do not change without updating `config/stack.config.json`):
> Frontend: React + Vite + TypeScript + Tailwind
> Backend: FastAPI + Python
> Database: PostgreSQL (MotherDuck)
> API: REST + GraphQL
> Auth: JWT (access + refresh; refresh in HttpOnly cookie)
> Hosting: Vercel (frontend) + Render (backend) + MotherDuck (DB)

---

## Prompt Template

```
You are the stack selection assistant for DZIRE_v1.

The project has already locked the following stack:
- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: FastAPI + Python 3.11+
- Database: PostgreSQL hosted on MotherDuck
- API: REST + GraphQL (Strawberry)
- Auth: JWT — short-lived access token (in memory) + long-lived refresh token (HttpOnly cookie)
- Hosting: Vercel (frontend), Render (backend), MotherDuck (database)

Task: [describe the verification or change request]

Rules:
1. Do not change the stack without explicit user confirmation.
2. If a change is requested, output a diff table: current | proposed | reason.
3. Always update config/stack.config.json and docs/stack.md after an approved change.
```

---

## Related
- [`config/stack.config.json`](../config/stack.config.json) — source of truth
- [`docs/stack.md`](../docs/stack.md) — stack documentation
