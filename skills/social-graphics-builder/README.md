---
name: social-graphics-builder
description: Create specifications and design templates for DZIRE social media graphics. Use when defining social graphic standards, canvas sizes, or content templates.
category: documentation
version: v1.0
inputs:
  - user request
  - docs/social-media-style-guide.md
  - docs/brand-guidelines.md
outputs:
  - Updated social media style guide
  - Graphic specification tables
  - Caption and hashtag templates
---

# Social Graphics Builder Skill

## Purpose

Define and maintain the DZIRE social media graphic standards — dimensions, color usage, typography, CTA rules, and content templates for each platform.

## When To Use

Use this skill when the user asks to:
- Define graphic templates for Instagram, X, TikTok, YouTube, or Facebook
- Update platform dimension requirements
- Create caption/hashtag templates
- Define sponsored or VIP social graphic rules
- Update social media style guidelines

## Inputs

- User request (platform, graphic type, content)
- `docs/social-media-style-guide.md` — current social standards
- `docs/brand-guidelines.md` — brand color, type, and logo rules
- `frontend/public/brand/` — logo asset reference

## Workflow

1. Identify the platform and graphic type.
2. Look up current dimensions and rules in `docs/social-media-style-guide.md`.
3. Define or update the template specification (dimensions, zones, colors, fonts).
4. Document the template in `docs/social-media-style-guide.md`.
5. Provide a caption template if appropriate.

## Graphic Spec Template

```markdown
### [Graphic Type] — [Platform]

**Dimensions:** [W × H px]
**Format:** [PNG / JPEG]
**Background:** [Color / Image + overlay]
**Headline:** [Font, size, weight, color]
**Body copy:** [Font, size, color]
**Logo:** [Position, size]
**CTA:** [Button / text, position]
**Disclosure:** [Sponsored label if needed]
**Safe zones:** [Margins to stay within]
```

## Platform Dimension Reference

| Platform             | Format          | Dimensions    |
|----------------------|-----------------|---------------|
| Instagram Post       | Square          | 1080 × 1080   |
| Instagram Story      | Vertical        | 1080 × 1920   |
| X / Twitter Post     | Landscape       | 1600 × 900    |
| Facebook Post        | Landscape       | 1200 × 630    |
| YouTube Thumbnail    | Landscape       | 1280 × 720    |
| TikTok Cover         | Vertical        | 1080 × 1920   |

## Quality Checklist

- [ ] Logo watermark included at correct position and size
- [ ] One CTA per graphic
- [ ] Brand colors only (no off-brand colors)
- [ ] Sponsored content has disclosure label
- [ ] Text meets 4.5:1 contrast minimum
- [ ] Dimensions documented correctly

## References

- [`docs/social-media-style-guide.md`](../../docs/social-media-style-guide.md)
- [`docs/brand-guidelines.md`](../../docs/brand-guidelines.md)
- [`frontend/public/brand/README.md`](../../frontend/public/brand/README.md)
