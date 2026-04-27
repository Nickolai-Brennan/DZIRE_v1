---
name: ui-component-builder
description: Create and extend reusable UI components in the DZIRE design system. Use when the user asks to build components like inputs, selects, tooltips, drawers, tabs, or any other primitive UI element.
category: build
version: v1.0
inputs:
  - user request
  - existing components in frontend/src/design-system/components/
  - design token values
outputs:
  - New .tsx component file
  - Updated components/index.ts
  - Updated docs/ui-components.md entry
---

# UI Component Builder Skill

## Purpose

Create accessible, type-safe, and consistently styled UI components for the DZIRE design system.

## When To Use

Use this skill when the user asks to:
- Add a missing primitive (Input, Textarea, Select, Checkbox, Toggle, Tooltip, Drawer, Tabs, Pagination, etc.)
- Add a new variant to an existing component
- Fix a bug or accessibility issue in an existing component
- Create a compound component from primitives

## Inputs

- User request
- `frontend/src/design-system/components/` (existing components for pattern reference)
- `frontend/src/design-system/tokens/` (token values)
- `docs/ui-components.md`

## Workflow

1. Check `frontend/src/components/ui/` for an existing similar component to avoid duplication.
2. Use `Button.tsx` as a reference for structure, typing, and export pattern.
3. Define a `[Name]Props` interface with all props typed.
4. Build variants as a `Record<VariantType, string>` object for Tailwind classes.
5. Add `focus-visible:ring-2 focus-visible:ring-offset-2` on all interactive elements.
6. Add appropriate `aria-*` attributes and keyboard handlers.
7. Export from `components/index.ts`.
8. Add an entry in `docs/ui-components.md`.

## Component Template

```tsx
import React from 'react';

export type ExampleVariant = 'default' | 'primary';
export interface ExampleProps {
  variant?: ExampleVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ExampleVariant, string> = {
  default: 'bg-surface text-textPrimary border border-white/10',
  primary: 'bg-primary text-white',
};

export const Example: React.FC<ExampleProps> = ({
  variant = 'default',
  children,
  className = '',
}) => (
  <div className={`rounded-xl ${variantClasses[variant]} ${className}`}>
    {children}
  </div>
);
```

## Quality Checklist

- [ ] Props interface defined
- [ ] All variants implemented
- [ ] Accessible (focus, aria, keyboard)
- [ ] Exported from `index.ts`
- [ ] Documented in `docs/ui-components.md`

## Reference

- [`frontend/src/design-system/components/Button.tsx`](../../frontend/src/design-system/components/Button.tsx)
- [`docs/ui-components.md`](../../docs/ui-components.md)
- [`.github/agents/ui-component-agent.md`](../../.github/agents/ui-component-agent.md)
