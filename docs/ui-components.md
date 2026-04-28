# DZIRE UI Components Reference

All components live in `frontend/src/design-system/components/`.

---

## Button

**Variants:** `primary` · `secondary` · `accent` · `ghost` · `outline` · `danger` · `vip` · `sponsor`  
**Sizes:** `sm` · `md` · `lg`

Usage rules:
- `primary` — main conversion action (Subscribe, Publish, Save)
- `accent` — promotional action (Explore, Learn More)
- `vip` — subscription/membership actions
- `sponsor` — sponsor/affiliate CTAs
- `danger` — destructive actions only (Delete, Remove)
- `ghost` — secondary navigation, inline actions
- `outline` — lower-priority actions alongside a primary

Accessibility:
- Default `type="button"` prevents accidental form submit.
- `disabled` prop adds `opacity-50` and `cursor-not-allowed`.
- Visible focus ring via `focus-visible:ring-2`.

---

## Card

A surface container for grouping related content.

Props: `hover`, `glow` (primary/gold/vip), `padding` (none/sm/md/lg)

Variants in practice:
- **Article Card** — `hover` + image + metadata
- **Stat Card** — use the `StatCard` component instead
- **VIP Card** — `glow="vip"`
- **Sponsor Card** — `glow="gold"`

---

## Badge

Inline status/label chip with 10 variants.

| Variant   | Color          | Use                           |
|-----------|----------------|-------------------------------|
| default   | Gray           | General labels                |
| primary   | Rose           | Active state, highlight       |
| category  | Rose           | Content category              |
| success   | Green          | Published, completed, live    |
| warning   | Amber          | Draft, pending, review needed |
| danger    | Red            | Error, blocked, failed        |
| info      | Blue           | Note, informational           |
| vip       | Purple         | VIP member content            |
| sponsor   | Amber-yellow   | Sponsored content             |
| gold      | Gold           | Trophy, award, top performer  |

---

## Modal

Full-screen overlay dialog with escape-to-close.

Props: `isOpen`, `onClose`, `title?`, `size` (sm/md/lg/xl)

Accessibility: `role="dialog"`, `aria-modal="true"`, `aria-label`, focus trap not included (add via `focus-trap-react` if required).

---

## Tabs

Horizontal tab navigation with ARIA support.

Props: `tabs` (array of `{ id, label, content }`), `defaultTab?`

Each tab has `role="tab"`, `aria-selected`, and its panel has `role="tabpanel"` with matching `aria-labelledby`.

---

## Table / DataTable

`Table` — generic typed data table.  
`DataTable` — `Table` with an empty-state fallback.

```ts
columns: Array<{ key: keyof T; header: string; render?: (value, row) => ReactNode }>
```

Use `DataTable` for all data-heavy admin pages. Use `Table` directly when you handle empty state yourself.

---

## StatCard

KPI metric card with optional trend indicator.

Props: `label`, `value`, `trend?` (number, % change), `trendLabel?`, `icon?`

Use in 2-col or 4-col `DashboardLayout.kpiRow` grids.

---

## ChartCard

Container for chart visualizations.

Props: `title`, `subtitle?`, `action?` (e.g., export button), `children`

Wrap any Recharts or other chart component in `ChartCard`.

---

## FormField

Unified form input with label, validation, and hint text.

Input types: `text` · `email` · `password` · `number` · `url` · `tel` · `search` · `textarea`

- Pass `error` to show red border + error message (`role="alert"`).
- Pass `hint` for instructional text shown when no error.
- `required` adds a `*` marker beside the label.

---

## SearchBar

Search input with prepended search icon.

Use at the top of lists, data tables, and content feeds. Wire `value` + `onChange` directly to a filter state.

---

## FilterPanel

Multi-group filter UI with clear-all.

Props: `groups` (array of filter groups with options), `selected` (Record of group→selected values), `onChange`, `onClear?`

Place in a sidebar or drawer on data-heavy pages.

---

## EmptyState

Zero-state display for lists and dashboards.

Props: `title`, `description?`, `action?` (CTA button), `icon?`

Use when a query returns 0 results, or when a section has no data yet.

---

## Existing UI Components

The following components also exist in `frontend/src/components/ui/` and are used directly by app pages.  
Prefer the design-system versions for new work; the existing ones remain for backward compatibility.

| Existing component | Design-system equivalent |
|--------------------|--------------------------|
| `Button.tsx`       | `design-system/components/Button.tsx` (more variants) |
| `Card.tsx`         | `design-system/components/Card.tsx` (more options)     |
| `Badge.tsx`        | `design-system/components/Badge.tsx` (more variants)   |
| `Modal.tsx`        | `design-system/components/Modal.tsx` (size prop added) |
| `SearchBar.tsx`    | `design-system/components/SearchBar.tsx`               |
| `EmptyState.tsx`   | `design-system/components/EmptyState.tsx` (icon prop)  |
