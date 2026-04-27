import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, BookOpen } from 'lucide-react';
import { ScorePill } from '../ui/ScorePill';
import { track } from '../../utils/track';
import type { Position } from '../../data/types';

interface PositionCardProps {
  position: Position;
  onQuickView?: (position: Position) => void;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position, onQuickView }) => {
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    track('position_popup_open', { positionId: position.id, positionTitle: position.title });
    onQuickView?.(position);
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-surface border border-white/8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={position.image}
          alt={position.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-surface/80 backdrop-blur-sm text-textMuted text-xs px-2 py-1 rounded-full border border-white/10">
            {position.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-textPrimary mb-2">{position.title}</h3>
        <p className="text-sm text-textMuted mb-4 line-clamp-2 flex-1">{position.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <ScorePill label="Comfort" score={position.comfort} />
          <ScorePill label="Energy" score={position.energy} />
          <ScorePill label="Difficulty" score={position.difficulty} />
          <ScorePill label="Intimacy" score={position.intimacy} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-surface hover:bg-surfaceAlt text-textMuted hover:text-textPrimary text-sm border border-white/10 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
          <Link
            to={`/positions/${position.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary hover:bg-accent text-white text-sm transition-colors"
            onClick={() => track('position_full_guide_click', { positionId: position.id })}
          >
            <BookOpen className="w-4 h-4" />
            Full Guide
          </Link>
        </div>
      </div>
    </div>
  );
};
