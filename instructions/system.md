# instructions/system.md

**Priority**: High — system-wide behavior and defaults.

---

## System-Level Rules

1. All agents operate within the boundaries defined in `instructions/root.md`.
2. Every agent must reference `config/stack.config.json` before making technology decisions.
3. Agents may only modify files in their assigned domain (see domain ownership map below).
4. Cross-domain changes require explicit user confirmation.

## Domain Ownership Map

| Domain | Folder | Owner Agent |
|--------|--------|-------------|
| Frontend | `frontend/` | `frontend-agent` |
| Backend | `backend/` | `backend-agent` |
| Database | `database/` | `database-agent` |
| API | `api/` | `api-agent` |
| Tests | `tests/` | `testing-agent` |
| Docs | `docs/` | `documentation-agent` |
| Scripts | `scripts/` | `deployment-agent` |
| Config | `config/` | `stack-verifier-agent` |

## Default Execution Order
Per `config/agents.config.json`:
project-startup → stack-verifier → system-architect → database → backend → api → frontend → testing → documentation → deployment → code-cleaner → workflow-builder

## Reference
- [`instructions/root.md`](./root.md)
- [`config/agents.config.json`](../config/agents.config.json)
