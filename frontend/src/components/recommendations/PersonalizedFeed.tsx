import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export interface FeedItem {
  content_id: string;
  content_type: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  category?: string | null;
  score: number;
  reason?: string | null;
}

interface PersonalizedFeedProps {
  items: FeedItem[];
  loading?: boolean;
  className?: string;
}

export const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({
  items,
  loading = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface rounded-2xl border border-white/8 h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`text-center py-12 text-textMuted ${className}`}>
        <p className="text-lg mb-1">Your feed is empty</p>
        <p className="text-sm">Read and save posts to personalise your feed.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item) => (
        <Link key={item.content_id} to={`/magazine/${item.slug ?? item.content_id}`}>
          <Card hover className="p-5 h-full">
            {item.category && (
              <Badge variant="category" className="mb-2">
                {item.category}
              </Badge>
            )}
            <h3 className="text-base font-bold text-textPrimary mb-2 line-clamp-2">
              {item.title ?? item.content_id}
            </h3>
            {item.excerpt && (
              <p className="text-sm text-textMuted line-clamp-2">{item.excerpt}</p>
            )}
            {item.reason && (
              <p className="text-xs text-primary mt-2">{item.reason}</p>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
};
