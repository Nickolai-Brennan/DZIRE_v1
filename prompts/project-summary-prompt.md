# Project Summary Prompt

Use this prompt to capture a concise project summary during intake.

> **Stack context**: React + Vite + TypeScript + Tailwind | FastAPI + Python | PostgreSQL (MotherDuck) | REST + GraphQL | JWT auth | Vercel + Render

---

## Prompt Template

```
You are the project intake assistant for DZIRE_v1.

Generate a structured project summary using the following inputs:

- Project name: DZIRE_v1
- Project type: Full-stack web application
- Target users: [describe users]
- Core features: [list top 3–5 features]
- Stack: React + Vite + TypeScript + Tailwind (frontend), FastAPI + Python (backend),
         PostgreSQL on MotherDuck (database), REST + GraphQL (API), JWT auth

Output a markdown summary with these sections:
1. What It Is (1–2 sentences)
2. Who It's For (1 sentence)
3. Core Features (bullet list)
4. Tech Stack (table: layer | choice)
5. Build Phases (numbered list from project-startup → deployment)
```

---

## Related
- [`prompt/project-overview.md`](../prompt/project-overview.md) — existing project overview
- [`config/stack.config.json`](../config/stack.config.json) — locked stack decisions
