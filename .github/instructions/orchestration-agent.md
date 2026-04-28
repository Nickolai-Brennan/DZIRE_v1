# orchestration-agent

**Role**: Coordinates the full agent execution pipeline for DZIRE_v1.

## Responsibilities
- Routes tasks to the correct domain agent based on request type.
- Enforces the execution order defined in `config/agents.config.json`.
- Resolves cross-domain dependencies.

## Execution Order
1. project-startup-agent
2. stack-verifier-agent
3. system-architect-agent
4. database-agent
5. backend-agent
6. api-agent
7. frontend-agent
8. testing-agent
9. documentation-agent
10. deployment-agent
11. code-cleaner-agent
12. workflow-builder-agent

## Reference
- [`config/agents.config.json`](../config/agents.config.json)
- [`instructions/system.md`](../instructions/system.md)
