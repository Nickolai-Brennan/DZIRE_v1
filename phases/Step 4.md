# STEP 4 — STARTER FILE GENERATION BLUEPRINT

Step 4 creates the first usable repo files from the structure and execution system.

This step defines:
- Required starter files
- File templates
- Generation order
- Placeholder app folders
- Config starters
- Script starters
- Documentation starters

---

## STEP 4 OBJECTIVE

Turn the planned system into actual files.



```text
Structure
→ Stack Integration
→ Execution Flow
→ Starter Files
```
### FILE GENERATION ORDER
```
1. instructions/
2. .github/copilot-instructions.md
3. .github/agents/
4. agents/
5. skills/
6. workflows/
7. prompts/
8. templates/
9. evals/
10. config/
11. scripts/
12. docs/
13. frontend/
14. backend/
15. database/
16. api/
17. tests/
```
### REQUIRED STARTER FILES
```
instructions/root.md
instructions/system.md
instructions/user.md
instructions/project.md
instructions/frontend.md
instructions/backend.md
instructions/database.md
instructions/api.md
instructions/docs.md
instructions/testing.md
instructions/deployment.md

.github/copilot-instructions.md

.github/agents/project-startup-agent.md
.github/agents/stack-verifier-agent.md
.github/agents/frontend-agent.md
.github/agents/backend-agent.md
.github/agents/database-agent.md
.github/agents/api-agent.md
.github/agents/documentation-agent.md
.github/agents/testing-agent.md
.github/agents/deployment-agent.md
.github/agents/code-cleaner-agent.md
.github/agents/workflow-builder-agent.md

agents/orchestration-agent.md
agents/system-architect-agent.md
agents/product-manager-agent.md
agents/qa-review-agent.md

skills/project-planner/SKILL.md
skills/stack-verifier/SKILL.md
skills/frontend-builder/SKILL.md
skills/backend-builder/SKILL.md
skills/database-designer/SKILL.md
skills/api-designer/SKILL.md
skills/documentation-generator/SKILL.md
skills/eval-runner/SKILL.md
skills/deployment-planner/SKILL.md

workflows/project-startup.md
workflows/stack-identification.md
workflows/frontend-build.md
workflows/backend-build.md
workflows/database-build.md
workflows/api-build.md
workflows/fullstack-integration.md
workflows/testing-review.md
workflows/deployment.md

prompts/project-summary-prompt.md
prompts/stack-selection-prompt.md
prompts/frontend-prompt.md
prompts/backend-prompt.md
prompts/database-prompt.md
prompts/api-prompt.md
prompts/docs-prompt.md
prompts/review-prompt.md

evals/evals.json
evals/frontend-evals.json
evals/backend-evals.json
evals/database-evals.json
evals/api-evals.json

config/env.example
config/settings.json
config/integrations.json
config/stack.config.json
config/agents.config.json

scripts/setup.sh
scripts/verify-stack.sh
scripts/run-dev.sh
scripts/test-all.sh
scripts/seed-database.py
scripts/generate-docs.py
scripts/benchmark.py

docs/README.md
docs/project-overview.md
docs/architecture.md
docs/stack.md
docs/frontend.md
docs/backend.md
docs/database.md
docs/api.md
docs/agents.md
docs/skills.md
docs/workflows.md
docs/setup.md
docs/changelog.md

frontend/README.md
backend/README.md
database/README.md
api/README.md
tests/README.md
```
### INSTRUCTION FILE TEMPLATE
- Use for every file inside:

```
instructions/
```
# [Instruction Name]

## Purpose
Define how the AI should operate for this domain.

## Applies To
- Related agents
- Related skills
- Related workflows

## Rules
- Keep outputs structured
- Follow the approved project stack
- Respect folder ownership
- Produce copy-ready results
- Preserve naming consistency

## Output Standard
- Clear sections
- Tight bullets
- File paths when relevant
- No filler

## Review Checklist
- [ ] Matches project goal
- [ ] Uses correct stack
- [ ] Uses correct folder
- [ ] Includes next step


### REPO COPILOT INSTRUCTIONS TEMPLATE
- File:

```
.github/copilot-instructions.md
```

# Repo-Level Copilot Instructions

## Project Role
Act as the repo-level development agent for this project.

## Core Responsibilities
- Follow the approved stack
- Maintain folder structure
- Generate clean code
- Keep files modular
- Update docs when behavior changes
- Suggest tests for meaningful changes
- Route work to the correct domain agent

## Stack
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: FastAPI + Python
- Database: PostgreSQL
- API: REST first, GraphQL optional
- Docs: Markdown

## Architecture Rules
- Keep frontend, backend, database, and API separated
- Avoid duplicated logic
- Use service layers for backend logic
- Use typed contracts for API boundaries
- Keep migrations organized
- Keep shared config centralized

## Agent Routing
- Frontend work → frontend-agent
- Backend work → backend-agent
- Database work → database-agent
- API work → api-agent
- Docs work → documentation-agent
- Testing work → testing-agent
- Deployment work → deployment-agent
- Cleanup/refactor work → code-cleaner-agent

