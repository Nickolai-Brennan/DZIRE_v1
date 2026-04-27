---
name: brand-guidelines-builder
description: Define, document, and enforce the DZIRE brand identity. Use when updating brand colors, typography, logo rules, or brand guidelines documentation.
category: documentation
version: v1.0
inputs:
  - user request
  - phases/step-6.md
  - existing brand guidelines
outputs:
  - Updated docs/brand-guidelines.md
  - Token updates if color/type changes
  - Logo asset documentation
---

# Brand Guidelines Builder Skill

## Purpose

Define and maintain the DZIRE visual identity: brand colors, typography, logo rules, tone, and consistency guidelines across all surfaces.

## When To Use

Use this skill when the user asks to:
- Define or update brand colors
- Update the typography system
- Document logo usage rules
- Create or update brand guidelines
- Ensure brand consistency across the platform

## Inputs

- User request (brand change or documentation request)
- `phases/step-6.md` — brand foundation spec
- `docs/brand-guidelines.md` — existing guidelines
- `frontend/src/index.css` — live Tailwind theme variables
- `frontend/src/design-system/tokens/colors.ts` — color token reference

## Workflow

1. Review the current `docs/brand-guidelines.md`.
2. Identify what needs to be added or changed.
3. Update the guidelines document with implementation-ready content.
4. If color values change, update `frontend/src/index.css` `@theme` AND `tokens/colors.ts` together.
5. Cross-check that all component files still reference valid Tailwind class names.

## Color Change Protocol

If brand colors change:
1. Update `@theme` in `frontend/src/index.css`.
2. Update `colors` export in `frontend/src/design-system/tokens/colors.ts`.
3. Search for any hardcoded hex values in component files and replace.
4. Run `cd frontend && npm run build` to verify nothing broke.

## Documentation Standards

- Tables for color roles, type scale, and spacing.
- "Do / Don't" rules for each major brand element.
- Concrete examples with Tailwind class names.
- Keep language brief and actionable.

## Quality Checklist

- [ ] All color roles documented with hex values and Tailwind class names
- [ ] Typography fonts, sizes, and weights documented
- [ ] Logo rules cover all variants (primary, icon, watermark, light, dark)
- [ ] Accessibility (contrast) requirements stated
- [ ] Sponsored/VIP content labeling rules documented

## References

- [`docs/brand-guidelines.md`](../../docs/brand-guidelines.md)
- [`frontend/src/design-system/tokens/colors.ts`](../../frontend/src/design-system/tokens/colors.ts)
- [`frontend/public/brand/README.md`](../../frontend/public/brand/README.md)
- [`phases/step-6.md`](../../phases/step-6.md)
