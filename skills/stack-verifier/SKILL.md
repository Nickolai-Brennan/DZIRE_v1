---
name: stack-verifier
description: Verify the project environment and stack are correctly installed and configured. Use when the user asks to check the stack, confirm tools are installed, or set up the environment.
category: verification
version: v1.0
inputs:
  - config/stack.config.json
  - config/env.example
outputs:
  - Stack Verification Report
  - Install Commands
  - Environment Checklist
---

# Stack Verifier Skill

## Purpose
Confirm that all required tools, frameworks, and environment variables for the locked project stack are present and correctly configured.

## When To Use
Use this skill when the user asks to:
- Verify the stack is set up
- Check if required tools are installed
- Produce an environment setup checklist

## Inputs
- `config/stack.config.json` (locked stack)
- `config/env.example` (required env vars)
- Shell environment

## Workflow
1. Read locked stack from `config/stack.config.json`
2. Check each tool: Node, Python, Docker, Git
3. Verify frontend dependencies (`package.json`)
4. Verify backend dependencies (Python packages)
5. Confirm all env vars in `config/env.example` have values in `.env`
6. Report missing items with install commands

## Output Format
```
# Stack Verification Report
## Tools
## Frontend
## Backend
## Database
## Environment Variables
## Missing Items + Install Commands
```

## Quality Checklist
- [ ] All stack tools confirmed present or missing noted
- [ ] Install commands provided for anything missing
- [ ] Env var list cross-referenced against `config/env.example`
- [ ] Report is copy-ready

## Reference
- [`scripts/verify-stack.sh`](../../scripts/verify-stack.sh)
- [`config/stack.config.json`](../../config/stack.config.json)
