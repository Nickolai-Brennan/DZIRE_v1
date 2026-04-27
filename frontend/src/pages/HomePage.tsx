import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { NewsletterForm } from "../components/ui/NewsletterForm";
import { mockDolls } from "../data/mockDolls";
import { mockPositions } from "../data/mockPositions";
import { mockReviews } from "../data/mockReviews";
import { mockDictionary } from "../data/mockDictionary";
import { mockStories } from "../data/mockStories";
import { ArrowRight, Trophy } from "lucide-react";

export const HomePage: React.FC = () => {
  const featuredDolls = mockDolls.filter((d) => d.isFeatured).slice(0, 4);
  const trendingPositions = mockPositions
    .filter((p) => p.isFeatured)
    .slice(0, 4);
  const trophyReviews = mockReviews.filter((r) => r.isTrophy).slice(0, 3);
  const featuredTerms = mockDictionary.filter((t) => t.isFeatured).slice(0, 4);
  const latestStories = mockStories.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-surfaceAlt to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-gold">
            EXPLORE. DESIRE. DZIRE.
          </h1>
          <p className="text-xl text-textMuted mb-10 max-w-2xl mx-auto">
            Your premium guide to modern intimacy, pleasure, and connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/positions">
              <Button variant="primary" className="w-full sm:w-auto">
                Explore Positions
              </Button>
            </Link>
            <Link to="/dzire-dolls">
              <Button variant="secondary" className="w-full sm:w-auto">
                Meet DZIRE Dolls
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured DZIRE Dolls */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-textPrimary">
              Featured DZIRE Dolls
            </h2>
            <Link
              to="/dzire-dolls"
              className="text-primary hover:text-accent transition-colors flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDolls.map((doll) => (
              <Link key={doll.id} to={`/dzire-dolls/${doll.slug}`}>
                <Card hover className="overflow-hidden">
                  <img
                    src={doll.image}
                    alt={doll.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-textPrimary mb-2">
                      {doll.name}
                    </h3>
                    <p className="text-sm text-textMuted mb-4">
                      {doll.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doll.vibeTags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="category">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Positions */}
      <section className="py-20 bg-surfaceAlt/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-textPrimary">
              Trending Positions
            </h2>
            <Link
              to="/positions"
              className="text-primary hover:text-accent transition-colors flex items-center gap-2"
            >
              Browse All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingPositions.map((position) => (
              <Link key={position.id} to={`/positions/${position.slug}`}>
                <Card hover className="overflow-hidden">
                  <img
                    src={position.image}
                    alt={position.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-textPrimary mb-2">
                      {position.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-textMuted">Comfort</span>
                        <span className="text-textPrimary font-bold">
                          {position.comfort}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-textMuted">Intimacy</span>
                        <span className="text-textPrimary font-bold">
                          {position.intimacy}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trophy Hall Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-textPrimary flex items-center gap-3">
              <Trophy className="w-8 h-8 text-gold" />
              Trophy Hall
            </h2>
            <Link
              to="/reviews"
              className="text-primary hover:text-accent transition-colors flex items-center gap-2"
            >
              All Winners <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trophyReviews.map((review) => (
              <Link key={review.id} to={`/reviews/${review.slug}`}>
                <Card hover className="overflow-hidden border-gold/20">
                  <div className="relative">
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full aspect-video object-cover"
                    />
                    <Badge variant="trophy" className="absolute top-4 left-4">
                      {review.trophyLabel}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-textPrimary mb-2">
                      {review.title}
                    </h3>
                    <p className="text-sm text-textMuted mb-4">
                      {review.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">
                        {review.overallScore}
                      </span>
                      <span className="text-sm text-textMuted">
                        Overall Score
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dictionary Preview */}
      <section className="py-20 bg-surfaceAlt/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-textPrimary">
              Sex Dictionary
            </h2>
            <Link
              to="/dictionary"
              className="text-primary hover:text-accent transition-colors flex items-center gap-2"
            >
              Browse Full Dictionary <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTerms.map((term) => (
              <Link key={term.id} to={`/dictionary/${term.slug}`}>
                <Card hover className="p-6">
                  <Badge variant="category" className="mb-4">
                    {term.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    {term.term}
                  </h3>
                  <p className="text-sm text-textMuted">{term.shortDef}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-textPrimary">
              Fantasy Stories
            </h2>
            <Link
              to="/stories"
              className="text-primary hover:text-accent transition-colors flex items-center gap-2"
            >
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestStories.map((story) => (
              <Link key={story.id} to={`/stories/${story.slug}`}>
                <Card hover className="overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6">
                    <Badge variant="category" className="mb-3">
                      {story.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-textPrimary mb-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-textMuted mb-4">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-textMuted">
                      <span>{story.author}</span>
                      <span>{story.readingTime} min read</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-surfaceAlt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-textPrimary mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-textMuted mb-10 max-w-2xl mx-auto">
            Get weekly guides, reviews, and stories delivered to your inbox. No
            spam, just desire.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* VIP CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-textPrimary mb-4">
            Unlock DZIRE VIP Access
          </h2>
          <p className="text-lg text-textMuted mb-8">
            Exclusive content, early access, ad-free experience, and more.
          </p>
          <Link to="/vip">
            <Button variant="gold" className="text-lg px-10 py-4">
              Explore VIP Benefits
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
