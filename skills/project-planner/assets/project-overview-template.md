# Project Overview: [Project Name]

> Template for project-planner output. Replace all `[...]` placeholders.

---

## Summary

**Name**: [Project Name]  
**Type**: [SaaS app / Content platform / API / Dashboard]  
**Description**: [2-3 sentences: what it is, who it's for, what problem it solves]  
**Status**: Planning  
**Created**: [YYYY-MM-DD]

---

## Target Users

**Primary**: [User type, e.g., "Marketing managers at SaaS startups"]  
**Secondary** (optional): [Second user type if applicable]

**Core need**: [The main problem or job-to-be-done]

---

## Core Features (MVP)

1. **[Feature 1]** — [One sentence description]
2. **[Feature 2]** — [One sentence description]
3. **[Feature 3]** — [One sentence description]

**Not in MVP**:
- [Out of scope item 1]
- [Out of scope item 2]

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind |
| Backend | FastAPI + Python 3.11 |
| Database | PostgreSQL (MotherDuck) |
| Auth | JWT |
| API | REST (`/api/v1/`) |
| Deploy | Vercel + Render |

Stack confirmed in `config/stack.config.json`.

---

## Agent Map

| Agent | Responsibility |
|-------|---------------|
| `project-startup-agent` | Planning and scope (this step) |
| `database-agent` | Schema design and migrations |
| `backend-agent` | FastAPI routes and services |
| `api-agent` | REST contracts |
| `frontend-agent` | React UI |
| `testing-agent` | Tests and evals |
| `deployment-agent` | Deployment and CI/CD |

---

## Build Phases

### Phase 1 — Foundation
- [ ] T-001: Stack setup and repo verification
- [ ] T-002: Database schema design
- [ ] T-003: Auth backend (register, login, JWT)
- [ ] T-004: Auth frontend (login page, auth context)

### Phase 2 — Core Build
- [ ] T-005: [Feature 1] backend
- [ ] T-006: [Feature 1] frontend
- [ ] T-007: [Feature 2] backend
- [ ] T-008: [Feature 2] frontend

### Phase 3 — Quality & Launch
- [ ] T-009: Full test suite
- [ ] T-010: Deployment + documentation

---

## First Tasks

See `task-list.txt` for the working task list.
