# Brand Guidelines — DZIRE

## 1. Brand Foundation

**Brand Name:** DZIRE

**Positioning:** A modern digital content platform built for publishing, monetization, audience growth, analytics, and premium member experiences.

**Personality:**
- Bold
- Modern
- Editorial
- Data-aware
- Premium
- Trustworthy

**Brand Promise:** Deliver high-quality content, smarter discovery, premium experiences, and measurable growth for audiences, creators, sponsors, and partners.

---

## 2. Logo System

### Logo Variants

| Variant | Usage |
|---------|-------|
| Primary Logo | Official materials, headers, print |
| Horizontal Logo | Banners, toolbars, wide containers |
| Icon Mark | Favicons, avatars, small spaces |
| Light Version | Light-mode / white background materials |
| Dark Version | Default; dark-mode UI |
| Social Avatar | Profile pictures, 1:1 crop |
| Favicon | Browser tab, 32×32 |
| Watermark | Branded media overlays |

### Logo Rules

- Maintain clear space equal to the icon height on all four sides.
- Do not stretch, rotate, skew, or add drop shadows to the logo.
- Do not place the logo on low-contrast backgrounds (minimum 4.5:1 ratio).
- Use the icon mark when the available space is less than 120 px wide.
- Never use unapproved color variations.

### Logo Files

```
frontend/public/brand/
├── logo-primary.svg
├── logo-horizontal.svg
├── logo-icon.svg
├── logo-light.svg
├── logo-dark.svg
├── favicon.svg
└── watermark.svg
```

---

## 3. Color System

### Brand Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#09090B` | Page backgrounds |
| Surface | `#15151C` | Cards, panels |
| Surface Alt | `#1D1D26` | Elevated surfaces, sidebar |
| Primary | `#E11D48` | Main CTAs, active states |
| Accent | `#F43F5E` | Hover states, highlights |
| Gold | `#F5C451` | Trophy, awards, rankings |
| Text Primary | `#F8FAFC` | Main body text |
| Text Muted | `#A1A1AA` | Secondary text, labels |

### Semantic Colors

| Role | Hex | Usage |
|------|-----|-------|
| Success | `#16A34A` | Positive states, published |
| Warning | `#F59E0B` | Attention, draft |
| Danger | `#DC2626` | Errors, destructive actions |
| Info | `#2563EB` | Notices, tooltips |
| VIP | `#C084FC` | Premium subscription elements |
| Sponsor | `#FACC15` | Sponsor/affiliate highlights |

### Color Rules

- Always maintain WCAG AA contrast (4.5:1 for normal text, 3:1 for large text).
- Never use color alone to convey state — pair with icons or text.
- Keep destructive actions (danger red) visually separated from primary CTAs.
- VIP elements use purple tones; sponsor elements use amber/gold tones.

---

## 4. Typography

### Font Roles

| Role | Font | Usage |
|------|------|-------|
| Display | Barlow Condensed | Hero titles, section headings, editorial headlines |
| Body | Inter | UI text, articles, dashboard content |
| Mono | JetBrains Mono | Code, IDs, metrics, log outputs |

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| xs | 12px | Labels, captions |
| sm | 14px | Helper text, metadata |
| base | 16px | Body copy |
| lg | 18px | Lead paragraphs |
| xl | 20px | Subheadings |
| 2xl | 24px | Section titles |
| 3xl | 30px | Page headings |
| 4xl | 36px | Hero subheadings |
| 5xl | 48px | Hero headlines |
| 6xl | 60px | Campaign-scale headlines |

### Typography Rules

- Headlines use **Barlow Condensed Bold** (weight 700+).
- Body text uses **Inter Regular** (weight 400), line-height 1.5–1.625.
- Code uses **JetBrains Mono** on a dark surface background.
- Avoid tracking (letter-spacing) on body text; use `wider` only for uppercase labels.
- Keep article line length between 60–75 characters for readability.

---

## 5. Spacing & Layout

- Base unit: **4px**.
- Consistent 8pt grid (spacing values divisible by 8 for major layout decisions).
- Cards: `p-5` or `p-6` (20–24px) internal padding.
- Section gaps: `gap-6` to `gap-10` (24–40px).
- Page sections: `py-16` to `py-24` (64–96px) vertical padding.

---

## 6. Iconography

- Use **Lucide React** icons (already a project dependency).
- Icon sizes: 16px (inline), 20px (UI), 24px (prominent), 32px (featured).
- Pair icons with text labels wherever space allows.
- Use `aria-hidden="true"` on decorative icons; provide `aria-label` on standalone icon buttons.

---

## 7. Voice & Tone

- **Direct** — say what you mean, no jargon.
- **Confident** — authoritative but not arrogant.
- **Inclusive** — respectful to all audiences.
- **Concise** — respect users' time.
- Avoid passive voice in CTAs; use action verbs ("Get Started", "Explore", "Subscribe").

---

## 8. Accessibility

- WCAG 2.1 AA minimum across all surfaces.
- All images require meaningful `alt` text.
- Keyboard navigation must be fully functional.
- Focus indicators must be visible and meet contrast requirements.
- Error messages must be tied to form fields via `aria-describedby`.

---

_Last updated: Step 6 implementation_
