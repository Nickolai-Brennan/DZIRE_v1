---
name: social-graphics-builder
description: Define, document, and extend social media graphic templates and design rules for the DZIRE brand. Use when the user asks about social asset specs, post templates, or platform-specific design rules.
category: design
version: v1.0
inputs:
  - user request
  - docs/social-media-style-guide.md
  - brand color tokens
  - logo assets in frontend/public/brand/
outputs:
  - Updated docs/social-media-style-guide.md
  - New platform dimension entries
  - Graphic template specifications
---

# Social Graphics Builder Skill

## Purpose

Create and maintain social media graphic standards and templates for the DZIRE brand across all target platforms.

## When To Use

Use this skill when the user asks to:
- Add a new platform to the social media style guide
- Define a new graphic template type
- Update existing post dimensions or rules
- Create content guidelines for a specific channel (Instagram, TikTok, YouTube, etc.)
- Audit social assets against brand standards

## Inputs

- User request
- `docs/social-media-style-guide.md`
- `frontend/src/design-system/tokens/colors.ts` (brand palette)
- `frontend/public/brand/` (logo files)
- Platform technical specs (provided by user or found via web search)

## Workflow

1. Read `docs/social-media-style-guide.md`.
2. Identify the template or platform to add/update.
3. Specify: dimensions, safe zones, typography sizes, color constraints, logo placement, CTA rules.
4. Update the style guide document.
5. Add ASCII/text wireframes for new templates where helpful.
6. Note platform-specific restrictions (e.g., Facebook's 20% text rule).

## Template Spec Format

```markdown
### [Template Name] ([Width] × [Height])
- Background: [color or image rule]
- Logo: [position, size]
- Headline: [font, size, max characters]
- Sub-copy: [font, size, max lines]
- CTA: [button style, copy rule]
- Safe zone: [margin from edge]
```

## Quality Checklist

- [ ] Platform name and exact pixel dimensions
- [ ] Safe zone margins for all edges
- [ ] Logo placement, size, and minimum size rules
- [ ] Maximum text-coverage percentage (if platform restricts)
- [ ] Color palette limited to approved brand colors
- [ ] File format and max size recommendation

## Reference

- [`docs/social-media-style-guide.md`](../../docs/social-media-style-guide.md)
- [`docs/brand-guidelines.md`](../../docs/brand-guidelines.md)
- [`.github/agents/social-graphics-agent.md`](../../.github/agents/social-graphics-agent.md)
