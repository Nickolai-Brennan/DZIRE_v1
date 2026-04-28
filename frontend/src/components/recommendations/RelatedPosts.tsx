import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export interface RelatedItem {
  content_id: string;
  content_type: string;
  title?: string;
  slug?: string;
  score: number;
  reason?: string | null;
}

interface RelatedPostsProps {
  items: RelatedItem[];
  className?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  items,
  className = "",
}) => {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-xl font-bold text-textPrimary mb-4">Related Articles</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <Link key={item.content_id} to={`/magazine/${item.slug ?? item.content_id}`}>
            <Card hover className="p-4">
              <h3 className="text-sm font-semibold text-textPrimary line-clamp-2">
                {item.title ?? item.content_id}
              </h3>
              {item.reason && (
                <p className="text-xs text-textMuted mt-1">{item.reason}</p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
