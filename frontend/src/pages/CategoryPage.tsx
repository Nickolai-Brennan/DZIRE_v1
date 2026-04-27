/**
 * frontend/src/pages/CategoryPage.tsx
 * Public category listing — shows posts in a category by slug.
 */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((cats: Category[]) => {
        const found = cats.find((c) => c.slug === slug) ?? null;
        setCategory(found);
      })
      .catch(() => setCategory(null))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="text-sm text-textMuted hover:text-primary mb-6 inline-block"
      >
        ← Back to Blog
      </Link>
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && !category && (
        <p className="text-textMuted">Category not found.</p>
      )}
      {category && (
        <>
          <h1 className="text-3xl font-bold text-textPrimary mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-textMuted mb-8">{category.description}</p>
          )}
          <p className="text-textMuted italic">
            Posts in this category coming soon.
          </p>
        </>
      )}
    </div>
  );
};
