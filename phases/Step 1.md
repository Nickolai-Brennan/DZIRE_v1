# STEP 1 — UNIVERSAL AI SYSTEM FILE STRUCTURE

This is the **foundation layer** of the entire system.

It defines a standardized, scalable directory for:
- Repo-level agents
- Sub-agents
- Skills
- Instructions
- Workflows
- Prompts
- Templates
- Evaluations
- Scripts
- Documentation
- Configuration

This structure is **framework-agnostic** and designed to work with:
- OpenAI Agents
- GitHub Copilot
- Claude Skills
- Custom multi-agent systems

---

## STEP 1 OBJECTIVE

Create a reusable base system that:

- Organizes all AI logic cleanly
- Separates concerns (agents vs skills vs instructions)
- Enables automation and scaling
- Works across all future projects

---

# ROOT DIRECTORY STRUCTURE

```text
project-root/
├── .github/
│   ├── copilot-instructions.md
│   └── agents/
│       ├── frontend-agent.md
│       ├── backend-agent.md
│       ├── database-agent.md
│       ├── api-agent.md
│       ├── documentation-agent.md
│       ├── marketing-agent.md
│       ├── revenue-traffic-agent.md
│       ├── workflow-builder-agent.md
│       └── code-cleaner-agent.md
│
├── agents/
│   ├── orchestration-agent.md
│   ├── project-startup-agent.md
│   └── system-monitor-agent.md
│
├── skills/
│   ├── skill-name/
│   │   ├── SKILL.md
│   │   ├── assets/
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── agent-skill-creator/
│   └── prompt-engineer/
│
├── instructions/
│   ├── root.md
│   ├── system.md
│   ├── user.md
│   ├── coding.md
│   ├── design.md
│   └── marketing.md
│
├── workflows/
│   ├── project-startup.md
│   ├── agent-creation.md
│   ├── skill-evaluation.md
│   └── deployment.md
│
├── prompts/
│   ├── agent-prompts.md
│   ├── marketing-prompts.md
│   └── system-prompts.md
│
├── templates/
│   ├── webapp-template/
│   ├── api-template/
│   └── microservice-template/
│
├── evals/
│   ├── evals.json
│   ├── benchmarks/
│   └── results/
│
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   ├── benchmark.py
│   └── helpers/
│
├── docs/
│   ├── README.md
│   ├── architecture.md
│   ├── agents.md
│   ├── skills.md
│   ├── workflows.md
│   └── changelog.md
│
└── config/
    ├── env.example
    ├── settings.json
    └── integrations.json


```
# STEP 1 — AI SYSTEM FILE STRUCTURE DIRECTORY

Standardized layout for Repo-Level Agents, Sub-Agents, Skills, Instructions, Workflows, Prompts, Templates, Evals, Scripts, Docs, and Config.

Designed for:
- OpenAI agents
- GitHub Copilot
- Claude-style skills
- Custom GPTs
- Repo-level AI systems
- Multi-agent project workflows

---

## STEP 1 OBJECTIVE

Create the universal AI control structure before project-specific stack work begins.

