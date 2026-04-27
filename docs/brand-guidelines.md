# DZIRE Brand Guidelines

## Brand Foundation

**Platform Name:** DZIRE

**Positioning:** A modern digital content platform built for publishing, monetization, audience growth, analytics, and premium member experiences.

**Personality:**
- Bold
- Modern
- Clean & Editorial
- Data-aware
- Premium
- Trustworthy

**Brand Promise:** Deliver high-quality content, smarter discovery, premium experiences, and measurable growth for audiences, creators, sponsors, and partners.

---

## Logo System

All logo files live in `frontend/public/brand/`.

| Variant              | File                   | When to use                          |
|----------------------|------------------------|--------------------------------------|
| Primary Logo         | `logo-primary.svg`     | Default — dark backgrounds           |
| Horizontal Lockup    | `logo-horizontal.svg`  | Headers, email banners               |
| Icon Mark            | `logo-icon.svg`        | Small spaces, app icons, favicons    |
| Light Version        | `logo-light.svg`       | Light background contexts            |
| Dark Version         | `logo-dark.svg`        | White/light-mode contexts            |
| Favicon              | `favicon.svg`          | Browser tab                          |
| Watermark            | `watermark.svg`        | Branded thumbnails and media         |

### Logo Rules

1. Maintain a clear zone equal to the icon height on all sides.
2. Do **not** stretch, rotate, skew, or apply drop shadows.
3. Do **not** use on backgrounds with < 3:1 contrast ratio.
4. Use the icon mark for contexts narrower than 120 px.
5. Use the watermark only on media assets — never UI chrome.

---

## Color System

See `docs/design-system.md` for the full token reference.

| Role       | Token name      | Hex       | Use                                      |
|------------|-----------------|-----------|------------------------------------------|
| Background | `background`    | `#09090B` | Page background                          |
| Surface    | `surface`       | `#15151C` | Cards, panels, modals                    |
| Surface Alt| `surfaceAlt`    | `#1D1D26` | Sidebar, hover states, secondary panels  |
| Primary    | `primary`       | `#E11D48` | CTAs, active states, links               |
| Accent     | `accent`        | `#F43F5E` | Hover states, highlights                 |
| Gold       | `gold`          | `#F5C451` | Trophy, premium actions, sponsor CTAs    |
| Text       | `textPrimary`   | `#F8FAFC` | Body text, headings                      |
| Muted      | `textMuted`     | `#A1A1AA` | Secondary text, placeholders             |
| VIP        | `vip`           | `#C084FC` | VIP subscription elements                |
| Sponsor    | `sponsor`       | `#FACC15` | Sponsor/affiliate highlights             |
| Success    | —               | `#16A34A` | Positive states                          |
| Warning    | —               | `#F59E0B` | Attention states                         |
| Danger     | —               | `#DC2626` | Errors, destructive actions              |
| Info       | —               | `#2563EB` | Notices, helper states                   |

### Color Rules

- Never use color as the *only* indicator of status — pair with an icon or label.
- Maintain a minimum 4.5:1 contrast ratio for body text (WCAG AA).
- Keep CTAs in `primary` or `gold`; use `danger` only for destructive actions.

---

## Typography

| Role    | Font              | Use                                  |
|---------|-------------------|--------------------------------------|
| Display | Barlow Condensed  | Hero titles, campaign headlines      |
| Body    | Inter             | Articles, UI, dashboard              |
| Mono    | JetBrains Mono    | Code, IDs, metrics, log output       |

### Type Scale

| Step  | Size  | Typical use               |
|-------|-------|---------------------------|
| xs    | 12px  | Labels, micro copy        |
| sm    | 14px  | Secondary text, captions  |
| base  | 16px  | Body copy                 |
| lg    | 18px  | Lead / intro text         |
| xl    | 20px  | Sub-headers               |
| 2xl   | 24px  | Section titles            |
| 3xl   | 30px  | Page titles               |
| 4xl   | 36px  | Hero subtitles            |
| 5xl   | 48px  | Hero headlines            |
| 6xl   | 60px  | Campaign / display text   |

### Rules

- Use Inter for all UI text.
- Use Barlow Condensed only for display/marketing headlines.
- Use JetBrains Mono for code, IDs, and numeric metrics.
- Never use more than 2 type sizes within a single card or panel.

---

## Spacing

| Token | Value | Common use                      |
|-------|-------|---------------------------------|
| xs    | 4px   | Icon gaps, tight labels         |
| sm    | 8px   | List item padding, tag gaps     |
| md    | 16px  | Card padding (compact)          |
| lg    | 24px  | Card padding (standard)         |
| xl    | 32px  | Section padding                 |
| 2xl   | 48px  | Section gaps, hero padding      |
| 3xl   | 64px  | Page-level section spacing      |

---

## Brand Personality in UI

| Trait       | UI Expression                                        |
|-------------|------------------------------------------------------|
| Bold        | Large headings, strong CTAs, high-contrast buttons   |
| Modern      | Dark surfaces, glassmorphism hints, crisp borders    |
| Clean       | Ample whitespace, consistent alignment               |
| Editorial   | Magazine-style grid, strong typography hierarchy     |
| Data-aware  | Clear stat cards, trend indicators, concise labels   |
| Premium     | Gold accents, subtle glows, VIP differentiation      |
| Trustworthy | Clear disclosures, consistent labels, readable text  |

---

## What Not to Do

- Don't use light backgrounds unless explicitly providing a light-mode alternative.
- Don't mix more than 3 accent colors on a single page.
- Don't use `danger` color for anything that isn't destructive.
- Don't omit alt text from images.
- Don't use all-caps for body text (only for micro labels/badges).