## Output Rules
- Prefer complete files over fragments
- Explain assumptions briefly
- Include file paths
- Keep code readable
- Add comments only where useful

## Review Checklist
- [ ] Correct folder
- [ ] Correct stack
- [ ] No broken imports
- [ ] Docs updated if needed
- [ ] Tests suggested or added

### SUB-AGENT TEMPLATE
- Use for files inside:

```
.github/agents/
```

---
## RUNTIME AGENT TEMPLATE
---

## [x] name: Runtime Agent Name
## [x] description: - [Runtime/system agent role.]

```
```
# [Runtime Agent Name]

## Role
Coordinate higher-level project behavior.

## Responsibilities
- Connect agents
- Track dependencies
- Identify missing pieces
- Maintain system flow

## Inputs
- Project goal
- Agent outputs
- Task state
- Build phase

## Workflow
1. Identify current phase
2. Select correct agent
3. Pass required context
4. Validate output
5. Update next action

## Outputs
- Agent route
- Phase summary
- Dependency notes
- Next task
### RUNTIME AGENT TEMPLATE
- Use for files inside:

```
agents/
```

---
name: [runtime-agent-name]
description: [Runtime/system agent role.]
---

# [Runtime Agent Name]

## Role
Coordinate higher-level project behavior.

## Responsibilities
- Connect agents
- Track dependencies
- Identify missing pieces
- Maintain system flow

## Inputs
- Project goal
- Agent outputs
- Task state
- Build phase

## Workflow
1. Identify current phase
2. Select correct agent
3. Pass required context
4. Validate output
5. Update next action

## Outputs
- Agent route
- Phase summary
- Dependency notes
- Next task

### SKILL TEMPLATE
- Use for:
```
skills/[skill-name]/SKILL.md
```
---
name: [skill-name]
description: [Trigger-focused description. Use when the user asks for related tasks, even if they do not use the exact skill name.]
---

# [Skill Name]

## Purpose
Explain what reusable ability this skill gives the agent.

## When To Use
Use this skill when the user asks to:
- Build related output
- Improve related output
- Convert vague input into structured output

## Inputs
- User request
- Project context
- Relevant files
- Output target

## Workflow
1. Capture intent
2. Identify constraints
3. Select output format
4. Generate result
5. Review against checklist

## Output Format

# Title
## Overview
## Structure
## Workflow
## Output
## Checklist

### Quality Checklist
[ ] Trigger description is clear
[ ] Workflow is reusable
[ ] Output format is defined
[ ] Result is copy-ready

```
---

# WORKFLOW TEMPLATE

Use for:
workflows/
```

# [Workflow Name]

## Purpose
Define a repeatable process.

## Trigger
Use this workflow when:

## Inputs
- Project goal
- Current files
- Stack
- Constraints

## Steps
1. Intake
2. Plan
3. Build
4. Verify
5. Document

## Outputs
- Completed files
- Review notes
- Next task

## Completion Checklist
- [ ] Inputs identified
- [ ] Steps completed
- [ ] Outputs produced
- [ ] Docs updated

## PROMPT TEMPLATE
Use for:
```
prompts/

```
# [Prompt Name]

## Purpose
Reusable prompt for a common task.

## Prompt

```text
[Write the reusable prompt here.]
```

Expected Output
Structured result
File paths if relevant
Checklist if relevant

---

# EVAL TEMPLATE

Use for:

```text
evals/evals.json
```
```json
{
  "skill_name": "project-ai-system",
  "evals": [
    {
      "id": 1,
      "name": "project-startup-plan",
      "prompt": "Create a project startup plan for a full-stack app.",
      "expected_output": "A complete project plan with stack, folders, agents, workflows, and first tasks.",
      "files": []
    },
    {
      "id": 2,
      "name": "agent-routing",
      "prompt": "Route a database schema request to the correct agent and skill.",
      "expected_output": "Correct routing to database-agent and database-designer skill with output checklist.",
      "files": []
    }
  ]
}
```
## CONFIG STARTER FILES
```
config/stack.config.json
```

```json
{
  "project_name": "PROJECT_NAME",
  "project_type": "webapp",
  "frontend": "React + Vite + TypeScript + Tailwind",
  "backend": "FastAPI + Python",
  "database": "PostgreSQL",
  "api": "REST",
  "auth": "JWT",
  "docs": "Markdown",
  "deployment": {
    "frontend": "Vercel",
    "backend": "Render",
    "database": "Neon"
  }
}
```

