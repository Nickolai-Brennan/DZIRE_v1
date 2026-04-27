---
name: documentation-generator
description: Generate and maintain project documentation. Use when the user asks to write, update, or produce docs, a README, changelog entry, architecture guide, or setup guide.
category: documentation
version: v1.0
inputs:
  - user request
  - existing code and files
  - docs/ folder
outputs:
  - Markdown documentation files
  - Changelog entries
  - README updates
---

# Documentation Generator Skill

## Purpose
Produce clear, accurate, up-to-date Markdown documentation for all layers of the DZIRE_v1 project.

## When To Use
Use this skill when the user asks to:
- Write or update a README
- Add a changelog entry
- Document architecture or data flow
- Write a setup or deployment guide
- Document API endpoints or database schema

## Inputs
- User request
- Relevant source files or folders
- `docs/` current state

## Workflow
1. Identify the documentation type (README, changelog, architecture, etc.)
2. Gather relevant file paths and content
3. Write clear Markdown following the project doc standards
4. Add or update the entry in `docs/README.md` index
5. Add a changelog entry in `docs/changelog.md` if this is a major update
6. Review against checklist

## Output Format
```
# [Doc Title]
## Overview
## [Relevant Sections]
## Reference
```

## Quality Checklist
- [ ] File placed in `docs/`
- [ ] Added to `docs/README.md` index
- [ ] Changelog updated if major change
- [ ] No placeholder text in final output
- [ ] All file path references are relative and correct

## Reference
- [`instructions/docs.md`](../../instructions/docs.md)
- [`prompts/docs-prompt.md`](../../prompts/docs-prompt.md)