```text
Universal AI System Directory
→ Repo-Level Agent
→ Sub-Agents
→ Skills
→ Instructions
→ Workflows
→ Prompts
→ Templates
→ Evals
→ Scripts
→ Docs
→ Config


---

ROOT STRUCTURE

project-root/
├── .github/
│   ├── copilot-instructions.md
│   └── agents/
│       ├── frontend-agent.md
│       ├── backend-agent.md
│       ├── database-agent.md
│       ├── api-agent.md
│       ├── documentation-agent.md
│       ├── marketing-agent.md
│       ├── revenue-traffic-agent.md
│       ├── workflow-builder-agent.md
│       └── code-cleaner-agent.md
│
├── agents/
│   ├── orchestration-agent.md
│   ├── project-startup-agent.md
│   └── system-monitor-agent.md
│
├── skills/
│   ├── skill-name/
│   │   ├── SKILL.md
│   │   ├── assets/
│   │   ├── scripts/
│   │   └── references/
│   │
│   ├── agent-skill-creator/
│   │   ├── SKILL.md
│   │   ├── assets/
│   │   ├── scripts/
│   │   └── references/
│   │
│   └── prompt-engineer/
│       ├── SKILL.md
│       ├── scripts/
│       └── references/
│
├── instructions/
│   ├── root.md
│   ├── system.md
│   ├── user.md
│   ├── coding.md
│   ├── design.md
│   └── marketing.md
│
├── workflows/
│   ├── project-startup.md
│   ├── agent-creation.md
│   ├── skill-evaluation.md
│   └── deployment.md
│
├── prompts/
│   ├── agent-prompts.md
│   ├── marketing-prompts.md
│   └── system-prompts.md
│
├── templates/
│   ├── webapp-template/
│   ├── api-template/
│   └── microservice-template/
│
├── evals/
│   ├── evals.json
│   ├── benchmarks/
│   └── results/
│
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   ├── data-ingestion.py
│   └── benchmark.py
│
├── docs/
│   ├── README.md
│   ├── architecture.md
│   ├── agents.md
│   ├── skills.md
│   ├── workflows.md
│   └── changelog.md
│
└── config/
    ├── env.example
    ├── settings.json
    └── integrations.json


---

1. REPO-LEVEL AGENT

Location

.github/copilot-instructions.md

Purpose

The repo-level agent is the primary control layer for the repository.

It defines:

Project-wide rules

Architecture standards

File structure expectations

Coding standards

Documentation standards

Agent routing rules

Review expectations


Responsibilities

Global behavior controller
Defines architecture rules
Controls all agent outputs
Enforces standards across repo
Routes work to sub-agents
Keeps project structure consistent


---

2. SUB-AGENTS

Location

.github/agents/

Purpose

Sub-agents are specialized repo-level agents for focused work areas.

They handle:

Specific domains

Task-specific workflows

Modular project execution

Domain-level review


Starter Sub-Agents

frontend-agent.md
backend-agent.md
database-agent.md
api-agent.md
documentation-agent.md
marketing-agent.md
revenue-traffic-agent.md
workflow-builder-agent.md
code-cleaner-agent.md

Required Agent Sections

Each agent should include:

Role
Purpose
Inputs
Workflow
Outputs
Guardrails
Checklist


---

3. RUNTIME / SYSTEM AGENTS

Location

agents/

Purpose

Runtime/system agents coordinate broader project behavior outside the repo-level Copilot folder.

They help manage:

Orchestration

Project startup

System monitoring

Agent routing

Dependency tracking


Starter Runtime Agents

orchestration-agent.md
project-startup-agent.md
system-monitor-agent.md


---

4. SKILLS SYSTEM

Location

skills/

Purpose

Skills are reusable intelligence modules that can be used across agents, projects, and workflows.

They support:

Trigger-based execution

Reusable workflows

Cross-platform AI behavior

Bundled assets/scripts/references


Standard Skill Structure

skill-name/
├── SKILL.md
├── assets/
├── scripts/
└── references/

Folder Purpose

SKILL.md    → Core skill instructions
assets/     → Templates, images, files, examples
scripts/    → Executable helpers
references/ → Supporting docs, guides, schemas


---

5. INSTRUCTION LAYERS

Location

instructions/

Purpose

Instruction files define behavior hierarchy and operating rules.

Starter Files

root.md
system.md
user.md
coding.md
design.md
marketing.md

Hierarchy

root.md
→ system.md
→ agent instructions
→ skill instructions
→ user prompt

Layer Roles

root.md      → highest-level operating rules
system.md    → system behavior and execution model
user.md      → interaction style and response preferences
coding.md    → coding standards
design.md    → UI/UX and brand rules
marketing.md → growth, content, and campaign rules


---

6. WORKFLOWS

Location

workflows/

Purpose

Workflows define repeatable processes that connect agents, skills, and outputs.

Starter Workflows

project-startup.md
agent-creation.md
skill-evaluation.md
deployment.md

Workflow File Should Include

Purpose
Trigger
Inputs
Steps
Outputs
Completion Checklist


---

7. PROMPTS

Location

prompts/

Purpose

Prompts store reusable non-agent prompt assets.

They are useful for:

Repeated tasks

Testing

Content generation

Agent bootstrapping

System prompt variations


Starter Files

agent-prompts.md
marketing-prompts.md
system-prompts.md


---

8. TEMPLATES

Location

templates/

Purpose

Templates provide reusable project starter kits and output patterns.

Starter Templates

webapp-template/
api-template/
microservice-template/

Template Contents

README.md
starter folders
config examples
docs examples
agent examples


---

9. EVALUATION SYSTEM

Location

evals/

Purpose

Evals test agent and skill performance.

They track:

Output quality

Structure accuracy

Trigger accuracy

Completeness

Reusability

Regression issues


Starter Structure

evals/
├── evals.json
├── benchmarks/
└── results/


---

10. SCRIPTS

Location

scripts/

Purpose

Scripts automate repetitive actions.

Common scripts:

Setup

Deployment

Data ingestion

Benchmarking

File generation

Docs generation


Starter Scripts

setup.sh
deploy.sh
data-ingestion.py
benchmark.py


---

11. DOCUMENTATION

Location

docs/

Purpose

Docs explain how the AI system works.

Starter Docs

README.md
architecture.md
agents.md
skills.md
workflows.md
changelog.md


---

12. CONFIG

Location

config/

Purpose

Config files define project settings and integrations.

Starter Config Files

env.example
settings.json
integrations.json


---

SYSTEM RULES

Keep structure modular
Avoid duplication
Separate concerns cleanly
Ensure each folder has a clear purpose
Maintain naming consistency
Use lowercase kebab-case for files and folders
Use README.md files for folder explanations when useful
Keep agent responsibilities separate
Keep skills reusable across projects


---

SCALING RULE

When the system grows:

agents      → split into domains
skills      → expand with scripts and references
workflows   → automate pipelines
docs        → expand onboarding and architecture
evals       → add benchmark cases
config      → track integrations and environments
templates   → create reusable project starters


---

STEP 1 COMPLETION CHECKLIST

[ ] .github/copilot-instructions.md added
[ ] .github/agents/ added
[ ] agents/ added
[ ] skills/ added
[ ] instructions/ added
[ ] workflows/ added
[ ] prompts/ added
[ ] templates/ added
[ ] evals/ added
[ ] scripts/ added
[ ] docs/ added
[ ] config/ added
[ ] README files added where needed
[ ] Naming conventions applied
[ ] Folder purpose documented


---

FINAL STANDARD

Step 1 is complete when the repository has a universal AI system directory that can:

Support repo-level agents
Support sub-agents
Support reusable skills
Support layered instructions
Support workflows
Support reusable prompts
Support templates
Support evaluations
Support scripts
Support documentation
Support future scaling


---

NEXT STEP

Step 2 should identify the project stack and integrate the AI system specifically into the project being built.
