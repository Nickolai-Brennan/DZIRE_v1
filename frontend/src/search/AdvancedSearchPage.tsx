import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/search/SearchBar";
import { CategoryFilter } from "../components/search/CategoryFilter";
import { TagFilter } from "../components/search/TagFilter";
import { SortSelector } from "../components/search/SortSelector";

const SAMPLE_CATEGORIES = ["Health", "Fashion", "Beauty", "Lifestyle", "Reviews"];
const SAMPLE_TAGS = ["wellness", "style", "skincare", "fitness", "vip"];

export const AdvancedSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams({ q: query, sort_by: sortBy });
    if (category) params.set("category", category);
    if (activeTags.length) params.set("tags", activeTags.join(","));
    if (dateFrom) params.set("date_from", dateFrom);
    if (dateTo) params.set("date_to", dateTo);
    navigate(`/search?${params.toString()}`);
  };

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-black text-textPrimary mb-8">Advanced Search</h1>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-textPrimary block mb-2">
            Keywords
          </label>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            placeholder="Enter search terms..."
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-textPrimary block mb-2">
            Category
          </label>
          <CategoryFilter
            categories={SAMPLE_CATEGORIES}
            activeCategory={category}
            onChange={setCategory}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-textPrimary block mb-2">
            Tags
          </label>
          <TagFilter tags={SAMPLE_TAGS} activeTags={activeTags} onToggle={toggleTag} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-textPrimary block mb-2">
              Date From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-lg text-sm text-textPrimary px-3 py-2 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-textPrimary block mb-2">
              Date To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-lg text-sm text-textPrimary px-3 py-2 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-textPrimary block mb-2">
            Sort By
          </label>
          <SortSelector value={sortBy} onChange={setSortBy} />
        </div>

        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </div>
  );
};
