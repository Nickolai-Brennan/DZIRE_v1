# Magazine Layout Preview Guide

The magazine layout preview is now available at:

**`http://localhost:5174/previews/magazine`**

## What's Included

### Component Previews
The preview showcases all magazine layout components:

1. **Full Page** — Complete magazine layout with hero, featured section, and sidebar
2. **Hero Card** — Large featured article (responsive from 72px to 480px)
3. **Article Cards** — Standard cards in multiple grid configurations
4. **Magazine Sections** — Content grouping with badges and view-all links
5. **Responsive Grids** — Different breakpoints and gap sizes

### Features Demonstrated
- ✓ Responsive design (mobile → tablet → desktop)
- ✓ Hover animations and transitions
- ✓ Grid layouts (1, 2, 3, 4 columns)
- ✓ Badge variants
- ✓ Category tagging
- ✓ Author and date metadata
- ✓ Newsletter subscription widget

## Component Navigation

Click the buttons at the top to switch between different component previews:
- **Full Page** — See all components working together
- **Hero Card** — Large featured article showcase
- **Article Cards** — Various card sizes and layouts
- **Magazine Sections** — Section headers with metadata
- **Responsive Grids** — Grid behavior at different sizes

## How to Use Components

Import the components in your page:

```tsx
import {
  MagazineLayout,
  MagazineSection,
  HeroCard,
  ArticleCard,
  ArticleGrid,
} from "../design-system/layouts/MagazineLayout";
```

## File Locations

| File | Purpose |
|------|---------|
| `frontend/src/design-system/layouts/MagazineLayout.tsx` | Main component library |
| `frontend/src/components/previews/MagazineLayoutPreview.tsx` | Interactive preview |
| `frontend/src/pages/MagazinePage.tsx` | Example implementation |
| `frontend/src/routes/PreviewRoutes.tsx` | Preview routing |
| `docs/magazine-layout.md` | Full API documentation |

## Responsive Breakpoints

Test at these viewport widths:
- **Mobile:** < 640px (1 column)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** > 1024px (3-4 columns)

Resize your browser to see responsive behavior in action.

## Extending Previews

To add more component previews:

1. Create a new preview component in `frontend/src/components/previews/`
2. Add a route in `frontend/src/routes/PreviewRoutes.tsx`
3. Add a preview section object to the `previewSections` array

Example:
```tsx
const previewSections: PreviewSection[] = [
  // ... existing previews
  {
    id: "my-component",
    name: "My Component",
    description: "Description here",
    component: <MyComponent />
  }
];
```

## Next Steps

- View the magazine layout in action: `/magazine`
- Edit `frontend/src/pages/MagazinePage.tsx` to customize
- Add more preview components as needed
- Run tests with `npm run test`

---

**Note:** Preview routes are development-only and should be disabled or restricted in production.
