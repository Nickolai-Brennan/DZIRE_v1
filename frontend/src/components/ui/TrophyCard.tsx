import React from "react";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";

interface TrophyCardProps {
  award: string;
  productName: string;
  brand: string;
  slug: string;
  score: number;
  image: string;
}

export const TrophyCard: React.FC<TrophyCardProps> = ({
  award,
  productName,
  brand,
  slug,
  score,
  image,
}) => {
  return (
    <Link to={`/reviews/${slug}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden bg-surface border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-gold/90 text-background px-3 py-1.5 rounded-full">
          <Trophy className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{award}</span>
        </div>
        <div className="p-5">
          <p className="text-xs text-textMuted mb-1">{brand}</p>
          <h3 className="text-lg font-bold text-textPrimary mb-2">
            {productName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gold">{score}</span>
            <span className="text-sm text-textMuted">/10</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
