import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export interface RecommendedItem {
  content_id: string;
  content_type: string;
  title?: string;
  slug?: string;
  recommendation_type: string;
  score: number;
  reason?: string | null;
}

interface RecommendedPostsProps {
  items: RecommendedItem[];
  title?: string;
  className?: string;
}

export const RecommendedPosts: React.FC<RecommendedPostsProps> = ({
  items,
  title = "Recommended For You",
  className = "",
}) => {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-xl font-bold text-textPrimary mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.content_id} to={`/magazine/${item.slug ?? item.content_id}`}>
            <Card hover className="p-4">
              <p className="text-xs text-primary uppercase tracking-widest mb-1">
                {item.recommendation_type.replace(/_/g, " ")}
              </p>
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
