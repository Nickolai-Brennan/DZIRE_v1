import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/search/SearchBar";
import { TrendingNow } from "../components/recommendations/TrendingNow";

const TRENDING_MOCK = [
  { content_id: "1", content_type: "post", title: "Best Wellness Routines", slug: "best-wellness-routines", score: 120 },
  { content_id: "2", content_type: "post", title: "Top Fashion Trends", slug: "top-fashion-trends", score: 95 },
  { content_id: "3", content_type: "post", title: "Beauty Secrets Revealed", slug: "beauty-secrets-revealed", score: 80 },
];

export const SearchResultsPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (q: string) => {
      if (q.trim()) {
        navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      }
    },
    [navigate],
  );

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-20 px-4 text-center">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">Discover</p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-6">
          Find Anything
        </h1>
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            placeholder="Search posts, categories, tags..."
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <TrendingNow items={TRENDING_MOCK} />
      </div>
    </div>
  );
};
