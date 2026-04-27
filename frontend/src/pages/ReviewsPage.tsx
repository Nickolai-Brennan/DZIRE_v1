import React, { useState, useMemo } from "react";
import { Trophy } from "lucide-react";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { TrophyCard } from "../components/ui/TrophyCard";
import { FilterChips } from "../components/ui/FilterChips";
import { mockReviews } from "../data/mockReviews";

const TROPHY_AWARDS = [
  { id: "Best Overall", label: "Best Overall" },
  { id: "Best Beginner Pick", label: "Best Beginner Pick" },
  { id: "Best Value", label: "Best Value" },
  { id: "Most Luxurious", label: "Most Luxurious" },
  { id: "Best for Couples", label: "Best for Couples" },
  { id: "Editor's Favorite", label: "Editor's Favorite" },
];

const CATEGORY_FILTERS = [
  "All",
  "Vibrators",
  "Couples",
  "Clitoral",
  "Wearables",
];

export const ReviewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const trophyWinners = TROPHY_AWARDS.map((award) => ({
    award: award.label,
    review:
      mockReviews.find((r) => r.awards.includes(award.id)) || mockReviews[0],
  }));

  const filtered = useMemo(() => {
    if (activeCategory === "All") return mockReviews;
    return mockReviews.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-gold text-sm uppercase tracking-widest mb-3">
          DZIRE Reviews
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">
          Product Reviews
        </h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Honest, research-backed reviews to help you find the perfect products.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trophy Hall */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-gold" />
            <h2 className="text-3xl font-black text-textPrimary">
              DZIRE Trophy Hall of Fame
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trophyWinners.map(({ award, review }) => (
              <TrophyCard
                key={award}
                award={award}
                productName={review.title}
                brand={review.brand}
                slug={review.slug}
                score={review.overallScore}
                image={review.image}
              />
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[
            "Editorial Independence",
            "Expert-Tested",
            "Community Rated",
            "No Pay-to-Win Reviews",
            "Updated Regularly",
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm text-textMuted"
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <FilterChips
            filters={CATEGORY_FILTERS}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Review Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">
            {activeCategory === "All"
              ? "All Reviews"
              : `${activeCategory} Reviews`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
