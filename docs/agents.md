# Agents Docs — DZIRE_v1

## Overview
DZIRE_v1 uses a layered agent system: one repo-level Copilot agent, multiple sub-agents in `.github/agents/`, and runtime coordination agents in `agents/`.

## Agent Execution Order

```
project-startup-agent
→ stack-verifier-agent
→ system-architect-agent
→ database-agent
→ backend-agent
→ api-agent
→ frontend-agent
→ testing-agent
→ documentation-agent
→ deployment-agent
→ code-cleaner-agent
→ workflow-builder-agent
```

## Repo-Level Agent
`.github/copilot-instructions.md` — acts as the repo-level development agent for all Copilot interactions.

## Sub-Agents (`.github/agents/`)

| Agent | Responsibility |
|---|---|
| `project-startup-agent` | Captures project idea, produces startup plan |
| `stack-verifier-agent` | Verifies environment and stack |
| `frontend-agent` | Builds and extends the React frontend |
| `backend-agent` | Builds FastAPI routes, services, auth |
| `database-agent` | Designs schema, migrations, seeds |
| `api-agent` | Defines API contracts and route map |
| `documentation-agent` | Writes and maintains docs |
| `testing-agent` | Writes tests and evals |
| `deployment-agent` | Prepares deployment pipeline |
| `code-cleaner-agent` | Refactors and cleans codebase |
| `workflow-builder-agent` | Creates and updates workflow files |

## Runtime Agents (`agents/`)

| Agent | Responsibility |
|---|---|
| `orchestration-agent` | Routes tasks, enforces execution order |
| `system-architect-agent` | Architecture overview and layer map |
| `product-manager-agent` | Feature decisions and product context |
| `qa-review-agent` | Reviews outputs for quality |

## Reference
- [`config/agents.config.json`](../config/agents.config.json)
- [`instructions/system.md`](../instructions/system.md)
