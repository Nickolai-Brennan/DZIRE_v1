# UI Components Reference — DZIRE

Complete API reference for all design-system components.

---

## Button

**Import:** `import { Button } from '@/design-system/components';`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline' \| 'danger' \| 'vip' \| 'sponsor'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `block` | `boolean` | `false` | Full-width block |
| `loading` | `boolean` | `false` | Spinner + disabled |
| `leftIcon` | `ReactNode` | `undefined` | Icon before label |
| `rightIcon` | `ReactNode` | `undefined` | Icon after label |

Inherits all native `<button>` attributes.

### Variant Usage

| Variant | When to use |
|---------|-------------|
| `primary` | Main page action |
| `secondary` | Supporting action |
| `accent` | Promotional, high-attention CTA |
| `ghost` | Low-emphasis navigation |
| `outline` | Lower-priority action alongside a primary |
| `danger` | Destructive action (delete, revoke) |
| `vip` | Subscription / upgrade action |
| `sponsor` | Sponsor/affiliate action |

---

## Card

**Import:** `import { Card, CardHeader, CardBody, CardFooter } from '@/design-system/components';`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'elevated' \| 'outline' \| 'vip' \| 'sponsor'` | `'default'` | Visual style |
| `interactive` | `boolean` | `false` | Adds hover + pointer + focus ring |
| `onClick` | `MouseEventHandler` | `undefined` | Click handler |

### Sub-components

- `CardHeader` — top section with bottom border
- `CardBody` — main content area with padding
- `CardFooter` — bottom section with top border

---

## Badge

**Import:** `import { Badge } from '@/design-system/components';`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | see below | `'default'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Size preset |

Variants: `default · category · success · warning · danger · info · vip · sponsor · trophy`

---

## FormField

**Import:** `import { FormField, inputBaseClasses } from '@/design-system/components';`

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✓ | Wired to `htmlFor` and child `id` |
| `label` | `string` | ✓ | Field label |
| `hint` | `string` | | Helper text |
| `error` | `string` | | Error message (shown in red) |
| `required` | `boolean` | | Shows `*` and `aria-required` |

### `inputBaseClasses`

Exported string of Tailwind classes for consistent `<input>`, `<textarea>`, `<select>` styling. Apply directly:

```tsx
<input className={inputBaseClasses} type="text" />
```

---

## Modal

**Import:** `import { Modal } from '@/design-system/components';`

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | ✓ | Controlled open state |
| `onClose` | `() => void` | ✓ | Called on Escape, backdrop click, or close button |
| `title` | `string` | | Optional header title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | | Max-width preset (`'md'` default) |
| `footer` | `ReactNode` | | Action buttons rendered in footer bar |

### Accessibility

- Uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Auto-focuses dialog on open.
- Locks body scroll.
- Closes on Escape keydown.

---

## DataTable

**Import:** `import { DataTable } from '@/design-system/components';`

Generic component typed `DataTable<T>`.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `columns` | `ColumnDef<T>[]` | ✓ | Column definitions |
| `data` | `T[]` | ✓ | Row data array |
| `rowKey` | `(row: T, idx: number) => string \| number` | ✓ | Unique key per row |
| `striped` | `boolean` | | Alternating row shading |
| `emptyState` | `ReactNode` | | Shown when `data` is empty |
| `caption` | `string` | | Screen-reader table caption |

### ColumnDef<T>

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Maps to `T` property or custom id |
| `header` | `ReactNode` | Column heading |
| `render` | `(row: T, idx: number) => ReactNode` | Custom cell renderer |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |
| `cellClassName` | `string` | Extra classes for `<td>` |

---

## StatCard

**Import:** `import { StatCard } from '@/design-system/components';`

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string \| number` | Main metric value |
| `label` | `string` | Metric name |
| `description` | `string` | Optional sub-label |
| `icon` | `ReactNode` | Optional icon (displayed in a colored pill) |
| `trend` | `string` | Trend text, e.g. `"+4.2%"` |
| `trendDirection` | `'up' \| 'down' \| 'neutral'` | Controls trend color + arrow |

---

_Last updated: Step 6 implementation_
