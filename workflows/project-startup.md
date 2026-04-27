# Workflow: Project Startup

**Owner**: `project-startup-agent` | **Skill**: `project-planner`

---

## Purpose
Convert a project idea into an actionable build plan with a confirmed stack, repo structure, and first task list.

## Steps

1. **Capture project intake**
   - Run the [`project-summary-prompt`](../prompts/project-summary-prompt.md).
   - Fill in project name, type, target users, and core features.

2. **Confirm stack**
   - Review `config/stack.config.json`.
   - If stack is unchanged → proceed.
   - If changes needed → run [`stack-selection-prompt`](../prompts/stack-selection-prompt.md) and update config.

3. **Verify repo structure**
   - Confirm all Step 2 folders exist: `frontend/`, `backend/`, `database/`, `api/`, `tests/`, `scripts/`, `config/`, `instructions/`, `prompts/`, `evals/`.

4. **Create initial task list**
   - Open `task-list.txt` at repo root.
   - Add Phase 1 tasks in priority order.

5. **Hand off to Stack Verifier**
   - Run `scripts/verify-stack.sh` (when available).
   - Proceed to [`stack-identification.md`](./stack-identification.md).

## Outputs
- Confirmed stack
- Populated task list
- Ready repo structure
