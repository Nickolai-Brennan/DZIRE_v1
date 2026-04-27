import { Trophy } from 'lucide-react';
import type { Review } from '@/data/types';
import { Link } from 'react-router-dom';
interface Props { category: string; review?: Review; }
export function TrophyCard({ category, review }: Props) {
  return (
    <div className="glass-card p-5 flex flex-col items-center text-center gap-3 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors">
      <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
        <Trophy className="w-6 h-6 text-yellow-400"/>
      </div>
      <div>
        <p className="text-xs text-yellow-400 uppercase tracking-widest font-semibold mb-1">{category}</p>
        {review ? (
          <>
            <p className="text-white font-bold">{review.title}</p>
            <p className="text-xs text-white/40 mt-1">{review.category}</p>
            <Link to={`/reviews/${review.slug}`} className="mt-3 inline-block text-xs px-3 py-1.5 bg-rose-500 hover:bg-rose-400 text-white rounded-full transition-colors">Read Review</Link>
          </>
        ) : <p className="text-white/30 text-sm">Coming Soon</p>}
      </div>
    </div>
  );
}
