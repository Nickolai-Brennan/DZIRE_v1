import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SearchBar } from "../components/search/SearchBar";
import { SearchResults } from "../components/search/SearchResults";
import { SearchFilters } from "../components/search/SearchFilters";
import { SortSelector } from "../components/search/SortSelector";
import { CategoryFilter } from "../components/search/CategoryFilter";
import type { SearchResultItem } from "../components/search/SearchResults";

const CONTENT_TYPES = ["post", "position", "review", "story"];
const CATEGORIES = ["Health", "Fashion", "Beauty", "Lifestyle", "Reviews"];

interface SearchResponse {
  query: string;
  total: number;
  items: SearchResultItem[];
  skip: number;
  limit: number;
}

async function fetchSearch(params: URLSearchParams): Promise<SearchResponse> {
  const res = await fetch(`/api/search?${params.toString()}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [contentType, setContentType] = useState(searchParams.get("content_type") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") ?? "relevance");
  const [isVipOnly, setIsVipOnly] = useState<boolean | null>(null);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) return;
      setLoading(true);
      const params = new URLSearchParams({ q, sort_by: sortBy });
      if (contentType) params.set("content_type", contentType);
      if (category) params.set("category", category);
      if (isVipOnly !== null) params.set("is_vip_only", String(isVipOnly));
      setSearchParams({ q, sort_by: sortBy });
      try {
        const data = await fetchSearch(params);
        setResults(data.items);
        setTotal(data.total);
      } catch {
        setResults([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [sortBy, contentType, category, isVipOnly, setSearchParams],
  );

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      runSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    runSearch(q);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 text-center mb-8">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">Search</p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-6">
          Find Anything
        </h1>
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            placeholder="Search posts, tags, categories..."
          />
        </div>
        <div className="mt-4">
          <Link
            to="/search/advanced"
            className="text-sm text-textMuted hover:text-primary transition-colors"
          >
            Advanced Search →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category chips */}
        <div className="mb-6">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={category}
            onChange={(c) => {
              setCategory(c);
              if (query) runSearch(query);
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          {query && (
            <p className="text-sm text-textMuted">
              {total} result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          )}
          <div className="ml-auto">
            <SortSelector
              value={sortBy}
              onChange={(s) => {
                setSortBy(s);
                if (query) runSearch(query);
              }}
            />
          </div>
        </div>

        {/* Layout: Sidebar + Results */}
        <div className="flex gap-8">
          <SearchFilters
            contentTypes={CONTENT_TYPES}
            activeContentType={contentType}
            onContentTypeChange={(t) => {
              setContentType(t);
              if (query) runSearch(query);
            }}
            isVipOnly={isVipOnly}
            onVipOnlyChange={(v) => {
              setIsVipOnly(v);
              if (query) runSearch(query);
            }}
            className="hidden lg:block w-56 shrink-0"
          />
          <div className="flex-1 min-w-0">
            {!query && (
              <div className="text-center py-16 text-textMuted">
                <p className="text-xl mb-2">Start typing to search</p>
                <p className="text-sm">Search posts, reviews, stories, and more.</p>
              </div>
            )}
            <SearchResults items={results} loading={loading} query={query} />
          </div>
        </div>
      </div>
    </div>
  );
};
