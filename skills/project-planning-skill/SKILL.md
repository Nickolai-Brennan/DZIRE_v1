---
name: project-planning-skill
description: Convert product ideas into structured briefs with scope, audience, features, and revenue paths. Use for startup concepts, app ideas, or any project needing a clear, actionable brief.
category: planning
version: v1.0
inputs:
  - idea
  - optional_context
outputs:
  - project-brief.md
---

# Project Planning Skill

## Purpose
Transform an unstructured idea into a clear, actionable project brief.

## Instructions
1. Extract core idea
2. Define audience
3. Identify problem
4. Propose solution
5. List core features
6. Define monetization strategy
7. Output structured markdown brief

## Output Format
```
- Project Name
- Description
- Audience
- Problem
- Solution
- Features
- Revenue Model
```
## Assets
- idea-intake-form.md
- project-brief-example.md

## Templates
- project-brief-template.md

## Scripts
- generate_project_brief.py

## References
- project-startup-guide.md
