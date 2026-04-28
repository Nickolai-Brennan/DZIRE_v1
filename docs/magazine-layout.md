# Magazine Layout System

The Magazine Layout system provides a comprehensive solution for building content-rich grid-based magazine and news website layouts within the DZIRE design system.

## Architecture

The magazine layout system is composed of several layers:

1. **MagazineLayout** — Main layout container with header, hero, featured sections, main content, and sidebar
2. **MagazineSection** — Grouped content sections with titles, badges, and view-all links
3. **HeroCard** — Large featured article display with gradient overlay
4. **ArticleCard** — Standard article cards for grids with multiple size variants
5. **ArticleGrid** — Responsive grid with configurable columns

## Components

### MagazineLayout

The primary page-level layout component that structures the entire magazine page.

```typescript
interface MagazineLayoutProps {
  hero?: React.ReactNode;           // Large featured article section
  featured?: React.ReactNode;       // Featured content grid (optional)
  children: React.ReactNode;        // Main content area
  sidebar?: React.ReactNode;        // Right sidebar (desktop only)
}
```

**Usage:**

```tsx
<MagazineLayout
  hero={<HeroCard {...heroData} />}
  featured={<MagazineSection>...</MagazineSection>}
  sidebar={<NewsletterSignup />}
>
  {/* Main content sections */}
</MagazineLayout>
```

**Layout Structure:**
- Full-width header (from Header component)
- Optional hero section with full-width background
- Optional featured grid section
- Main content area (flexible) + right sidebar (hidden on mobile)
- Full-width footer

---

### MagazineSection

Groups related articles under a category heading with optional metadata and links.

```typescript
interface MagazineSectionProps {
  title: string;                    // Section heading
  badge?: React.ReactNode;          // Optional badge (e.g., "TRENDING NOW")
  description?: string;             // Optional section description
  children: React.ReactNode;        // Article grid/content
  viewAllHref?: string;             // Optional "View All" link
  viewAllLabel?: string;            // Link text (default: "View All")
}
```

**Usage:**

```tsx
<MagazineSection
  title="Trending Now"
  badge={<Badge variant="accent">HOT</Badge>}
  viewAllHref="/trending"
>
  <ArticleGrid columns={4}>
    {articles.map(article => (
      <ArticleCard key={article.id} {...article} />
    ))}
  </ArticleGrid>
</MagazineSection>
```

**Features:**
- Flexible header with optional badge and description
- Automatically positioned "View All" link
- Clean spacing and typography hierarchy

---

### HeroCard

Large featured article card with background image, gradient overlay, and content overlay.

```typescript
interface HeroCardProps {
  image: string;                    // Image URL
  headline: string;                 // Article headline
  excerpt?: string;                 // Article excerpt
  category?: string;                // Category badge
  author?: string;                  // Author name
  date?: string;                    // Publication date
  onClick?: () => void;             // Click handler
}
```

**Usage:**

```tsx
<HeroCard
  image="https://..."
  headline="Major Breaking Story"
  excerpt="Details about the story..."
  category="NEWS"
  author="Jane Doe"
  date="November 13, 2019"
  onClick={() => navigate('/article')}
/>
```

**Features:**
- Responsive height (72px on mobile → 480px on desktop)
- Gradient overlay for text readability
- Smooth scale animation on hover
- Category badge and metadata display
- Truncated excerpt (2 lines)

---

### ArticleCard

Standard article card component for grids with image, title, and metadata.

```typescript
interface ArticleCardProps {
  image: string;                    // Image URL
  title: string;                    // Article title
  excerpt?: string;                 // Short description
  category?: string;                // Category tag
  author?: string;                  // Author name
  date?: string;                    // Publication date
  featured?: boolean;               // Larger variant (default: false)
  onClick?: () => void;             // Click handler
}
```

**Usage:**

```tsx
<ArticleCard
  image="https://..."
  title="Article Title"
  excerpt="Short description..."
  category="TECH"
  author="John Smith"
  date="November 10, 2019"
  featured={true}
/>
```

**Features:**
- Two size variants (standard and featured)
- Hover scale animation on image
- Category tag display
- Optional excerpt (2-line limit)
- Author and date metadata
- Responsive image heights

---

### ArticleGrid

