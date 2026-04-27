# STEP 2 — PROJECT-SPECIFIC STACK INTEGRATION

Step 2 takes the universal AI system from Step 1 and connects it to the actual project being built.

This step defines:
- Project stack
- App folders
- Domain agents
- Domain skills
- Instruction mapping
- Workflow mapping
- Project-specific configuration

---

## STEP 2 OBJECTIVE

Convert the generic AI system into a project-aware build system.

```md
Universal AI Control Layer
→ Project Stack
→ App Build Layer
→ Domain Agents
→ Domain Skills
→ Project Workflows

```txt

---

### REQUIRED PROJECT INTAKE

- Project Name:
- Project Type:
- Project Summary:
- Target Users:
- Core Features:
   |-- Frontend Stack:
   |-- Backend Stack:
   |-- Database:
   |-- API Layer:
Authentication:
Admin Panel:
CMS Needed:
Analytics Needed:
Payment Needed:
Hosting:
Integrations:
AI Tools:


---
```

DEFAULT STACK IF NOT PROVIDED

### Frontend:
React + Vite + TypeScript + Tailwind CSS

### Backend:
FastAPI + Python

### Database:
PostgreSQL

### API Layer:
REST first
GraphQL optional

### Authentication:
JWT or session-based auth

### Admin Panel:
React admin dashboard

### Docs:
Markdown

### DevOps:
Docker + GitHub Actions

### Hosting:
Vercel frontend
Render/Railway/Fly.io backend
Neon/Supabase PostgreSQL

```

---

PROJECT-SPECIFIC ROOT STRUCTURE

project-root/
├── .github/
│   ├── copilot-instructions.md
│   └── agents/
│       ├── project-startup-agent.md
│       ├── stack-verifier-agent.md
│       ├── frontend-agent.md
│       ├── backend-agent.md
│       ├── database-agent.md
│       ├── api-agent.md
│       ├── documentation-agent.md
│       ├── testing-agent.md
│       ├── deployment-agent.md
│       ├── code-cleaner-agent.md
│       └── workflow-builder-agent.md
│
├── agents/
│   ├── orchestration-agent.md
│   ├── product-manager-agent.md
│   ├── system-architect-agent.md
│   ├── stack-verifier-agent.md
│   └── qa-review-agent.md
│
├── skills/
│   ├── project-planner/
│   │   ├── SKILL.md
│   │   ├── assets/
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── stack-verifier/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── frontend-builder/
│   │   ├── SKILL.md
│   │   ├── assets/
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── backend-builder/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── database-designer/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── api-designer/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── references/
│   │
│   └── documentation-generator/
│       ├── SKILL.md
│       ├── assets/
│       └── references/
│
├── instructions/
│   ├── root.md
│   ├── system.md
│   ├── user.md
│   ├── project.md
│   ├── frontend.md
│   ├── backend.md
│   ├── database.md
│   ├── api.md
│   ├── docs.md
│   ├── testing.md
│   └── deployment.md
│
├── workflows/
│   ├── project-startup.md
│   ├── stack-identification.md
│   ├── frontend-build.md
│   ├── backend-build.md
│   ├── database-build.md
│   ├── api-build.md
│   ├── fullstack-integration.md
│   ├── testing-review.md
│   └── deployment.md
│
├── prompts/
│   ├── project-summary-prompt.md
│   ├── stack-selection-prompt.md
│   ├── frontend-prompt.md
│   ├── backend-prompt.md
│   ├── database-prompt.md
│   ├── api-prompt.md
│   ├── docs-prompt.md
│   └── review-prompt.md
│
├── templates/
│   ├── frontend-template/
│   ├── backend-template/
│   ├── database-template/
│   ├── api-template/
│   ├── docs-template/
│   └── fullstack-template/
│
├── evals/
│   ├── evals.json
│   ├── frontend-evals.json
│   ├── backend-evals.json
│   ├── database-evals.json
│   ├── api-evals.json
│   ├── benchmarks/
│   └── results/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── layouts/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── README.md
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── auth/
│   │   ├── core/
│   │   └── main.py
│   └── README.md
│
├── database/
│   ├── schemas/
│   ├── migrations/
│   ├── seeds/
│   ├── indexes/
│   └── README.md
│
├── api/
│   ├── rest/
│   ├── graphql/
│   ├── contracts/
│   ├── examples/
│   └── README.md
│
├── tests/
│   ├── frontend/
│   ├── backend/
│   ├── api/
│   └── database/
│
├── scripts/
│   ├── setup.sh
│   ├── verify-stack.sh
│   ├── run-dev.sh
│   ├── test-all.sh
│   ├── seed-database.py
│   ├── generate-docs.py
│   └── benchmark.py
│
├── docs/
│   ├── README.md
│   ├── project-overview.md
│   ├── architecture.md
│   ├── stack.md
│   ├── frontend.md
│   ├── backend.md
│   ├── database.md
│   ├── api.md
│   ├── agents.md
│   ├── skills.md
│   ├── workflows.md
│   ├── setup.md
│   └── changelog.md
│
└── config/
    ├── env.example
    ├── settings.json
    ├── integrations.json
    ├── stack.config.json
    └── agents.config.json

