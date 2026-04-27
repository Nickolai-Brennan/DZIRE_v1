---
name: planning-agent-skill
description: Convert ideas into structured project plans with phases, modules, and tech stack. Use for new projects, roadmaps, scope definition, or breaking goals into deliverables.
category: planning
version: v1.0
inputs:
  - project_name
  - project_description
outputs:
  - roadmap
  - features
  - system_modules
  - tech_recommendations
---

# Planning Agent Skill

## Purpose
Convert unstructured project ideas into clear, actionable plans with defined phases, modules, tech stack recommendations, and deliverable roadmaps.

## When To Use
Use this skill when the user wants to:
- Plan a new project from scratch
- Define project scope and phases
- Generate a feature list or system module map
- Produce a phased roadmap
- Identify tech stack recommendations
- Break a high-level goal into concrete deliverables

## Inputs
- `project_name` — short name for the project
- `project_description` — free-text description of the idea, goal, or problem to solve

## Workflow
1. Clarify the project name, type, and core goal
2. Identify target users and their primary needs
3. Extract core features and group into logical modules
4. Sequence modules into phased build milestones (MVP → v1 → scale)
5. Recommend tech stack based on project type
6. Output a structured plan document

## Output Format
```
# [Project Name] — Project Plan
## Summary
## Target Users
## Core Features
## System Modules
## Recommended Tech Stack
## Phased Roadmap
  - Phase 1: MVP
  - Phase 2: v1 Launch
  - Phase 3: Scale
## First Tasks
```

## Quality Checklist
- [ ] Project name and description confirmed
- [ ] At least 3 core features identified
- [ ] System modules mapped to features
- [ ] Phased roadmap produced with at least 2 phases
- [ ] Tech stack recommended with rationale
- [ ] First tasks listed in priority order

## References
- [Planning Guide](references/planning-guide.md)
- [Plan Template](assets/plan-template.md)
- [`skills/project-planner/SKILL.md`](../project-planner/SKILL.md)
