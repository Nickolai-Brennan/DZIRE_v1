/**
 * Design System — MagazineLayout
 *
 * Grid-based magazine layout optimized for content discovery and visual storytelling.
 * Features hero section, featured grid, and organized content sections with sidebars.
 */
import React from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

export interface MagazineLayoutProps {
  /** Hero banner section (large featured article) */
  hero?: React.ReactNode;
  /** Featured content grid (4-6 articles) */
  featured?: React.ReactNode;
  /** Main content area below featured section */
  children: React.ReactNode;
  /** Right sidebar (newsletter, social, ads) */
  sidebar?: React.ReactNode;
}

export const MagazineLayout: React.FC<MagazineLayoutProps> = ({
  hero,
  featured,
  children,
  sidebar,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />

      {/* Hero Section */}
      {hero && (
        <section className="w-full bg-surfaceAlt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{hero}</div>
        </section>
      )}

      {/* Featured Grid Section */}
      {featured && (
        <section className="w-full border-b border-borderDefault py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {featured}
          </div>
        </section>
      )}

      {/* Main Content + Sidebar */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-8 lg:gap-12">
            {/* Main content area */}
            <div className="flex-1 min-w-0">{children}</div>

            {/* Right sidebar */}
            {sidebar && (
              <aside
                className="hidden lg:block w-72 shrink-0 space-y-8"
                aria-label="Magazine sidebar"
              >
                {sidebar}
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/**
 * Subcomponent: Magazine Section
 * Groups related articles under a category heading with optional view-all link
 */
export interface MagazineSectionProps {
  title: string;
  badge?: React.ReactNode; // e.g., "TRENDING NOW"
  description?: string;
  children: React.ReactNode; // Grid of articles
  viewAllHref?: string;
  viewAllLabel?: string;
}

export const MagazineSection: React.FC<MagazineSectionProps> = ({
  title,
  badge,
  description,
  children,
  viewAllHref,
  viewAllLabel = "View All",
}) => {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          {badge && <div>{badge}</div>}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-textSecondary">{description}</p>
          )}
        </div>

        {/* View All Link */}
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-sm font-semibold text-accent hover:text-accentHover transition-colors whitespace-nowrap mt-2"
          >
            {viewAllLabel} →
          </a>
        )}
      </div>

      {/* Content Grid */}
      {children}
    </section>
  );
};

/**
 * Subcomponent: Hero Card
 * Large featured article with image, headline, excerpt, and metadata
 */
export interface HeroCardProps {
  image: string;
  headline: string;
  excerpt?: string;
  category?: string;
  author?: string;
  date?: string;
  onClick?: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  image,
  headline,
  excerpt,
  category,
  author,
  date,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full h-72 sm:h-96 lg:h-[480px] rounded-lg overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={headline}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-3">
        {/* Category Badge */}
        {category && (
          <div className="inline-block px-3 py-1 bg-accent/90 rounded text-xs font-bold text-white uppercase tracking-wider">
            {category}
          </div>
        )}

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight group-hover:underline">
          {headline}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm sm:text-base text-gray-200 line-clamp-2">
            {excerpt}
          </p>
        )}

        {/* Metadata */}
        {(author || date) && (
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 pt-2">
            {author && <span>{author}</span>}
            {date && (
              <>
                <span className="text-gray-500">•</span>
                <time>{date}</time>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Subcomponent: Article Card
 * Standard article card for grids with image, title, excerpt, and metadata
 */
export interface ArticleCardProps {
  image: string;
  title: string;
  excerpt?: string;
  category?: string;
  author?: string;
  date?: string;
  featured?: boolean; // Larger variant
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  excerpt,
  category,
  author,
  date,
  featured = false,
  onClick,
}) => {
  const baseClass = "group cursor-pointer rounded-lg overflow-hidden";
  const imageHeight = featured ? "h-80" : "h-48";

  return (
    <div onClick={onClick} className={baseClass}>
      {/* Image Container */}
      <div
        className={`relative w-full ${imageHeight} overflow-hidden rounded-lg`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className={`space-y-2 ${featured ? "pt-4" : "pt-3"}`}>
        {/* Category */}
        {category && (
          <div className="text-xs font-bold text-accent uppercase tracking-wider">
            {category}
          </div>
        )}

        {/* Title */}
        <h3
          className={`font-bold text-textPrimary group-hover:text-accent transition-colors line-clamp-3 ${
            featured ? "text-lg lg:text-xl" : "text-base"
          }`}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p
            className={`text-textSecondary line-clamp-2 ${featured ? "text-sm" : "text-xs"}`}
          >
            {excerpt}
          </p>
        )}

        {/* Metadata */}
        {(author || date) && (
          <div
            className={`flex items-center gap-2 text-textSecondary ${
              featured ? "text-xs" : "text-xs"
            }`}
          >
            {author && <span>{author}</span>}
            {date && (
              <>
                <span>•</span>
                <time>{date}</time>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Subcomponent: Grid presets for common article layouts
 */
export interface ArticleGridProps {
  children: React.ReactNode;
  columns?: "auto" | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  children,
  columns = "auto",
  gap = "md",
}) => {
  const colClass =
    columns === "auto"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : columns === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  const gapClass = gap === "sm" ? "gap-4" : gap === "lg" ? "gap-8" : "gap-6";

  return <div className={`grid ${colClass} ${gapClass}`}>{children}</div>;
};
