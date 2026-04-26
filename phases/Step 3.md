# STEP 3 — EXECUTION ORDER + BUILD OPERATING SYSTEM

Step 3 turns the project-aware structure from Step 2 into an execution system.

This step defines:
- Build order
- Agent execution flow
- Skill activation flow
- Instruction priority
- Task lifecycle
- Review loops
- Testing loops
- Deployment preparation

---

## STEP 3 OBJECTIVE

Move from mapped structure to controlled execution.

```text
Project Stack Integration
→ Build Flow
→ Agent Execution
→ Skill Activation
→ Review System
→ Deployment Preparation


---

MASTER EXECUTION FLOW

1. Capture project idea
2. Confirm project stack
3. Verify environment
4. Create AI control layer
5. Create app build layer
6. Create support layer
7. Build database
8. Build backend
9. Build API
10. Build frontend
11. Integrate full stack
12. Test system
13. Document system
14. Prepare deployment
15. Review and optimize


---

AGENT EXECUTION ORDER

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


---

INSTRUCTION ACTIVATION FLOW

instructions/root.md
→ instructions/system.md
→ instructions/project.md
→ domain instruction
→ agent instruction
→ skill instruction
→ user request


---

DOMAIN ACTIVATION MAP

Frontend task
→ instructions/frontend.md
→ frontend-agent
→ frontend-builder skill

Backend task
→ instructions/backend.md
→ backend-agent
→ backend-builder skill

Database task
→ instructions/database.md
→ database-agent
→ database-designer skill

API task
→ instructions/api.md
→ api-agent
→ api-designer skill

Docs task
→ instructions/docs.md
→ documentation-agent
→ documentation-generator skill

Testing task
→ instructions/testing.md
→ testing-agent
→ eval-runner skill

Deployment task
→ instructions/deployment.md
→ deployment-agent
→ deployment-planner skill


---

PHASE 1 — PROJECT INTAKE

Agent

project-startup-agent

Required Input

Project Name:
Project Type:
Project Summary:
Target Users:
Core Features:
Revenue Model:
Content/Data Needs:
Admin Needs:
Integrations:
Preferred Stack:

Output

Project Overview
Feature List
Stack Recommendation
Agent Map
Build Phases
Risk Notes
First Task List


---

PHASE 2 — STACK VERIFICATION

Agent

stack-verifier-agent

Verify

Frontend framework
Backend framework
Database engine
API type
Auth method
Hosting target
Package manager
Dev tools
VS Code extensions
Environment variables

Output

Stack Verification Report
Missing Tools
Install Commands
Recommended Extensions
Environment Setup Checklist


---

PHASE 3 — ARCHITECTURE SETUP

Agent

system-architect-agent

Output

Architecture Overview
Layer Map
Service Boundaries
Data Flow
Folder Ownership
Dependency Map


---

PHASE 4 — AI CONTROL LAYER BUILD

Folders

.github/
agents/
skills/
instructions/
workflows/
prompts/
templates/
evals/

Output

Repo Copilot Instructions
Sub-Agent Files
Skill Folders
Instruction Layers
Workflow Files
Prompt Library
Eval Starter Files


---

PHASE 5 — APP BUILD LAYER BUILD

Folders

frontend/
backend/
database/
api/
tests/

Output

Frontend scaffold
Backend scaffold
Database schema
API contracts
Test structure


---

PHASE 6 — SUPPORT LAYER BUILD

Folders

scripts/
docs/
config/

Output

Setup scripts
Run scripts
Environment config
Project docs
Changelog


---

BUILD ORDER BY SYSTEM

1. Database First

Agent:

database-agent

Build:

Schemas

Tables

Relationships

Indexes

Seeds

Migrations


Reason:

Backend and API depend on stable data structure.



---

2. Backend Second

Agent:

backend-agent

Build:

App entrypoint

Services

Auth

Validation

Business logic

Database connection


Reason:

API depends on backend services and logic.



---

3. API Third

Agent:

api-agent

Build:

REST routes

GraphQL schema if needed

Request/response contracts

API docs

Example payloads


Reason:

Frontend depends on stable API contracts.



---

4. Frontend Fourth

Agent:

frontend-agent

Build:

Pages

Components

Layouts

Routes

Forms

Tables

API client


Reason:

UI should consume stable backend/API contracts.



---

5. Testing Fifth

Agent:

testing-agent

Build:

Unit tests

Integration tests

API tests

UI smoke tests

Agent evals



---

6. Documentation Sixth

Agent:

documentation-agent

Build:

README

Setup guide

Architecture guide

API docs

Database docs

Agent docs



---

7. Deployment Seventh

Agent:

deployment-agent

Build:

Docker files

Env examples

CI/CD

Hosting guide

Deployment checklist



---

8. Cleanup Final

Agent:

code-cleaner-agent

Build:

Refactor notes

Dead code cleanup

Naming consistency

Import validation

Documentation cleanup



---

STANDARD DEVELOPMENT LOOP

Plan
→ Build
→ Verify
→ Refactor
→ Document
→ Commit

Each Loop Produces

Updated files
Test result
Review notes
Changelog entry
Next task


---

TASK LIFECYCLE

Backlog
→ Ready
→ In Progress
→ Review
→ Completed
→ Archived


---

TASK FORMAT

{
  "task_id": "T-001",
  "title": "Create root instruction files",
  "agent": "documentation-agent",
  "status": "ready",
  "priority": 1,
  "layer": "AI Control Layer",
  "estimated_time": "30m",
  "outputs": [
    "instructions/root.md",
    "instructions/system.md",
    "instructions/user.md"
  ],
  "dependencies": []
}


---

PRIORITY SYSTEM

1 = Critical
2 = High
3 = Medium
4 = Low
5 = Backlog


---

TIME ESTIMATE SYSTEM

10m
30m
1h
2h
4h
8h


---

REVIEW LOOP

Use after every major build step.

1. Confirm output matches project goal
2. Check correct folder placement
3. Check naming consistency
4. Check dependencies
5. Check tests
6. Check docs
7. Refactor if needed


---

CODE CLEANER LOOP

Analyze
→ Remove dead code
→ Improve structure
→ Standardize naming
→ Validate imports
→ Run tests
→ Update docs


---

TESTING LOOP

Unit Tests
→ Integration Tests
→ API Tests
→ UI Smoke Tests
→ Agent Evals
→ Manual QA


---

DEPLOYMENT PREPARATION LOOP

Verify environment
→ Build frontend
→ Build backend
→ Run migrations
→ Run tests
→ Configure hosting
→ Deploy preview
→ Smoke test preview
→ Document deployment


---

PROJECT OPERATING COMMANDS

Setup

bash scripts/setup.sh

Verify Stack

bash scripts/verify-stack.sh

Run Dev

bash scripts/run-dev.sh

Test All

bash scripts/test-all.sh

Generate Docs

python scripts/generate-docs.py

Benchmark

python scripts/benchmark.py


---

DEFAULT CONFIG FILES

config/stack.config.json

{
  "frontend": "React + Vite + TypeScript + Tailwind",
  "backend": "FastAPI + Python",
  "database": "PostgreSQL",
  "api": "REST",
  "auth": "JWT",
  "deployment": "Docker + Vercel + Render",
  "docs": "Markdown"
}


---

config/agents.config.json

{
  "repo_agent": ".github/copilot-instructions.md",
  "sub_agents": [
    "frontend-agent",
    "backend-agent",
    "database-agent",
    "api-agent",
    "documentation-agent",
    "testing-agent",
    "deployment-agent",
    "code-cleaner-agent",
    "workflow-builder-agent"
  ],
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


---

EVAL STARTER FILE

{
  "skill_name": "project-ai-system",
  "evals": [
    {
      "id": 1,
      "name": "project-startup-flow",
      "prompt": "Create a full project startup plan for a React, FastAPI, PostgreSQL app.",
      "expected_output": "A structured plan with stack, agents, folders, workflows, tasks, and docs.",
      "files": []
    },
    {
      "id": 2,
      "name": "database-first-build-flow",
      "prompt": "Create the database-first build sequence for this project.",
      "expected_output": "A database schema plan followed by backend, API, frontend, tests, and docs.",
      "files": []
    },
    {
      "id": 3,
      "name": "agent-routing-flow",
      "prompt": "Route a frontend dashboard task to the correct instruction, agent, skill, and workflow.",
      "expected_output": "Correct routing through frontend.md, frontend-agent, frontend-builder skill, and frontend-build workflow.",
      "files": []
    }
  ]
}


---

FIRST 30 BUILD TASKS

T-001 Capture project intake
T-002 Confirm project stack
T-003 Verify installed tools
T-004 Create root instruction files
T-005 Create repo Copilot instructions
T-006 Create sub-agent files
T-007 Create runtime agent files
T-008 Create skill folders
T-009 Create workflow files
T-010 Create prompt library
T-011 Create eval starter files
T-012 Create config files
T-013 Create docs structure
T-014 Create script structure
T-015 Scaffold database folder
T-016 Draft database schema
T-017 Add database migrations folder
T-018 Add database seed folder
T-019 Scaffold backend folder
T-020 Create backend app entrypoint
T-021 Create backend service layer
T-022 Connect backend to database
T-023 Create auth foundation
T-024 Create API contracts
T-025 Create API route map
T-026 Scaffold frontend folder
T-027 Create frontend routes
T-028 Create base layout
T-029 Connect frontend to API
T-030 Run first full review


---

BUILD PHASE TASK MAP

AI Control Layer Tasks

T-004 Create root instruction files
T-005 Create repo Copilot instructions
T-006 Create sub-agent files
T-007 Create runtime agent files
T-008 Create skill folders
T-009 Create workflow files
T-010 Create prompt library
T-011 Create eval starter files


---

Support Layer Tasks

T-012 Create config files
T-013 Create docs structure
T-014 Create script structure


---

App Build Layer Tasks

T-015 Scaffold database folder
T-016 Draft database schema
T-017 Add database migrations folder
T-018 Add database seed folder
T-019 Scaffold backend folder
T-020 Create backend app entrypoint
T-021 Create backend service layer
T-022 Connect backend to database
T-023 Create auth foundation
T-024 Create API contracts
T-025 Create API route map
T-026 Scaffold frontend folder
T-027 Create frontend routes
T-028 Create base layout
T-029 Connect frontend to API
T-030 Run first full review


---

HANDOFF FORMAT BETWEEN AGENTS

Each agent should return:

# Agent Output

## Agent
[agent-name]

## Task
[task-id + task title]

## Files Created / Changed
- path/to/file

## Summary
Short summary of work completed.

## Dependencies
- Required dependency
- Related file

## Validation
- What was checked
- What still needs review

## Next Recommended Task
T-XXX Task title


---

FAILURE HANDLING

If a task cannot be completed:

# Blocked Task Report

## Task
[task-id + task title]

## Blocking Issue
Explain the issue.

## Missing Requirement
List missing info, dependency, or file.

## Safe Assumption
State a reasonable fallback.

## Recommended Fix
Provide next action.


---

CHANGELOG RULE

Every major task should update:

docs/changelog.md

Changelog Format

## YYYY-MM-DD — [Task ID]
- Added:
- Changed:
- Fixed:
- Notes:


---

COMMIT MESSAGE FORMAT

feat: add new feature
fix: resolve bug
refactor: improve structure
docs: update documentation
chore: maintenance task
test: add or update tests

Examples:

feat: add initial database schema
docs: add project architecture overview
chore: create ai control layer folders


---

FINAL SYSTEM CHECKLIST

[ ] Project intake captured
[ ] Stack verified
[ ] AI Control Layer created
[ ] App Build Layer created
[ ] Support Layer created
[ ] Agents mapped
[ ] Skills mapped
[ ] Instructions layered
[ ] Workflows connected
[ ] Prompts added
[ ] Evals created
[ ] Scripts added
[ ] Docs created
[ ] Config added
[ ] Frontend scaffolded
[ ] Backend scaffolded
[ ] Database scaffolded
[ ] API scaffolded
[ ] Tests scaffolded
[ ] Development loop defined
[ ] Review loop defined
[ ] Deployment loop defined


---

STEP 3 COMPLETION STANDARD

Step 3 is complete when the system can:

Start from a project idea
Identify the stack
Activate the correct agents
Use the correct skills
Follow the correct instruction layer
Build folders in order
Track tasks
Review outputs
Test outputs
Document progress
Prepare deployment


---

NEXT STEP

Step 4 should generate the actual starter files, templates, configs, scripts, docs, instructions, agent files, skill files, and placeholder app folders.
