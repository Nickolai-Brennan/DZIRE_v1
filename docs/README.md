# docs/README.md — DZIRE_v1 Documentation Index

Welcome to the DZIRE_v1 documentation. Use this index to navigate all project docs.

---

## Core Docs

| File | Description |
|------|-------------|
| [stack.md](./stack.md) | Locked stack decisions and domain ownership |
| [agent-outputs.md](./agent-outputs.md) | Agent output logs and results |
| [best_practices.md](./best_practices.md) | Project best practices |
| [dev-verification-checklist.md](./dev-verification-checklist.md) | Dev verification checklist |
| [prompt_library.md](./prompt_library.md) | Prompt library reference |
| [workflow-multi-agent.md](./workflow-multi-agent.md) | Multi-agent workflow patterns |

---

## Step 2 Artifacts

| Area | Location |
|------|----------|
| Stack config | [`config/stack.config.json`](../config/stack.config.json) |
| Agent config | [`config/agents.config.json`](../config/agents.config.json) |
| Environment vars | [`config/env.example`](../config/env.example) |
| Prompts | [`prompts/`](../prompts/) |
| Workflows | [`workflows/`](../workflows/) |
| Instructions | [`instructions/`](../instructions/) |
| Agents (runtime) | [`agents/`](../agents/) |
| Evals | [`evals/`](../evals/) |

---

## Stack Reference

See [stack.md](./stack.md) for the full locked stack. Summary:

- **Frontend**: React + Vite + TypeScript + Tailwind → Vercel
- **Backend**: FastAPI + Python → Render
- **Database**: PostgreSQL (MotherDuck)
- **API**: REST + GraphQL
- **Auth**: JWT (access + refresh in HttpOnly cookie)
