---
name: skill-name-here
description: Clear one-line purpose of this skill.
version: 1.0.0
status: active
owner: project-ai-system
category: development | marketing | seo | content | data | design | workflow | automation
tags:
  - tag-one
  - tag-two
  - tag-three
inputs:
  - input_one
  - input_two
outputs:
  - output_one
  - output_two
dependencies:
  - optional-related-skill
---

# Skill Name

## Purpose

Explain what this skill does and when it should be used.

## When To Use

Use this skill when:
- The user requests this exact capability
- A workflow reaches this stage
- Another agent needs this output before continuing

## When Not To Use

Do not use this skill when:
- The request belongs to another skill
- Required inputs are missing
- The output would duplicate an existing workflow result

## Required Inputs

| Input | Type | Required | Description |
|---|---|---:|---|
| project_name | string | yes | Name of the project |
| project_description | string | yes | Short project summary |
| current_phase | string | no | Idea, Prototype, Develop, Launch, Scale |

## Expected Outputs

| Output | Format | Description |
|---|---|---|
| summary | markdown | Clear overview |
| files_to_create | list | Suggested files |
| tasks | list | Actionable build steps |
| handoff_notes | markdown | Notes for next agent/skill |

## Operating Rules

- Stay within the project scope.
- Prefer structured output.
- Use clear file paths when recommending files.
- Include assumptions when inputs are missing.
- Avoid overwriting existing architecture unless requested.
- Break large work into phases.
- End with next recommended action.

## Output Format

```yaml
skill_output:
  summary:
  assumptions:
  decisions:
  files_to_create:
  files_to_update:
  tasks:
  dependencies:
  risks:
  next_step:
  handoff_notes:
