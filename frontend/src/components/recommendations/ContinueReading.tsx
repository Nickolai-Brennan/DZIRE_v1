import React from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export interface ContinueReadingItem {
  id: string;
  title: string;
  slug: string;
  progress: number; // 0–100
  content_type?: string;
}

interface ContinueReadingProps {
  items: ContinueReadingItem[];
  className?: string;
}

export const ContinueReading: React.FC<ContinueReadingProps> = ({
  items,
  className = "",
}) => {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-textPrimary">Continue Reading</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Link key={item.id} to={`/magazine/${item.slug}`}>
            <Card hover className="p-4">
              <h3 className="text-sm font-semibold text-textPrimary line-clamp-1 mb-2">
                {item.title}
              </h3>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${Math.min(100, item.progress)}%` }}
                />
              </div>
              <p className="text-xs text-textMuted mt-1">
                {item.progress}% read
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