Responsive grid container for arranging article cards.

```typescript
interface ArticleGridProps {
  children: React.ReactNode;
  columns?: "auto" | 2 | 3 | 4;    // Column count (default: "auto" = 3 cols)
  gap?: "sm" | "md" | "lg";        // Grid gap (default: "md")
}
```

**Usage:**

```tsx
<ArticleGrid columns={3} gap="lg">
  {articles.map(article => (
    <ArticleCard key={article.id} {...article} />
  ))}
</ArticleGrid>
```

**Responsive Behavior:**

| Screen | auto | 2 | 3 | 4 |
|--------|------|---|---|---|
| Mobile | 1 | 1 | 1 | 1 |
| Tablet | 2 | 2 | 2 | 2 |
| Desktop | 3 | 2 | 3 | 4 |

---

## Complete Example

```tsx
import {
  MagazineLayout,
  MagazineSection,
  HeroCard,
  ArticleCard,
  ArticleGrid,
} from "../design-system/layouts/MagazineLayout";
import { Badge } from "../components/Badge";

export const DemoPage: React.FC = () => {
  return (
    <MagazineLayout
      {/* Hero section at top */}
      hero={
        <div className="py-12">
          <HeroCard
            image="hero-image.jpg"
            headline="Main Story"
            excerpt="Details..."
            category="FEATURED"
            author="Author Name"
            date="Today"
          />
        </div>
      }

      {/* Featured grid below hero */}
      featured={
        <MagazineSection
          title="Featured"
          badge={<Badge>NEW</Badge>}
        >
          <ArticleGrid columns={2}>
            {featuredArticles.map(article => (
              <ArticleCard
                key={article.id}
                {...article}
                featured={true}
              />
            ))}
          </ArticleGrid>
        </MagazineSection>
      }

      {/* Right sidebar for newsletter/ads */}
      sidebar={
        <div className="space-y-6">
          <NewsletterSignup />
          <AdvertisementBox />
          <SocialLinks />
        </div>
      }
    >
      {/* Main content sections */}
      <div className="space-y-16">
        <MagazineSection title="Latest">
          <ArticleGrid columns={3}>
            {latestArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </ArticleGrid>
        </MagazineSection>

        <MagazineSection title="Trending">
          <ArticleGrid columns={4}>
            {trendingArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </ArticleGrid>
        </MagazineSection>
      </div>
    </MagazineLayout>
  );
};
```

## Design Tokens Used

The magazine layout respects DZIRE design tokens:

- **Colors:** `background`, `surfaceAlt`, `textPrimary`, `textSecondary`, `accent`, `accentHover`, `borderDefault`
- **Typography:** Font sizes and weights from the typography token system
- **Spacing:** 4px-based spacing scale (px-4, py-8, gap-6, etc.)
- **Shadows:** For elevated cards (implicit via card styling)
- **Responsive Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)

## Accessibility

The magazine layout includes:

- Semantic HTML structure (`<header>`, `<main>`, `<article>`, `<aside>`, `<section>`)
- ARIA labels on sidebar and main content areas
- Proper heading hierarchy (h1, h2, h3)
- Sufficient color contrast for all text
- Keyboard navigation support via buttons and links
- Image alt text support

## Mobile Responsiveness

- Hero section: Scales from 72px (mobile) to 480px (desktop)
- Featured grid: 1 column (mobile) → 2 columns (desktop)
- Main grid: 1 column (mobile) → 2-4 columns (desktop)
- Sidebar: Hidden on screens smaller than `lg` breakpoint (1024px)
- Gap scaling: Adjusts padding and gaps for smaller screens

## Customization

All components use Tailwind CSS classes for easy customization:

```tsx
// Custom styling example
<ArticleCard
  {...article}
  className="ring-2 ring-accent rounded-xl"  // Add custom classes
/>
```

You can also override individual component styles by wrapping them or extending the classes.

## File Location

```
frontend/src/design-system/layouts/MagazineLayout.tsx
```

## Related Components

- `ArticleLayout` — For single long-form article reading
- `Header` — Top navigation
- `Footer` — Page footer
- `Badge` — Category/status indicators
- `Button` — Call-to-action buttons

---

For more information on the design system, see [design-system.md](../design-system.md).
