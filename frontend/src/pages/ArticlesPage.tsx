import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterChips } from "../components/ui/FilterChips";
import { Badge } from "../components/ui/Badge";
import { NewsletterForm } from "../components/ui/NewsletterForm";
import { mockArticles } from "../data/mockArticles";
import { track } from "../utils/track";

const CATEGORIES = [
  "All",
  "Creator Spotlight",
  "Culture",
  "Self-Improvement",
  "Product Guide",
  "Communication",
];

const TEMPLATE_LABELS: Record<string, string> = {
  "profile-spotlight": "Profile Spotlight",
  "longform-essay": "Longform Essay",
  general: "General Article",
  review: "Product Review",
  tips: "Sex Secrets / Tips",
};

export const ArticlesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    return mockArticles.filter((a) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchFilter = activeFilter === "All" || a.category === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const featured =
    mockArticles.find((a) => a.templateType === "longform-essay") ??
    mockArticles[0];
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">
          Editorial
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">
          Articles
        </h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto mb-8">
          Deep reads, confidence guides, product reviews, and intimate wisdom.
        </p>
        <div className="max-w-lg mx-auto">
          <SearchBar
            value={search}
            onChange={(q) => {
              setSearch(q);
              if (q) track("search_query", { query: q, context: "articles" });
            }}
            placeholder="Search articles..."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="mb-8">
          <FilterChips
            filters={CATEGORIES}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        {/* Featured Article */}
        {activeFilter === "All" && !search && (
          <div className="mb-12">
            <p className="text-xs text-primary uppercase tracking-widest mb-4">
              Featured
            </p>
            <Link
              to={`/articles/${featured.slug}`}
              onClick={() =>
                track("article_card_click", {
                  articleId: featured.id,
                  featured: true,
                })
              }
              className="block group"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[16/6]">
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="category">{featured.category}</Badge>
                    <span className="text-xs text-textMuted">
                      {TEMPLATE_LABELS[featured.templateType]}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-textPrimary mb-3 max-w-2xl group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-textMuted max-w-xl mb-4 hidden sm:block">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-textMuted">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readingTime} min read
                    </span>
                    <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        <p className="text-sm text-textMuted mb-6">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {(activeFilter === "All" && !search ? rest : filtered).map(
            (article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                onClick={() =>
                  track("article_card_click", { articleId: article.id })
                }
                className="group bg-surface rounded-2xl overflow-hidden border border-white/8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="category">{article.category}</Badge>
                    <span className="text-xs text-textMuted">
                      {TEMPLATE_LABELS[article.templateType]}
                    </span>
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-textMuted line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-textMuted mt-4 pt-4 border-t border-white/8">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      {article.readingTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-textMuted">
            <p className="text-2xl font-bold mb-2">No articles found</p>
            <p>Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mb-16">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};
