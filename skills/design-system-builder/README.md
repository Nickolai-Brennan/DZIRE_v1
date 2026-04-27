---
name: design-system-builder
description: Build and maintain design tokens, UI components, layouts, and patterns in the DZIRE design system. Use when adding tokens, components, layouts, or patterns.
category: build
version: v1.0
inputs:
  - user request
  - phases/step-6.md
  - existing design-system structure
outputs:
  - Token files
  - React component files
  - Layout files
  - Pattern files
  - Updated barrel exports
---

# Design System Builder Skill

## Purpose

Build and maintain the DZIRE design system: tokens, components, layouts, and patterns. Ensures consistency with the brand and enforces TypeScript/Tailwind conventions.

## When To Use

Use this skill when the user asks to:
- Add or update a design token (color, spacing, shadow, etc.)
- Create a new UI component
- Add a layout shell
- Add a compound content pattern
- Update the design system documentation

## Inputs

- User request (component/token name and requirements)
- `phases/step-6.md` — design spec
- `frontend/src/design-system/` — existing structure
- `frontend/src/index.css` — Tailwind theme tokens

## Workflow

1. Identify whether the change is a token, component, layout, or pattern.
2. Create the file in the correct subdirectory.
3. Export from the correct `index.ts` barrel.
4. Run `cd frontend && npx tsc -b --noEmit` to verify TypeScript.
5. Update the relevant doc in `docs/` (design-system.md or ui-components.md).

## Token Rules

- All token files export a `const` object with `as const`.
- No duplicate values — reference existing tokens in new tokens where possible.
- Token names must match the Tailwind `@theme` CSS variable names where applicable.

## Component Rules

- Functional React components with TypeScript interfaces for all props.
- Tailwind CSS v4 utility classes only — no inline styles.
- Default `type="button"` on all buttons.
- Accessible: ARIA attributes, visible focus rings, disabled states.
- `className` passthrough on all components.

## Output Format

```
frontend/src/design-system/
├── tokens/[name].ts          # New token file
├── components/[Name].tsx     # New component
├── layouts/[Name].tsx        # New layout
├── patterns/[Name].tsx       # New pattern
└── [sub]/index.ts            # Updated barrel
```

## Quality Checklist

- [ ] TypeScript compiles with `noUnusedLocals` and `noUnusedParameters`
- [ ] Component exported from its barrel `index.ts`
- [ ] Accessible attributes added where required
- [ ] Documented in `docs/design-system.md` or `docs/ui-components.md`

## References

- [`docs/design-system.md`](../../docs/design-system.md)
- [`docs/brand-guidelines.md`](../../docs/brand-guidelines.md)
- [`phases/step-6.md`](../../phases/step-6.md)
- [`frontend/src/design-system/README.md`](../../frontend/src/design-system/README.md)
