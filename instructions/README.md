# instructions/

Root-level domain instruction files for DZIRE_v1.

## Instruction Priority (cascade)

```
root.md
  └── system.md
        └── project.md
              └── [domain].md  (frontend / backend / database / api / docs / testing / deployment)
                    └── agent instruction
                          └── skill instruction
                                └── user prompt
```

## Files

| File | Scope |
|------|-------|
| [root.md](./root.md) | Highest priority; repo-wide rules |
| [system.md](./system.md) | System-wide agent behavior |
| [user.md](./user.md) | How agents interact with the user |
| [project.md](./project.md) | Project identity and project-wide rules |
| [frontend.md](./frontend.md) | React + Vite + TS + Tailwind rules |
| [backend.md](./backend.md) | FastAPI + Python rules |
| [database.md](./database.md) | PostgreSQL + MotherDuck rules |
| [api.md](./api.md) | REST + GraphQL rules |
| [docs.md](./docs.md) | Documentation rules |
| [testing.md](./testing.md) | Testing and QA rules |
| [deployment.md](./deployment.md) | Deployment rules |

## Reference
- [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) — repo-level controller
- [`config/stack.config.json`](../config/stack.config.json) — locked stack
