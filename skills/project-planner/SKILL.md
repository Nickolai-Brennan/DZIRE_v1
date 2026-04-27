---
name: project-planner
description: Convert a raw project idea into a structured startup plan with stack, agents, folders, workflows, and first tasks. Use when the user asks to plan, scope, or kick off a new project.
category: planning
version: v1.0
inputs:
  - project idea
  - optional constraints
outputs:
  - project-overview.md
  - first-task-list
---

# Project Planner Skill

## Purpose
Transform an unstructured idea into a complete project startup plan ready to hand off to the build pipeline.

## When To Use
Use this skill when the user asks to:
- Start a new project
- Scope a product idea
- Produce an agent map and build phase list

## Inputs
- Project idea (free text)
- Optional: stack preference, target users, revenue model

## Workflow
1. Capture project name, type, and summary
2. Identify target users and core features
3. Confirm stack against `config/stack.config.json`
4. Map required agents and build phases
5. Produce first 10 tasks in Step 3 T-format
6. Review against checklist

## Output Format
```
# Project Overview
## Summary
## Target Users
## Core Features
## Stack
## Agent Map
## Build Phases
## First Tasks
```

## Quality Checklist
- [ ] Stack matches `config/stack.config.json`
- [ ] Agent map references `config/agents.config.json`
- [ ] First tasks are in T-001 format
- [ ] Build phases follow Step 3 execution order

## Reference
- [`instructions/project.md`](../../instructions/project.md)
- [`workflows/project-startup.md`](../../workflows/project-startup.md)
