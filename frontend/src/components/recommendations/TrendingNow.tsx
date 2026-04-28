import React from "react";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export interface TrendingItem {
  content_id: string;
  content_type: string;
  title?: string;
  slug?: string;
  score: number;
}

interface TrendingNowProps {
  items: TrendingItem[];
  className?: string;
}

export const TrendingNow: React.FC<TrendingNowProps> = ({
  items,
  className = "",
}) => {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-textPrimary">Trending Now</h2>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <Link
            key={item.content_id}
            to={`/magazine/${item.slug ?? item.content_id}`}
          >
            <Card hover className="p-3 flex items-center gap-3">
              <span className="text-2xl font-black text-primary/40 w-6 shrink-0">
                {idx + 1}
              </span>
              <p className="text-sm font-medium text-textPrimary line-clamp-2">
                {item.title ?? item.content_id}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
