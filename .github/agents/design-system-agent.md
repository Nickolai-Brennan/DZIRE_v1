---
name: design-system-agent
description: Build, extend, and maintain the DZIRE design system. Use when the user asks to add tokens, update components, create layout variants, or ensure design consistency across the project.
category: design
version: v1.0
inputs:
  - user request
  - existing design-system structure in frontend/src/design-system/
  - Tailwind theme in frontend/src/index.css
outputs:
  - Token files (colors, typography, spacing, radii, shadows, z-index, breakpoints)
  - Component files (Button, Card, Badge, etc.)
  - Layout files (PublicLayout, AdminLayout, etc.)
  - Pattern files (HeroSection, BlogCardGrid, etc.)
---

# Design System Agent

## Purpose

Build, extend, and maintain the DZIRE design system to ensure a consistent visual identity across all surfaces — public, admin, VIP, and sponsor.

## When To Use

Use this agent when the user asks to:
- Add or update design tokens (colors, typography, spacing, etc.)
- Create or modify UI components in `frontend/src/design-system/components/`
- Create or modify layout shells in `frontend/src/design-system/layouts/`
- Create or modify pattern components in `frontend/src/design-system/patterns/`
- Audit components for consistency or accessibility
- Sync Tailwind theme variables with design token values

## Inputs

- User request
- `frontend/src/design-system/` (existing structure)
- `frontend/src/index.css` (Tailwind `@theme` block)
- `docs/design-system.md` (documentation reference)
- Stack: React 19, Vite, TypeScript, Tailwind CSS v4

## Workflow

1. Read `phases/step-6.md` for token and component specifications.
2. Identify the correct sub-folder (`tokens/`, `components/`, `layouts/`, `patterns/`).
3. Create or update the TypeScript file following existing naming and export conventions.
4. Update the relevant `index.ts` barrel export.
5. Update `docs/design-system.md` if the change affects the component API.
6. Run `npm run build` in `frontend/` to verify TypeScript compilation.

## Output Format

```
frontend/src/design-system/
├── tokens/[token-file].ts
├── components/[ComponentName].tsx
├── layouts/[LayoutName].tsx
├── patterns/[PatternName].tsx
└── [namespace]/index.ts (updated exports)
```

## Quality Checklist

- [ ] TypeScript types defined for all props
- [ ] Component exported from barrel `index.ts`
- [ ] Tailwind utility classes used (no inline styles unless using token values)
- [ ] Focus-visible ring applied to all interactive elements
- [ ] Responsive behaviour verified (mobile-first)
- [ ] `docs/design-system.md` updated if API changed

## Reference

- [`frontend/src/design-system/README.md`](../../frontend/src/design-system/README.md)
- [`docs/design-system.md`](../../docs/design-system.md)
- [`phases/step-6.md`](../../phases/step-6.md)
