---
name: design-system-builder
description: Scaffold, build, and extend the DZIRE design system. Use when the user asks to create tokens, components, layouts, or patterns.
category: build
version: v1.0
inputs:
  - user request
  - existing design-system structure
  - brand palette and typography specs
outputs:
  - Token files
  - Component files
  - Layout files
  - Pattern files
  - Barrel index.ts exports
---

# Design System Builder Skill

## Purpose

Build and extend the centralized DZIRE design system, from raw token definitions to composed UI patterns.

## When To Use

Use this skill when the user asks to:
- Scaffold the full `frontend/src/design-system/` folder structure
- Add a new token category
- Create a new UI component, layout, or pattern
- Update existing tokens or components to match new brand specs
- Export new components from barrel files

## Inputs

- User request
- `frontend/src/design-system/` structure (current state)
- `frontend/src/index.css` (Tailwind theme variables)
- `phases/step-6.md` (specification)
- Stack: React 19, Vite, TypeScript, Tailwind CSS v4

## Workflow

1. Identify target sub-folder: `tokens/`, `components/`, `layouts/`, or `patterns/`.
2. Create or update the `.ts` / `.tsx` file.
3. Follow the existing prop/variant/export pattern.
4. Update the sub-folder `index.ts` barrel export.
5. Run `npm run build` inside `frontend/` to verify compilation.
6. Update `docs/design-system.md` if the public API changes.

## Output Format

```
frontend/src/design-system/
├── tokens/[token].ts + index.ts
├── components/[Component].tsx + index.ts
├── layouts/[Layout].tsx + index.ts
└── patterns/[Pattern].tsx + index.ts
```

## Quality Checklist

- [ ] TypeScript types for all props and exports
- [ ] Tailwind utility classes only (no inline styles)
- [ ] `focus-visible` ring on interactive elements
- [ ] Barrel export updated
- [ ] Build passes without TypeScript errors

## Reference

- [`frontend/src/design-system/README.md`](../../frontend/src/design-system/README.md)
- [`docs/design-system.md`](../../docs/design-system.md)
- [`phases/step-6.md`](../../phases/step-6.md)
- [`.github/agents/design-system-agent.md`](../../.github/agents/design-system-agent.md)
