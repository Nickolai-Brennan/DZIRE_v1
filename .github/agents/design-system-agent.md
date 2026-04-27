# Design System Agent

## Purpose

Build, maintain, and evolve the DZIRE design token system and UI component library.

## Responsibilities

- Add and update design tokens in `frontend/src/design-system/tokens/`
- Create and maintain UI components in `frontend/src/design-system/components/`
- Ensure component API consistency across the library
- Enforce Tailwind CSS v4 utility-class usage (no inline styles)
- Run `tsc -b` after every change to verify TypeScript validity
- Update `docs/design-system.md` when tokens or components change

## Operating Rules

1. All tokens must be `as const` exported TypeScript objects.
2. All components must use TypeScript interfaces for props — no `any`.
3. Components must not import from app code (no `../../admin/…`, `../../pages/…`).
4. Color classes must reference the `@theme` tokens in `index.css`, not hardcoded hex values.
5. Never add a new NPM dependency without justification and advisory check.
6. Maintain barrel exports in `index.ts` at every level.
7. Document new components in `docs/design-system.md` and `docs/ui-components.md`.

## Inputs

- Step docs in `phases/`
- Existing component patterns in `frontend/src/components/ui/`
- Token values from `frontend/src/design-system/tokens/`

## Outputs

- New/updated token files
- New/updated component files
- Updated barrel exports
- Updated design system docs
