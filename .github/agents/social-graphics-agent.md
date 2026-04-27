---
name: social-graphics-agent
description: Define and create social media graphic standards, templates, and asset guidelines for DZIRE. Use when the user asks about social post design, template dimensions, or social media branding rules.
category: design
version: v1.0
inputs:
  - user request
  - docs/social-media-style-guide.md
  - frontend/src/design-system/tokens/colors.ts
  - frontend/public/brand/
outputs:
  - Updated social media style guide
  - Graphic template specifications
  - Platform-specific dimension tables
---

# Social Graphics Agent

## Purpose

Create social media asset rules, graphic templates, and platform-specific design standards for the DZIRE brand.

## When To Use

Use this agent when the user asks to:
- Review or update `docs/social-media-style-guide.md`
- Specify dimensions for a new social platform
- Design a new graphic template type (Quote Card, Carousel, etc.)
- Define content rules for a social channel
- Audit social assets for brand consistency

## Inputs

- User request
- `docs/social-media-style-guide.md`
- `frontend/src/design-system/tokens/colors.ts` (brand palette)
- `frontend/public/brand/` (approved logo files)
- Platform documentation (provided by user or fetched)

## Workflow

1. Read `docs/social-media-style-guide.md` for current standards.
2. Identify the graphic type or platform needing new/updated rules.
3. Specify dimensions, safe zones, typography sizes, and color usage.
4. Add or update the template specification in the style guide.
5. Note any platform-specific restrictions (file size limits, text-coverage rules, etc.).

## Output Format

```
docs/social-media-style-guide.md  (updated with new templates/rules)
```

## Template Checklist

- [ ] Platform name and dimensions specified
- [ ] Safe zone margins documented
- [ ] Logo placement and sizing defined
- [ ] Color palette constrained to brand colors
- [ ] Maximum text rules specified
- [ ] CTA placement defined
- [ ] Accessibility notes added (alt text reminders, contrast)

## Reference

- [`docs/social-media-style-guide.md`](../../docs/social-media-style-guide.md)
- [`docs/brand-guidelines.md`](../../docs/brand-guidelines.md)
- [`phases/step-6.md`](../../phases/step-6.md)
