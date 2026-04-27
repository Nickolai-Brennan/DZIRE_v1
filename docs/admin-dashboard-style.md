# Admin Dashboard Style Guide — DZIRE

## Overview

This guide defines the visual and interaction standards for the DZIRE admin dashboard, ensuring a consistent, information-dense, and accessible experience for content editors, marketers, and platform administrators.

---

## 1. Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│  [Sidebar 224px]  │  [Top Header bar 56px]          │
│                   ├────────────────────────────────  │
│  Logo             │  [KPI row — 4 StatCards]        │
│  ─────────────    │                                 │
│  Nav items        │  [Main chart / data area]       │
│  ─────────────    │                                 │
│  Logout           │  [Data tables + action panels]  │
└─────────────────────────────────────────────────────┘
```

### Layout Rules

- **Sidebar:** 224px wide, `bg-surfaceAlt`, `border-r border-white/10`.
- **Top header:** 56px tall, `border-b border-white/10`, holds page title and quick actions.
- **Content area:** `p-8` padding, scrollable, `bg-background`.
- On mobile (< 1024px): sidebar collapses to an off-canvas drawer triggered by a hamburger button.

---

## 2. KPI / Stat Cards

Use the `StatCard` component from the design system for all top-level metrics.

- Display exactly **4 stat cards** in the primary KPI row.
- Use consistent card sizing: `flex-1 min-w-[160px]`.
- Always show a trend indicator (`trendDirection: 'up' | 'down'`) when historical data is available.
- Icon color: `text-primary` with `bg-primary/10` background pill.

**Example metrics:** Monthly Readers, New Subscribers, Revenue, Published Posts.

---

## 3. Navigation

- Active item: `bg-primary/20 text-primary font-medium`.
- Hover item: `hover:text-textPrimary hover:bg-white/5`.
- Icon size: 16px (`w-4 h-4`), `text-current`.
- Label: `text-sm`, truncated with `truncate` if too long.
- Logout button: bottom of sidebar, `text-textMuted`, separated by `border-t`.

---

## 4. Data Tables

Use the `DataTable` component.

- Enable `striped` on tables with > 10 rows.
- Column headers: `text-xs uppercase tracking-wider text-textMuted`.
- Row hover: `hover:bg-white/[0.04]`.
- Right-align numeric columns (`align: 'right'`).
- Provide an `emptyState` node for zero-data states.
- Pagination controls: right-aligned below the table.

### Status Badges in Tables

| Status | Badge Variant | Label |
|--------|--------------|-------|
| Published | `success` | Published |
| Draft | `warning` | Draft |
| Scheduled | `info` | Scheduled |
| Archived | `default` | Archived |
| Error | `danger` | Error |

---

## 5. Form Patterns

- Use `FormField` with `hint` for all non-obvious fields.
- Group related fields in `Card > CardBody` sections.
- Primary submit button: `variant="primary"`, right-aligned.
- Destructive actions: `variant="danger"`, left-aligned or separated by whitespace.
- Use `loading={true}` on buttons during async operations.

---

## 6. Charts

Use **Recharts** (already a project dependency).

- Chart backgrounds: transparent (inherits `bg-background`).
- Grid lines: `rgba(255,255,255,0.08)`.
- Primary data series: `#E11D48` (primary).
- Secondary data series: `#06B6D4` (secondary teal).
- Accent data series: `#F5C451` (gold).
- Tooltip: dark background `#15151C`, `border border-white/10`, `rounded-xl`.
- Chart panels wrapped in `Card variant="default"` with a `CardHeader` for the title.

---

## 7. Filters & Search

- Search bar: full `inputBaseClasses` styling, 280px min-width.
- Filter chips: `Badge variant="default"` with `×` dismiss button.
- Date range picker: aligned to the right of the filter row.
- Apply / Reset: `Button variant="secondary" size="sm"`.

---

## 8. Destructive Action Pattern

1. Show a `variant="danger"` `Button`.
2. On click, open a `Modal` (size `sm`) with a confirmation prompt.
3. Modal footer: `Cancel` (`variant="outline"`) + `Confirm Delete` (`variant="danger"`).
4. Never allow accidental destructive actions without a confirmation step.

---

## 9. Spacing & Density

- Compact spacing for data-heavy screens: `gap-4`, `px-4 py-3` on table cells.
- Section gaps: `gap-6` between major sections.
- KPI row: `grid grid-cols-2 lg:grid-cols-4 gap-4`.
- Page title: `text-xl font-semibold text-textPrimary`.

---

## 10. Accessibility

- All form inputs labeled with `<label>` (via `FormField`).
- Table headers use `scope="col"`.
- Focus indicators visible on all interactive elements.
- Sidebar navigation items are `<a>` / `<Link>` elements, not `<div>` onClick.
- Modal uses `role="dialog"`, `aria-modal`, `aria-labelledby`.

---

_Last updated: Step 6 implementation_
