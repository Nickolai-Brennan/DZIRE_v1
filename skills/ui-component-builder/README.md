---
name: ui-component-builder
description: Create and maintain reusable React UI components in the DZIRE design system. Use when building buttons, cards, forms, tables, modals, or any UI primitive.
category: build
version: v1.0
inputs:
  - user request
  - existing design-system components
  - design tokens
outputs:
  - New React component .tsx file
  - Updated components/index.ts barrel
  - Updated docs/ui-components.md
---

# UI Component Builder Skill

## Purpose

Create accessible, typed, Tailwind-styled React components for the DZIRE design system.

## When To Use

Use this skill when the user asks to:
- Build a new UI primitive (button, input, badge, card, etc.)
- Add a new variant to an existing component
- Fix an accessibility issue in a component
- Add a new prop/feature to an existing component

## Stack

- React 19 (functional components + hooks)
- TypeScript strict mode
- Tailwind CSS v4 utility classes
- Lucide React for icons

## Inputs

- User request (component name and requirements)
- `frontend/src/design-system/components/` — existing components for pattern reference
- `frontend/src/design-system/tokens/` — available design tokens
- `frontend/src/index.css` — Tailwind theme (`@theme` block)

## Workflow

1. Review existing similar components for pattern consistency.
2. Create the component in `frontend/src/design-system/components/[Name].tsx`.
3. Define TypeScript interface for all props.
4. Style with Tailwind utility classes matching the existing palette.
5. Add accessibility attributes (ARIA roles, `type`, `aria-label` etc.).
6. Export the component from `frontend/src/design-system/components/index.ts`.
7. Run `cd frontend && npx tsc -b --noEmit` to verify.
8. Add a row in the component table in `docs/ui-components.md`.

## Component Template

```tsx
import React from 'react';

interface [Name]Props {
  // required props
  children?: React.ReactNode;
  className?: string;
}

export const [Name]: React.FC<[Name]Props> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`/* base classes */ ${className}`}>
      {children}
    </div>
  );
};
```

## Accessibility Checklist

- [ ] Buttons have `type="button"` (or `submit` / `reset` explicitly)
- [ ] Interactive elements have visible focus rings
- [ ] Disabled state visually communicated
- [ ] Modal has `role="dialog"` and `aria-modal`
- [ ] Tabs use `role="tab"` / `role="tabpanel"` / `aria-selected`
- [ ] Form inputs linked to labels via `id` / `htmlFor`
- [ ] Error messages use `role="alert"`

## Quality Checklist

- [ ] TypeScript compiles without errors
- [ ] No unused imports or parameters
- [ ] `className` passthrough included
- [ ] Exported from `components/index.ts`
- [ ] Documented in `docs/ui-components.md`

## References

- [`docs/ui-components.md`](../../docs/ui-components.md)
- [`frontend/src/design-system/components/`](../../frontend/src/design-system/components/)
- [`frontend/src/components/ui/`](../../frontend/src/components/ui/)
