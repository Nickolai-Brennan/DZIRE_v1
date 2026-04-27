# DZIRE Design System Reference

## Overview

The DZIRE design system lives in `frontend/src/design-system/` and provides:

- **Tokens** — typed design constants (colors, typography, spacing, etc.)
- **Components** — reusable UI primitives
- **Layouts** — page-structure shells
- **Patterns** — compound content sections

All styling uses **Tailwind CSS v4** utility classes. No additional CSS files are needed.

---

## Importing

```ts
// Single barrel (recommended)
import { Button, Card, colors, PublicLayout, HeroSection } from '../design-system';

// Or from sub-modules
import { Button } from '../design-system/components';
import { colors } from '../design-system/tokens';
import { PublicLayout } from '../design-system/layouts';
import { HeroSection } from '../design-system/patterns';
```

---

## Token Files

| File            | Export     | Description                              |
|-----------------|------------|------------------------------------------|
| `colors.ts`     | `colors`   | Full brand + semantic color map          |
| `typography.ts` | `typography` | Font families, scale, weights, leading |
| `spacing.ts`    | `spacing`  | 7-step spacing scale (4px–64px)          |
| `radii.ts`      | `radii`    | 6-step border-radius scale               |
| `shadows.ts`    | `shadows`  | sm/md/lg + brand glow shadows            |
| `z-index.ts`    | `zIndex`   | Layering scale (0–70)                    |
| `breakpoints.ts`| `breakpoints` | sm–2xl responsive breakpoints        |

---

## Component API

### Button

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

| Prop      | Type                                                    | Default     |
|-----------|---------------------------------------------------------|-------------|
| `variant` | primary \| secondary \| accent \| ghost \| outline \| danger \| vip \| sponsor | `primary` |
| `size`    | sm \| md \| lg                                          | `md`        |
| `type`    | button \| submit \| reset                               | `button`    |
| `disabled`| boolean                                                 | `false`     |

### Card

```tsx
<Card hover glow="primary" padding="md">
  <p>Content</p>
</Card>
```

| Prop      | Type                  | Default |
|-----------|-----------------------|---------|
| `hover`   | boolean               | `false` |
| `glow`    | primary \| gold \| vip | —      |
| `padding` | none \| sm \| md \| lg | `none` |

### Badge

```tsx
<Badge variant="vip">VIP</Badge>
```

Variants: `default` `primary` `category` `success` `warning` `danger` `info` `vip` `sponsor` `gold`

### Modal

```tsx
<Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Post" size="md">
  <div className="p-6">…</div>
</Modal>
```

### Tabs

```tsx
<Tabs tabs={[
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'analytics', label: 'Analytics', content: <Analytics /> },
]} defaultTab="overview" />
```

### Table / DataTable

```tsx
<DataTable
  columns={[
    { key: 'title', header: 'Title' },
    { key: 'status', header: 'Status', render: (v) => <Badge>{String(v)}</Badge> },
  ]}
  rows={posts}
  emptyTitle="No posts yet"
/>
```

### StatCard

```tsx
<StatCard label="Total Views" value="124,500" trend={12.4} trendLabel="vs last month" />
```

### ChartCard

```tsx
<ChartCard title="Traffic Overview" subtitle="Last 30 days" action={<Button size="sm">Export</Button>}>
  <MyChart />
</ChartCard>
```

### FormField

```tsx
<FormField
  id="email"
  label="Email address"
  type="email"
  required
  value={email}
  onChange={setEmail}
  error={errors.email}
/>
```

### SearchBar

```tsx
<SearchBar value={query} onChange={setQuery} placeholder="Search articles…" />
```

### FilterPanel

```tsx
<FilterPanel
  groups={[
    { id: 'category', label: 'Category', options: [{ label: 'News', value: 'news' }] },
  ]}
  selected={filters}
  onChange={(group, value) => toggleFilter(group, value)}
  onClear={() => setFilters({})}
/>
```

### EmptyState

```tsx
<EmptyState
  title="No results found"
  description="Try adjusting your filters."
  action={<Button onClick={clearFilters}>Clear filters</Button>}
/>
```

---

## Layout API

### PublicLayout

```tsx
<PublicLayout header={<Header />} footer={<Footer />}>
  <HomePage />
</PublicLayout>
```

### AdminLayout

```tsx
<AdminLayout sidebar={<AdminSidebar />} title="Dashboard">
  <DashboardPage />
</AdminLayout>
```

### ArticleLayout

```tsx
<ArticleLayout header={<Header />} sidebar={<RelatedPosts />}>
  <ArticleBody />
</ArticleLayout>
```

### DashboardLayout

```tsx
<DashboardLayout title="Analytics" kpiRow={<>{kpis.map(k => <StatCard {...k} />)}</>} actions={<ExportButton />}>
  <ChartsGrid />
</DashboardLayout>
```

### LandingPageLayout

```tsx
<LandingPageLayout header={<NavBar />} footer={<Footer />}>
  <HeroSection … />
  <FeatureGrid … />
</LandingPageLayout>
```

---

## Pattern API

### HeroSection

```tsx
<HeroSection
  eyebrow="New Release"
  title="The Future of Content"
  subtitle="Build, publish, and grow."
  primaryAction={<Button>Get started</Button>}
  secondaryAction={<Button variant="ghost">Learn more</Button>}
/>
```

### BlogCardGrid

```tsx
<BlogCardGrid posts={posts} columns={3} onPostClick={(p) => navigate(`/posts/${p.id}`)} />
```

### FeatureGrid

```tsx
<FeatureGrid
  title="Everything you need"
  features={[{ icon: <Icon />, title: 'Feature', description: '…' }]}
  columns={3}
/>
```

### PricingBlock

```tsx
<PricingBlock tiers={tiers} title="Simple Pricing" onSelect={handleSelect} />
```

### SponsorStrip

```tsx
<SponsorStrip sponsors={sponsors} label="Our sponsors" />
```

### NewsletterBlock

```tsx
<NewsletterBlock onSubmit={(email) => subscribe(email)} />
```

### SocialEmbedWall

```tsx
<SocialEmbedWall embeds={posts} columns={3} title="Follow us" />
```

### PaywallBlock

```tsx
<PaywallBlock
  title="VIP Only"
  features={['Exclusive articles', 'Early access']}
  planPrice="$9/mo"
  onUpgrade={() => navigate('/subscribe')}
/>
```

---

## Responsive Behavior

| Breakpoint | Width   | Behavior                              |
|------------|---------|---------------------------------------|
| default    | < 640px | Single column, stacked layout         |
| sm         | 640px   | 2-column grids begin                  |
| md         | 768px   | Side panels visible                   |
| lg         | 1024px  | 3/4-column grids, sidebars at 288px   |
| xl         | 1280px  | Max-width containers hit their limits |

---

## Accessibility Notes

- Buttons default to `type="button"` — pass `type="submit"` explicitly on forms.
- `Modal` has `role="dialog"`, `aria-modal`, and escape key support.
- `Tabs` have full ARIA tab-panel attributes.
- `FormField` binds `<label>` to `<input>` via matching `id`/`htmlFor`.
- `FormField` errors use `role="alert"` for screen-reader announcement.
