---
name: brand-guidelines-builder
description: Create and maintain DZIRE brand identity documentation — logo rules, color system, typography, tone of voice, and accessibility standards.
category: design
version: v1.0
inputs:
  - user request
  - existing brand guidelines doc
  - current design tokens
outputs:
  - Updated docs/brand-guidelines.md
  - Token value updates (if palette/type changes)
---

# Brand Guidelines Builder Skill

## Purpose

Create and maintain the DZIRE brand identity documentation, ensuring all brand decisions are captured, justified, and consistently applied across the platform.

## When To Use

Use this skill when the user asks to:
- Write or update `docs/brand-guidelines.md`
- Make decisions about the brand color palette
- Update font pairing or type scale
- Define logo usage rules
- Establish tone-of-voice guidelines
- Add accessibility or contrast requirements

## Inputs

- User request
- `docs/brand-guidelines.md` (current state)
- `frontend/src/design-system/tokens/colors.ts`
- `frontend/src/design-system/tokens/typography.ts`
- `frontend/public/brand/README.md`

## Workflow

1. Read the existing `docs/brand-guidelines.md`.
2. Identify the section(s) to add or update.
3. Apply changes using clear, actionable language.
4. Verify color tokens pass WCAG AA contrast (4.5:1 for normal text).
5. If token values change, update both the token file and `frontend/src/index.css`.

## Quality Checklist

- [ ] All colors tested for WCAG AA contrast
- [ ] Logo rules cover all use-case variants
- [ ] Typography section includes font loading instructions
- [ ] Tone-of-voice section with do/don't examples
- [ ] Changes synced between docs and token files

## Reference

- [`docs/brand-guidelines.md`](../../docs/brand-guidelines.md)
- [`frontend/src/design-system/tokens/colors.ts`](../../frontend/src/design-system/tokens/colors.ts)
- [`.github/agents/brand-guidelines-agent.md`](../../.github/agents/brand-guidelines-agent.md)
