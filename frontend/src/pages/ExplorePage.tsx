import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { mockPositions } from "../data/mockPositions";
import { mockReviews } from "../data/mockReviews";
import { mockStories } from "../data/mockStories";
import { mockDolls } from "../data/mockDolls";
import { SaveToPlaylistButton } from "../components/ui/SaveToPlaylistButton";
import { ArrowRight } from "lucide-react";
import { track } from "../utils/track";

export const ExplorePage: React.FC = () => {
  const featuredPositions = mockPositions
    .filter((p) => p.isFeatured)
    .slice(0, 4);
  const topReviews = mockReviews.slice(0, 3);
  const latestStories = mockStories.slice(0, 3);
  const featuredDolls = mockDolls.filter((d) => d.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">
          Discover
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">
          Explore DZIRE
        </h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Positions, reviews, stories, and creators — all in one place.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
        {/* Positions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">
              Trending Positions
            </h2>
            <Link
              to="/positions"
              className="flex items-center gap-1 text-primary hover:text-accent text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredPositions.map((p) => (
              <div key={p.id} className="relative">
                <Link
                  to={`/positions/${p.slug}`}
                  onClick={() =>
                    track("mixed_card_click", { type: "position", id: p.id })
                  }
                >
                  <Card hover className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-4">
                      <Badge variant="category" className="mb-2">
                        Position
                      </Badge>
                      <h3 className="font-bold text-textPrimary text-sm">
                        {p.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
                <div className="absolute top-2 right-2">
                  <SaveToPlaylistButton
                    item={{
                      id: p.id,
                      type: "position",
                      title: p.title,
                      slug: p.slug,
                      image: p.image,
                    }}
                    label=""
                    className="!p-1.5 !rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">Top Reviews</h2>
            <Link
              to="/reviews"
              className="flex items-center gap-1 text-primary hover:text-accent text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topReviews.map((r) => (
              <Link
                key={r.id}
                to={`/reviews/${r.slug}`}
                onClick={() =>
                  track("mixed_card_click", { type: "review", id: r.id })
                }
              >
                <Card hover className="overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <Badge variant="category" className="mb-2">
                      Review
                    </Badge>
                    <h3 className="font-bold text-textPrimary text-sm mb-1">
                      {r.title}
                    </h3>
                    <p className="text-xs text-gold">{r.overallScore}/10</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">
              Fantasy Stories
            </h2>
            <Link
              to="/stories"
              className="flex items-center gap-1 text-primary hover:text-accent text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latestStories.map((s) => (
              <Link
                key={s.id}
                to={`/stories/${s.slug}`}
                onClick={() =>
                  track("mixed_card_click", { type: "story", id: s.id })
                }
              >
                <Card hover className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <Badge variant="category" className="mb-2">
                      {s.category}
                    </Badge>
                    <h3 className="font-bold text-textPrimary text-sm">
                      {s.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* DZIRE Dolls */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">DZIRE Dolls</h2>
            <Link
              to="/dzire-dolls"
              className="flex items-center gap-1 text-primary hover:text-accent text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredDolls.map((d) => (
              <Link
                key={d.id}
                to={`/dzire-dolls/${d.slug}`}
                onClick={() =>
                  track("mixed_card_click", { type: "model", id: d.id })
                }
              >
                <Card hover className="overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-textPrimary text-sm">
                      {d.name}
                    </h3>
                    <p className="text-xs text-textMuted mt-1">
                      {d.vibeTags[0]}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-3xl font-bold text-textPrimary mb-3">
            Find Your Style
          </h2>
          <p className="text-textMuted mb-6">
            Answer a few quick questions to get personalised recommendations.
          </p>
          <Link to="/quiz">
            <Button variant="primary" className="text-lg px-8 py-4">
              Take the Quiz
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};
