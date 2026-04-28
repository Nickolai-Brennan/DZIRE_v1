import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterChips } from "../components/ui/FilterChips";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SaveToPlaylistButton } from "../components/ui/SaveToPlaylistButton";
import { mockPositions } from "../data/mockPositions";
import { mockReviews } from "../data/mockReviews";
import { mockStories } from "../data/mockStories";
import { mockArticles } from "../data/mockArticles";
import { track } from "../utils/track";

const CONTENT_FILTERS = ["All", "Positions", "Reviews", "Stories", "Articles"];

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q) track("search_submit", { query: q });
  };

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return [];
    const positions =
      activeFilter === "All" || activeFilter === "Positions"
        ? mockPositions
            .filter(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.keywords.some((k) => k.toLowerCase().includes(q)),
            )
            .map((p) => ({
              type: "position" as const,
              id: p.id,
              title: p.title,
              slug: p.slug,
              excerpt: p.description,
              image: p.image,
              category: p.category,
            }))
        : [];
    const reviews =
      activeFilter === "All" || activeFilter === "Reviews"
        ? mockReviews
            .filter(
              (r) =>
                r.title.toLowerCase().includes(q) ||
                r.excerpt.toLowerCase().includes(q) ||
                r.brand.toLowerCase().includes(q),
            )
            .map((r) => ({
              type: "review" as const,
              id: r.id,
              title: r.title,
              slug: r.slug,
              excerpt: r.excerpt,
              image: r.image,
              category: r.category,
            }))
        : [];
    const stories =
      activeFilter === "All" || activeFilter === "Stories"
        ? mockStories
            .filter(
              (s) =>
                s.title.toLowerCase().includes(q) ||
                s.excerpt.toLowerCase().includes(q),
            )
            .map((s) => ({
              type: "story" as const,
              id: s.id,
              title: s.title,
              slug: s.slug,
              excerpt: s.excerpt,
              image: s.image,
              category: s.category,
            }))
        : [];
    const articles =
      activeFilter === "All" || activeFilter === "Articles"
        ? mockArticles
            .filter(
              (a) =>
                a.title.toLowerCase().includes(q) ||
                a.excerpt.toLowerCase().includes(q),
            )
            .map((a) => ({
              type: "article" as const,
              id: a.id,
              title: a.title,
              slug: a.slug,
              excerpt: a.excerpt,
              image: a.featuredImage,
              category: a.category,
            }))
        : [];
    return [...positions, ...reviews, ...stories, ...articles];
  }, [query, activeFilter]);

  const getHref = (type: string, slug: string) => {
    const map: Record<string, string> = {
      position: `/positions/${slug}`,
      review: `/reviews/${slug}`,
      story: `/stories/${slug}`,
      article: `/magazine`,
    };
    return map[type] ?? "/";
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">
          Search
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-6">
          Find Anything
        </h1>
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={query}
            onChange={handleSearch}
            placeholder="Search positions, reviews, stories..."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <FilterChips
            filters={CONTENT_FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        {query && (
          <p className="text-sm text-textMuted mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for "
            {query}"
          </p>
        )}

        {!query && (
          <div className="text-center py-16 text-textMuted">
            <p className="text-xl mb-2">Start typing to search</p>
            <p className="text-sm">
              Search positions, reviews, stories, and articles
            </p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16 text-textMuted">
            <p className="text-2xl font-bold mb-2">No results found</p>
            <p>Try a different search term or browse by category.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {results.map((result) => (
            <div key={result.id} className="relative">
              <Link
                to={getHref(result.type, result.slug)}
                onClick={() =>
                  track("search_result_click", {
                    id: result.id,
                    type: result.type,
                  })
                }
              >
                <Card hover className="overflow-hidden h-full">
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <div className="p-5">
                    <Badge variant="category" className="mb-2">
                      {result.type}
                    </Badge>
                    <h3 className="text-base font-bold text-textPrimary mb-2 line-clamp-2">
                      {result.title}
                    </h3>
                    <p className="text-sm text-textMuted line-clamp-2">
                      {result.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
              {result.type === "position" && (
                <div className="absolute top-3 right-3">
                  <SaveToPlaylistButton
                    item={{
                      id: result.id,
                      type: "position",
                      title: result.title,
                      slug: result.slug,
                      image: result.image,
                    }}
                    label=""
                    className="!p-2 !rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
