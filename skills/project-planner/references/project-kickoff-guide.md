# Project Kickoff Guide

Reference for the `project-planner` skill. Covers the full project kickoff process from initial idea to a handoff-ready plan.

## Kickoff Checklist

Before generating a project plan, confirm:
- [ ] Project name agreed
- [ ] Project type identified (SaaS / platform / API / dashboard / landing page)
- [ ] Primary user identified
- [ ] Core problem/goal stated in one sentence
- [ ] Stack confirmed (or preference noted)
- [ ] MVP scope defined (what's IN and what's OUT)

## Agent Map

Every DZIRE_v1 project uses a standard agent set. Reference `config/agents.config.json` for the full list. Common agents:

| Agent | When used |
|-------|---------|
| `project-startup-agent` | Initial planning and scope |
| `stack-verifier` | Environment verification |
| `database-agent` | Schema and migration work |
| `backend-agent` | FastAPI routes and services |
| `api-agent` | REST contracts and documentation |
| `frontend-agent` | React components and pages |
| `testing-agent` | Test suites and evals |
| `deployment-agent` | Docker, Vercel, Render, CI/CD |
| `documentation-agent` | Docs, README, changelog |

## Build Phase Order (Step 3 Execution)

All DZIRE_v1 projects follow this build sequence:

```
Phase 1: Foundation
  1. Stack confirmation
  2. Repo structure
  3. Environment setup
  4. Database schema

Phase 2: Core Build
  5. Backend services + routes
  6. API contracts
  7. Frontend pages + components
  8. Auth integration

Phase 3: Quality
  9. Test suite
  10. Deployment
  11. Documentation
```

## T-Format Task Naming

Tasks use zero-padded three-digit IDs:

```
T-001: Task description (Phase 1)
T-002: Task description (Phase 1)
...
T-010: Task description (Phase 3)
```

Rules:
- One task = one deliverable (one file, one feature, one config)
- Maximum 1–2 hours of work per task
- Include phase number in parentheses
- Sort by dependency order, not alphabetically

## Scope Creep Warning Signs

A plan may need to be scaled back if:
- More than 5 core features listed for MVP
- Any single feature requires 3+ backend services
- "Nice to have" features appear before Phase 2
- No clear definition of what's NOT in scope

## Handing Off to Build Pipeline

After the project plan is complete:
1. Save as `docs/project-overview.md`
2. Populate `task-list.txt` with T-001 through T-010 (minimum)
3. Run [`stack-verifier`](../../stack-verifier/SKILL.md) to confirm environment
4. Proceed to [`workflows/project-startup.md`](../../../workflows/project-startup.md)
