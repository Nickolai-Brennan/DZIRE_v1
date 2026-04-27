import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Trophy } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { track } from '../../utils/track';
import type { Review } from '../../data/types';

interface ReviewCardProps {
  review: Review;
  featured?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, featured = false }) => {
  const scoreColor = review.overallScore >= 9 ? 'text-gold' : review.overallScore >= 7 ? 'text-green-400' : 'text-textPrimary';

  return (
    <div className={`group bg-surface rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col ${review.isTrophy ? 'border-gold/20 hover:border-gold/40' : 'border-white/8 hover:border-primary/30'}`}>
      <div className="relative overflow-hidden aspect-video">
        <img src={review.image} alt={review.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        {review.isTrophy && review.trophyLabel && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gold/90 text-background text-xs font-bold px-3 py-1.5 rounded-full">
            <Trophy className="w-3 h-3" />
            {review.trophyLabel}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Badge variant="category" className="mb-2 self-start">{review.category}</Badge>
        <p className="text-xs text-textMuted mb-1">{review.brand}</p>
        <h3 className={`font-bold text-textPrimary mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>{review.title}</h3>
        <p className="text-sm text-textMuted mb-4 line-clamp-2 flex-1">{review.excerpt}</p>

        <div className="flex items-end justify-between">
          <div>
            <span className={`text-3xl font-black ${scoreColor}`}>{review.overallScore}</span>
            <span className="text-sm text-textMuted">/10</span>
          </div>
          <span className="text-sm text-textMuted">{review.priceRange}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/reviews/${review.slug}`}
            className="flex-1 py-2 text-sm text-center bg-surface hover:bg-surfaceAlt text-textMuted hover:text-textPrimary rounded-lg border border-white/10 transition-colors"
          >
            Read Review
          </Link>
          <a
            href={review.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('affiliate_click', { reviewId: review.id, reviewTitle: review.title })}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm bg-primary hover:bg-accent text-white rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};