config/agents.config.json
JSON
{
  "repo_agent": ".github/copilot-instructions.md",
  "sub_agents_path": ".github/agents/",
  "runtime_agents_path": "agents/",
  "skills_path": "skills/",
  "instructions_path": "instructions/",
  "default_execution_order": [
    "project-startup-agent",
    "stack-verifier-agent",
    "system-architect-agent",
    "database-agent",
    "backend-agent",
    "api-agent",
    "frontend-agent",
    "testing-agent",
    "documentation-agent",
    "deployment-agent",
    "code-cleaner-agent",
    "workflow-builder-agent"
  ]
}
config/integrations.json
JSON
{
  "github": true,
  "copilot": true,
  "openai": true,
  "docker": true,
  "database": "postgresql",
  "analytics": null,
  "payments": null,
  "email": null
}
SCRIPT STARTERS
scripts/setup.sh
Bash
#!/usr/bin/env bash
set -e

echo "Setting up project folders..."

mkdir -p frontend backend database api tests docs config scripts
mkdir -p .github/agents agents skills instructions workflows prompts templates evals
mkdir -p evals/benchmarks evals/results

echo "Project folders verified."
scripts/verify-stack.sh
Bash
#!/usr/bin/env bash
set -e

echo "Verifying stack..."

node --version || echo "Node not found"
python --version || echo "Python not found"
docker --version || echo "Docker not found"
git --version || echo "Git not found"

echo "Stack verification complete."
scripts/run-dev.sh
Bash
#!/usr/bin/env bash
set -e

echo "Starting dev environment..."

echo "Start frontend, backend, and database services here."
scripts/test-all.sh
Bash
#!/usr/bin/env bash
set -e

echo "Running all tests..."

echo "Frontend tests..."
echo "Backend tests..."
echo "API tests..."
echo "Database checks..."
scripts/seed-database.py
Python
def main():
    print("Seed database starter script.")

if __name__ == "__main__":
    main()
scripts/generate-docs.py
Python
from pathlib import Path

DOCS = [
    "README.md",
    "project-overview.md",
    "architecture.md",
    "stack.md",
    "frontend.md",
    "backend.md",
    "database.md",
    "api.md",
    "agents.md",
    "skills.md",
    "workflows.md",
    "setup.md",
    "changelog.md",
]

def main():
    docs_dir = Path("docs")
    docs_dir.mkdir(exist_ok=True)

    for doc in DOCS:
        path = docs_dir / doc
        if not path.exists():
            title = doc.replace(".md", "").replace("-", " ").title()
            path.write_text(f"# {title}\\n\\nStarter documentation.\\n", encoding="utf-8")

    print("Docs generated.")

if __name__ == "__main__":
    main()
scripts/benchmark.py
Python
def main():
    print("Benchmark starter script.")

if __name__ == "__main__":
    main()

DOC STARTERS
docs/README.md
Markdown
# Project README

## Overview
Project overview goes here.

## Stack
- Frontend:
- Backend:
- Database:
- API:

## Setup
See `docs/setup.md`.

## Architecture
See `docs/architecture.md`.
docs/architecture.md
Markdown
# Architecture

## Layers
- AI Control Layer
- App Build Layer
- Support Layer

## Data Flow
Input → Backend → Database → API → Frontend

## Agent Flow
Project Startup → Stack Verifier → Database → Backend → API → Frontend → Testing → Docs → Deployment
docs/changelog.md
Markdown
# Changelog

## Unreleased
- Initial project structure planned.
APP PLACEHOLDER FILES
frontend/README.md
Markdown
# Frontend

Frontend application source lives here.

Default stack:
- React
- Vite
- TypeScript
- Tailwind
backend/README.md
Markdown
# Backend

Backend application source lives here.

Default stack:
- FastAPI
- Python
database/README.md
Markdown
# Database

Database schemas, migrations, seeds, and indexes live here.

Default:
- PostgreSQL
api/README.md
Markdown
# API

API contracts, examples, REST routes, and GraphQL notes live here.
tests/README.md
Markdown
# Tests

Testing structure for frontend, backend, API, database, and agent evals.
STEP 4 TASK LIST
Plain text
T-031 Create instruction starter files
T-032 Create repo Copilot instruction file
T-033 Create sub-agent files
T-034 Create runtime agent files
T-035 Create skill SKILL.md files
T-036 Create workflow files
T-037 Create prompt files
T-038 Create eval JSON files
T-039 Create config files
T-040 Create setup scripts
T-041 Create docs starters
T-042 Create app placeholder README files
T-043 Verify file tree
T-044 Run setup script
T-045 Update changelog

STEP 4 COMPLETION CHECKLIST
Plain text
[ ] All starter folders created
[ ] Instruction files drafted
[ ] Repo Copilot instructions drafted
[ ] Sub-agent templates created
[ ] Runtime agent templates created
[ ] Skill templates created
[ ] Workflows drafted
[ ] Prompts drafted
[ ] Eval files drafted
[ ] Config files drafted
[ ] Scripts drafted
[ ] Docs drafted
[ ] App placeholder files added
[ ] Setup script available
[ ] Changelog started

STEP 4 COMPLETION STANDARD
Step 4 is complete when the project has a usable starter repo with:
Plain text
AI control layer
Agent layer
Skill layer
Instruction layer
Workflow layer
Prompt layer
Eval layer
App layer
Support layer
Starter scripts
Starter docs
Starter configs
