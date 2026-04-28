# DZIRE Admin Dashboard Style Guide

## Layout Structure

Every admin page uses the `AdminLayout` shell:

```
┌──────────────┬────────────────────────────────────┐
│   Sidebar    │ Header (title + page actions)       │
│  (w-56)      ├────────────────────────────────────┤
│              │  KPI Row (4-col stat cards)         │
│  Navigation  ├────────────────────────────────────┤
│  + Logout    │  Main content (charts, tables, etc) │
└──────────────┴────────────────────────────────────┘
```

Use `DashboardLayout` inside the AdminLayout's `children` for pages with KPI rows.

---

## Typography

| Element          | Style                                |
|------------------|--------------------------------------|
| Page title       | `text-xl font-semibold text-textPrimary` |
| Section heading  | `text-base font-semibold text-textPrimary` |
| KPI label        | `text-sm text-textMuted`             |
| KPI value        | `text-3xl font-bold text-textPrimary` |
| Table header     | `text-xs uppercase tracking-wider text-textMuted` |
| Table cell       | `text-sm text-textPrimary`           |
| Nav item active  | `text-primary font-medium`           |
| Nav item default | `text-textMuted`                     |

---

## Spacing

| Element               | Spacing             |
|-----------------------|---------------------|
| Sidebar width         | 224px (w-56)        |
| Page padding          | 32px (p-8)          |
| Header padding        | `px-8 py-5`         |
| Card padding          | `p-6`               |
| KPI grid gap          | `gap-4`             |
| Section gap           | `gap-6`             |
| Table row padding     | `px-4 py-3`         |

---

## Components

| Component    | Source                                          | Notes                             |
|--------------|-------------------------------------------------|-----------------------------------|
| AdminLayout  | `frontend/src/admin/AdminLayout.tsx`            | Existing app layout               |
| StatCard     | `design-system/components/StatCard.tsx`         | KPI cards                         |
| ChartCard    | `design-system/components/ChartCard.tsx`        | Chart wrappers                    |
| DataTable    | `design-system/components/DataTable.tsx`        | All data tables                   |
| Badge        | `design-system/components/Badge.tsx`            | Status indicators                 |
| FilterPanel  | `design-system/components/FilterPanel.tsx`      | Filter sidebars                   |
| SearchBar    | `design-system/components/SearchBar.tsx`        | Table search inputs                |
| Button       | `design-system/components/Button.tsx`           | Actions                           |

---

## KPI Cards

Use `StatCard` in a 4-column grid for dashboard overview pages:

```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
  <StatCard label="Total Views" value="124,500" trend={12.4} trendLabel="vs last month" />
  <StatCard label="Newsletter Subs" value="8,420" trend={3.1} />
  <StatCard label="VIP Members" value="1,240" trend={-2.3} />
  <StatCard label="Ad Revenue" value="$18,500" trend={22.7} />
</div>
```

---

## Status Colors

| Status      | Color class          | Hex       |
|-------------|----------------------|-----------|
| Published   | `text-green-400`     | `#4ade80` |
| Draft       | `text-yellow-400`    | `#facc15` |
| Scheduled   | `text-blue-400`      | `#60a5fa` |
| Archived    | `text-textMuted`     | `#A1A1AA` |
| Error       | `text-red-400`       | `#f87171` |
| VIP-only    | `text-purple-300`    | `#d8b4fe` |
| Sponsored   | `text-yellow-300`    | `#fde047` |

Always use a `Badge` component — never raw colored text alone.

---

## Table Rules

1. Headers: uppercase, muted, small tracking.
2. Rows: hover state `hover:bg-white/3`.
3. Action columns: right-aligned, icon buttons.
4. Status columns: always use `Badge` component.
5. Destructive row actions (Delete): red color, separated from safe actions.
6. Always handle empty state with `DataTable`'s built-in empty state or `EmptyState` component.
7. Keep admin tables horizontally scrollable on small screens.

---

## Form Rules

1. Use `FormField` for all inputs — never raw `<input>` without label.
2. Group related fields in a `Card` with `padding="md"`.
3. Put primary actions (Save, Publish) at bottom-right.
4. Put destructive actions (Delete) at bottom-left, separated.
5. Show inline validation via `FormField`'s `error` prop.

---

## Filter / Search Pattern

```
[ SearchBar — full width ] [ Filter chips ] [ Sort dropdown ]
```

- SearchBar on the left.
- Filter chips or `FilterPanel` component.
- Sort dropdown on the right.
- Show result count: `"Showing X of Y"`.

---

## Admin Style Rules

- **Readability first** — compact but never cramped.
- **Consistent KPI card size** — same card height in a row.
- **Status colors must be consistent** — no ad-hoc color choices.
- **Destructive actions must be visually separated** — space, color, confirmation dialog.
- **All data tables must have search + filter** on pages with > 10 rows expected.
- **Charts** — use `ChartCard` wrapper for all chart visualizations.
- **Empty states** — always show an informative empty state, never blank whitespace.
