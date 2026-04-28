# instructions/root.md

**Priority**: Highest — all other instructions inherit from this.

---

## Repo-Level Controller
The authoritative repo-level Copilot instruction file is:
`.github/copilot-instructions.md`

All agent behavior, domain rules, and stack decisions ultimately trace back to that file and to `config/stack.config.json`.

## Core Rules
1. **Stack is locked.** Do not change any stack choice without explicit user confirmation and an update to `config/stack.config.json`.
2. **Do not remove existing files.** Changes are additive unless the user explicitly requests removal.
3. **Follow domain ownership.** Each folder is owned by its designated agent (see `config/agents.config.json`).
4. **Instructions cascade**: root → system → project → domain → agent → skill → user prompt.
5. **Config is the source of truth.** If a question arises about a stack decision, consult `config/stack.config.json` first.

## Stack (locked)
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: FastAPI + Python
- Database: PostgreSQL (MotherDuck)
- API: REST + GraphQL
- Auth: JWT (access + refresh in HttpOnly cookie)
- Hosting: Vercel + Render + MotherDuck

## Reference
- [`config/stack.config.json`](../config/stack.config.json)
- [`.github/copilot-instructions.md`](../.github/copilot-instructions.md)