```

---

### LAYER MODEL

#### Layer 1 — AI Control Layer

```
.github/
agents/
skills/
instructions/
workflows/
prompts/
templates/
evals/
```
#### Purpose:

```
• Controls AI behavior
• Organizes agents
• Stores reusable skills
• Runs evaluations
• Standardizes project workflows
```

---

#### Layer 2 — App Build Layer
```
frontend/
backend/
database/
api/
tests/
```
#### Purpose:
- Stores actual application code
- Separates UI, server, data, and contracts 
- Keeps testing organized



---

#### Layer 3 — Support Layer
```
scripts/
docs/
config/
```

#### Purpose:

- Automates setup
- Stores project documentation
- Tracks stack and integration settings

---

PROJECT-SPECIFIC AGENT MAP

### Repo-Level Agent
```
.github/copilot-instructions.md
```
Purpose:

- Controls repo behavior
- Enforces project stack
- Routes domain work
- Maintains architecture rules
  
---

#### Sub-Agent Map
```text
.github/agents/
├── project-startup-agent.md
├── stack-verifier-agent.md
├── frontend-agent.md
├── backend-agent.md
├── database-agent.md
├── api-agent.md
├── documentation-agent.md
├── testing-agent.md
├── deployment-agent.md
├── code-cleaner-agent.md
└── workflow-builder-agent.md
```

---

#### AGENT RESPONSIBILITIES
```
project-startup-agent
```
#### Purpose:
Convert project idea into a build plan
Identify required systems
Create initial architecture


#### Outputs:
```
Project summary
Stack recommendation
Repo structure
Build phases
First task list
```


---

stack-verifier-agent

Purpose:

Verify selected tools

Check environment readiness

Confirm dependencies


Outputs:

Stack report

Missing tools

Setup commands

Recommended extensions



---

frontend-agent

Purpose:

Build UI and client-side structure


Handles:

React components

Pages

Layouts

Routing

State management

Tables

Forms

Styling


Outputs:

Component tree

Frontend file structure

UI build plan



---

backend-agent

Purpose:

Build server-side logic


Handles:

FastAPI routes

Services

Validation

Auth logic

Business logic

Database connection


Outputs:

Backend structure

Route plan

Service layer plan



---

database-agent

Purpose:

Design and maintain database


Handles:

Tables

Schemas

Relationships

Indexes

Seeds

Migrations


Outputs:

SQL schema

ERD notes

Migration plan



---

api-agent

Purpose:

Connect frontend, backend, and database


Handles:

REST endpoints

GraphQL schema if used

Request/response contracts

API docs


Outputs:

Endpoint map

API schema

Example requests



---

documentation-agent

Purpose:

Create and maintain project docs


Handles:

README

Architecture docs

API docs

Database docs

Setup docs


Outputs:

Markdown docs

Onboarding guide



---

testing-agent

Purpose:

Verify system quality


Handles:

Unit tests

Integration tests

API tests

UI smoke tests

Agent evals


Outputs:

Test plan

Test files

QA checklist



---

deployment-agent

Purpose:

Prepare project for hosting


Handles:

Docker

Environment variables

CI/CD

Build commands

Deployment verification


Outputs:

Deployment guide

Config files

Checklist



---

code-cleaner-agent

Purpose:

Refactor and clean code


Handles:

Formatting

Naming

Dead code removal

File organization

Consistency checks


Outputs:

Refactor plan

Cleaned code

Review notes



---

workflow-builder-agent

Purpose:

Improve and expand repeatable workflows


Handles:

Workflow mapping

Automation opportunities

Build loops

Review loops


Outputs:

Workflow docs

Automation suggestions

Updated task flows



---

SKILL INTEGRATION MAP

skills/
├── project-planner/
├── stack-verifier/
├── frontend-builder/
├── backend-builder/
├── database-designer/
├── api-designer/
├── documentation-generator/
├── eval-runner/
└── deployment-planner/


---

Skill-to-Agent Mapping

project-startup-agent       → project-planner
stack-verifier-agent        → stack-verifier
frontend-agent              → frontend-builder
backend-agent               → backend-builder
database-agent              → database-designer
api-agent                   → api-designer
documentation-agent         → documentation-generator
testing-agent               → eval-runner
deployment-agent            → deployment-planner
workflow-builder-agent      → project-planner + eval-runner
code-cleaner-agent          → documentation-generator + stack-verifier


---

INSTRUCTION INTEGRATION MAP

instructions/
├── root.md
├── system.md
├── user.md
├── project.md
├── frontend.md
├── backend.md
├── database.md
├── api.md
├── docs.md
├── testing.md
└── deployment.md


---

Instruction Priority

root.md
↓
system.md
↓
project.md
↓
domain instruction
↓
agent instruction
↓
skill instruction
↓
user prompt


---

Domain Instruction Use

frontend.md    → frontend-agent + frontend-builder
backend.md     → backend-agent + backend-builder
database.md    → database-agent + database-designer
api.md         → api-agent + api-designer
docs.md        → documentation-agent + documentation-generator
testing.md     → testing-agent + eval-runner
deployment.md  → deployment-agent + deployment-planner


---

WORKFLOW INTEGRATION MAP

workflows/
├── project-startup.md
├── stack-identification.md
├── frontend-build.md
├── backend-build.md
├── database-build.md
├── api-build.md
├── fullstack-integration.md
├── testing-review.md
└── deployment.md


---

Main Build Flow

Project Idea
→ Project Startup Agent
→ Stack Verifier Agent
→ System Architect Agent
→ Database Agent
→ Backend Agent
→ API Agent
→ Frontend Agent
→ Testing Agent
→ Documentation Agent
→ Deployment Agent
→ Code Cleaner Agent
→ Workflow Builder Agent


---

PROMPT INTEGRATION MAP

prompts/
├── project-summary-prompt.md
├── stack-selection-prompt.md
├── frontend-prompt.md
├── backend-prompt.md
├── database-prompt.md
├── api-prompt.md
├── docs-prompt.md
└── review-prompt.md


---

Prompt Usage

project-summary-prompt.md  → intake and planning
stack-selection-prompt.md  → stack decision support
frontend-prompt.md         → UI/page/component generation
backend-prompt.md          → service and route generation
database-prompt.md         → schema and migration generation
api-prompt.md              → endpoint/contract generation
docs-prompt.md             → markdown docs generation
review-prompt.md           → QA and cleanup


---

TEMPLATE INTEGRATION MAP

templates/
├── frontend-template/
├── backend-template/
├── database-template/
├── api-template/
├── docs-template/
└── fullstack-template/


---

Template Usage

frontend-template/   → pages, layouts, components
backend-template/    → routes, services, auth, core app
database-template/   → schemas, migrations, seeds
api-template/        → contracts, examples, route docs
docs-template/       → README, architecture, setup docs
fullstack-template/  → complete project starter pattern


---

EVAL INTEGRATION MAP

evals/
├── evals.json
├── frontend-evals.json
├── backend-evals.json
├── database-evals.json
├── api-evals.json
├── benchmarks/
└── results/


---

Eval Usage

evals.json            → full system evals
frontend-evals.json   → UI/component evals
backend-evals.json    → route/service evals
database-evals.json   → schema/migration evals
api-evals.json        → endpoint/contract evals


---

CONFIG INTEGRATION MAP

config/
├── env.example
├── settings.json
├── integrations.json
├── stack.config.json
└── agents.config.json


---

stack.config.json

{
  "project_name": "PROJECT_NAME",
  "project_type": "webapp",
  "frontend": "React + Vite + TypeScript + Tailwind",
  "backend": "FastAPI + Python",
  "database": "PostgreSQL",
  "api": "REST",
  "auth": "JWT",
  "admin_panel": true,
  "cms": false,
  "analytics": false,
  "payments": false,
  "docs": "Markdown",
  "deployment": {
    "frontend": "Vercel",
    "backend": "Render",
    "database": "Neon"
  }
}


---

agents.config.json

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


---

SCRIPT INTEGRATION MAP

scripts/
├── setup.sh
├── verify-stack.sh
├── run-dev.sh
├── test-all.sh
├── seed-database.py
├── generate-docs.py
└── benchmark.py


---

Script Purpose

setup.sh            → create base folders and install starter dependencies
verify-stack.sh     → confirm tools are installed
run-dev.sh          → start dev services
test-all.sh         → run all tests
seed-database.py    → insert starter data
generate-docs.py    → generate or refresh docs
benchmark.py        → run eval benchmarks


---

DOC INTEGRATION MAP

docs/
├── README.md
├── project-overview.md
├── architecture.md
├── stack.md
├── frontend.md
├── backend.md
├── database.md
├── api.md
├── agents.md
├── skills.md
├── workflows.md
├── setup.md
└── changelog.md


---

Doc Purpose

README.md             → project entry point
project-overview.md   → what the project is
architecture.md       → system layers and data flow
stack.md              → stack choices and setup notes
frontend.md           → UI structure
backend.md            → server structure
database.md           → schema and migration notes
api.md                → endpoint contracts
agents.md             → agent map and responsibilities
skills.md             → skill map and usage
workflows.md          → repeatable workflows
setup.md              → install/run instructions
changelog.md          → changes over time


---

DOMAIN OWNERSHIP MAP

frontend/   → frontend-agent
backend/    → backend-agent
database/   → database-agent
api/        → api-agent
tests/      → testing-agent
docs/       → documentation-agent
scripts/    → deployment-agent + stack-verifier-agent
config/     → stack-verifier-agent + system-architect-agent


---

STEP 2 BUILD PHASES

Phase 1: Project intake
Phase 2: Stack selection
Phase 3: Domain folder creation
Phase 4: Agent mapping
Phase 5: Skill mapping
Phase 6: Instruction mapping
Phase 7: Workflow mapping
Phase 8: Config setup
Phase 9: Documentation setup
Phase 10: Ready for execution


---

STEP 2 TASK LIST

T-001 Capture project intake
T-002 Confirm project type
T-003 Select frontend stack
T-004 Select backend stack
T-005 Select database
T-006 Select API layer
T-007 Select auth method
T-008 Select hosting target
T-009 Create app folders
T-010 Add project-specific agents
T-011 Add project-specific skills
T-012 Add domain instructions
T-013 Add build workflows
T-014 Add prompt library
T-015 Add eval starter files
T-016 Add stack config
T-017 Add agent config
T-018 Add docs map
T-019 Verify ownership map
T-020 Prepare Step 3 execution plan


---

STEP 2 COMPLETION CHECKLIST

[ ] Project stack identified
[ ] Project type identified
[ ] Frontend folder added
[ ] Backend folder added
[ ] Database folder added
[ ] API folder added
[ ] Tests folder added
[ ] Agents mapped to domains
[ ] Skills mapped to agents
[ ] Instructions mapped to domains
[ ] Workflows mapped to build phases
[ ] Prompts mapped to repeatable tasks
[ ] Templates mapped to project layers
[ ] Evals mapped to quality checks
[ ] Scripts mapped to setup/dev/test tasks
[ ] Docs mapped to onboarding and architecture
[ ] Config files defined
[ ] Domain ownership clear


---

STEP 2 COMPLETION STANDARD

Step 2 is complete when the project has:

A selected stack
A project-aware folder structure
Mapped agents
Mapped skills
Mapped instruction layers
Mapped workflows
Mapped prompts
Mapped templates
Mapped evals
Mapped scripts
Mapped docs
Mapped config files
Clear domain ownership


---

NEXT STEP

Step 3 should define execution order, build flow, task lifecycle, testing loops, and deployment preparation.
