import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export interface SearchResultItem {
  id: string;
  content_id: string;
  content_type: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  tags?: string[] | null;
  author?: string | null;
  is_vip_only?: boolean;
  published_at?: string | null;
  ranking_score?: number | null;
}

interface SearchResultsProps {
  items: SearchResultItem[];
  loading?: boolean;
  query?: string;
}

const getHref = (type: string, slug: string): string => {
  const map: Record<string, string> = {
    post: `/magazine/${slug}`,
    position: `/positions/${slug}`,
    review: `/reviews/${slug}`,
    story: `/stories/${slug}`,
  };
  return map[type] ?? `/magazine/${slug}`;
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  items,
  loading = false,
  query = "",
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface rounded-2xl border border-white/8 h-48 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!query) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-textMuted">
        <p className="text-2xl font-bold mb-2">No results found</p>
        <p className="text-sm">
          Try a different search term or browse by category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Link key={item.id} to={getHref(item.content_type, item.slug)}>
          <Card hover className="overflow-hidden h-full">
            <div className="p-5">
              <Badge variant="category" className="mb-2">
                {item.content_type}
              </Badge>
              {item.category && (
                <span className="ml-2 text-xs text-textMuted">
                  {item.category}
                </span>
              )}
              <h3 className="text-base font-bold text-textPrimary mt-2 mb-2 line-clamp-2">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="text-sm text-textMuted line-clamp-2">
                  {item.excerpt}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-surface border border-white/10 rounded-full px-2 py-0.5 text-textMuted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
