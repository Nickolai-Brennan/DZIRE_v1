import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { mockStories } from "../data/mockStories";
import { FilterChips } from "../components/ui/FilterChips";
import { Badge } from "../components/ui/Badge";
import { track } from "../utils/track";

const CATEGORY_FILTERS = [
  "All",
  "Romance",
  "Slow Burn",
  "Adventure",
  "Forbidden",
];

export const StoriesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return mockStories;
    return mockStories.filter((s) => s.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">
          DZIRE Stories
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">
          Fantasy & Desire
        </h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Sensual fiction and intimate stories celebrating connection, desire,
          and discovery.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8">
          <FilterChips
            filters={CATEGORY_FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filtered.map((story) => (
            <Link
              key={story.id}
              to={`/stories/${story.slug}`}
              onClick={() => track("story_card_click", { storyId: story.id })}
              className="group bg-surface rounded-2xl overflow-hidden border border-white/8 hover:border-primary/30 transition-all hover:-translate-y-1 block"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant="category">{story.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-textPrimary mb-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-textMuted text-sm leading-relaxed mb-4 line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-textMuted">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {story.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.readingTime} min read
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {story.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-textMuted">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-textMuted">
            <p className="text-2xl font-bold mb-2">
              No stories in this category
            </p>
            <p>Check back soon for new content.</p>
          </div>
        )}
      </div>
    </div>
  );
};
