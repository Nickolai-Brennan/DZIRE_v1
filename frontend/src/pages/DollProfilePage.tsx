import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  ExternalLink,
  Heart,
  Mail,
  Lock,
} from "lucide-react";
import { mockDolls } from "../data/mockDolls";
import { mockPositions } from "../data/mockPositions";
import { mockReviews } from "../data/mockReviews";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SaveToPlaylistButton } from "../components/ui/SaveToPlaylistButton";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { NewsletterForm } from "../components/ui/NewsletterForm";
import { track } from "../utils/track";

export const DollProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const doll = mockDolls.find((d) => d.slug === slug);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isVip } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!doll) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">
          Profile Not Found
        </h1>
        <Link to="/dzire-dolls" className="text-primary hover:underline">
          Back to DZIRE Dolls
        </Link>
      </div>
    );
  }

  const recommendedPositions = mockPositions.slice(0, 3);
  const featuredProducts = mockReviews.filter((r) =>
    doll.featuredProducts.includes(r.id),
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    track("model_share", { dollSlug: slug });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExternalClick = (platform: string) => {
    track("model_external_click", { dollSlug: slug, platform });
  };

  const handlePromoClick = () => {
    track("model_external_click", { dollSlug: slug, type: "promo" });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          to="/dzire-dolls"
          className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DZIRE Dolls
        </Link>
      </div>

      {/* Profile Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-80 shrink-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src={doll.image}
                alt={doll.name}
                className="w-full h-full object-cover"
              />
              {doll.isSponsored && (
                <Badge variant="trophy" className="absolute top-4 left-4">
                  Sponsored
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-black text-textPrimary">
                  {doll.name}
                </h1>
                <p className="text-lg text-textMuted mt-1">{doll.tagline}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() =>
                    toggleFavorite({
                      id: doll.id,
                      type: "model",
                      title: doll.name,
                      slug: doll.slug,
                      image: doll.image,
                    })
                  }
                  className={`p-2 rounded-xl border border-white/10 transition-colors ${isFavorite(doll.id) ? "text-red-400 bg-red-500/10" : "text-textMuted hover:text-textPrimary"}`}
                  title="Follow"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-white/10 text-textMuted hover:text-textPrimary transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {copied && (
              <p className="text-sm text-primary mb-2">Link copied!</p>
            )}

            <div className="flex flex-wrap gap-2 mb-5">
              {doll.vibeTags.map((tag) => (
                <Badge key={tag} variant="category">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-textMuted leading-relaxed mb-6">{doll.bio}</p>

            {/* Platforms */}
            <div className="flex flex-wrap gap-3 mb-6">
              {doll.platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleExternalClick(platform.name)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surfaceAlt border border-white/10 text-sm text-textPrimary hover:border-primary/50 transition-colors"
                >
                  {platform.name}
                  <ExternalLink className="w-3 h-3 text-textMuted" />
                </a>
              ))}
            </div>

            {/* Promo CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-5">
              <p className="text-sm font-bold text-textPrimary mb-1">
                Exclusive Offer
              </p>
              <p className="text-sm text-textMuted mb-3">
                Visit {doll.name}'s exclusive platform for special content.
              </p>
              <a
                href={doll.promoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePromoClick}
              >
                <Button variant="primary" className="flex items-center gap-2">
                  Visit {doll.name} <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Positions */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-6">
          Recommended by {doll.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedPositions.map((position) => (
            <div key={position.id} className="relative">
              <Link
                to={`/positions/${position.slug}`}
                onClick={() =>
                  track("model_recommendation_view", {
                    dollSlug: slug,
                    positionId: position.id,
                  })
                }
              >
                <Card hover className="overflow-hidden">
                  <img
                    src={position.image}
                    alt={position.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-textPrimary text-sm mb-1">
                      {position.title}
                    </h3>
                    <p className="text-xs text-textMuted">
                      Intimacy: {position.intimacy}/10
                    </p>
                  </div>
                </Card>
              </Link>
              <div className="absolute top-2 right-2">
                <SaveToPlaylistButton
                  item={{
                    id: position.id,
                    type: "position",
                    title: position.title,
                    slug: position.slug,
                    image: position.image,
                  }}
                  label=""
                  className="!p-1.5 !rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">
            {doll.name}'s Favourite Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProducts.map((review) => (
              <Link key={review.id} to={`/reviews/${review.slug}`}>
                <Card hover className="p-5 flex gap-4">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <p className="font-bold text-textPrimary text-sm">
                      {review.title}
                    </p>
                    <p className="text-xs text-textMuted">{review.brand}</p>
                    <p className="text-xs text-gold mt-1">
                      {review.overallScore}/10
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* VIP Content Gate */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          VIP Gallery Preview
        </h2>
        {isVip ? (
          <div className="bg-surface rounded-2xl border border-gold/20 p-8 text-center">
            <p className="text-textMuted">
              Exclusive VIP gallery content will be displayed here.
            </p>
          </div>
        ) : (
          <div className="relative bg-surface rounded-2xl border border-white/10 p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10 gap-3">
              <Lock className="w-8 h-8 text-gold" />
              <p className="font-bold text-textPrimary">VIP Only Content</p>
              <p className="text-sm text-textMuted mb-2">
                Upgrade to view exclusive gallery previews
              </p>
              <Link
                to="/vip"
                onClick={() =>
                  track("upgrade_prompt_view", { from: "doll_profile" })
                }
              >
                <Button variant="gold">Upgrade to VIP</Button>
              </Link>
            </div>
            <p className="text-textMuted opacity-20">
              Exclusive content preview
            </p>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-surfaceAlt rounded-2xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-textPrimary">
              Get Exclusive Drops
            </h2>
          </div>
          <p className="text-textMuted mb-5">
            Subscribe to get notified when {doll.name} drops new content.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};
