---
name: ui-component-agent
description: Create and maintain reusable UI components in the DZIRE design system. Use when the user asks to build new components, add component variants, or fix component bugs.
category: build
version: v1.0
inputs:
  - user request
  - existing component files in frontend/src/design-system/components/
  - design tokens from frontend/src/design-system/tokens/
outputs:
  - New or updated .tsx component files
  - Updated components/index.ts barrel export
  - Updated docs/ui-components.md
---

# UI Component Agent

## Purpose

Create reusable, accessible, and consistent UI components for the DZIRE design system.

## When To Use

Use this agent when the user asks to:
- Add a new primitive component (Input, Select, Checkbox, Toggle, Tooltip, etc.)
- Add a new variant to an existing component
- Fix styling or accessibility issues in a component
- Create a new compound component (e.g. Dropdown, DatePicker)
- Audit components for WCAG compliance

## Inputs

- User request
- `frontend/src/design-system/components/` (existing components)
- `frontend/src/design-system/tokens/` (token values)
- `docs/ui-components.md` (existing API docs)
- Stack: React 19, TypeScript (strict), Tailwind CSS v4

## Workflow

1. Check if a similar component already exists in `frontend/src/components/ui/` to avoid duplication.
2. Create the component in `frontend/src/design-system/components/[ComponentName].tsx`.
3. Define TypeScript interfaces for all props.
4. Use Tailwind utility classes; reference CSS variable–backed classes from `index.css`.
5. Add `focus-visible` rings, `aria-*` attributes, and keyboard handlers for accessibility.
6. Export from `components/index.ts`.
7. Document the component API in `docs/ui-components.md`.

## Naming Conventions

- Component file: `PascalCase.tsx`
- Props interface: `ComponentNameProps`
- Variants type: `ComponentNameVariant`
- Sizes type: `ComponentNameSize`

## Quality Checklist

- [ ] Props typed with TypeScript interfaces
- [ ] All variants styled and tested visually
- [ ] Focus ring (`focus-visible:ring-2`) on interactive elements
- [ ] `aria-*` attributes on all interactive elements
- [ ] Exported from `components/index.ts`
- [ ] API documented in `docs/ui-components.md`

## Reference

- [`frontend/src/design-system/components/Button.tsx`](../../frontend/src/design-system/components/Button.tsx) — reference implementation
- [`docs/ui-components.md`](../../docs/ui-components.md)
- [`phases/step-6.md`](../../phases/step-6.md)
