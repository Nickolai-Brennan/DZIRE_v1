import { Link } from '@tanstack/react-router';
import type { Review } from '@/types/content';
import { ScorePill } from '@/components/ui/ScorePill';
import { track, EVENTS } from '@/lib/tracking';
import { Trophy } from 'lucide-react';
interface Props { review: Review; }
export function ReviewCard({ review }: Props) {
  return (
    <div className="glass-card overflow-hidden flex flex-col">
      <div className="relative aspect-video bg-[#1D1D26]">
        <img src={review.imagePlaceholder} alt={review.productName} className="w-full h-full object-cover opacity-70"/>
        {review.awardBadge && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
            <Trophy className="w-3 h-3"/>{review.awardBadge}
          </div>
        )}
        <div className="absolute top-2 right-2"><ScorePill score={review.overallScore} size="sm"/></div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-rose-500 uppercase tracking-widest font-semibold mb-1">{review.category}</span>
        <h3 className="text-lg font-bold text-white mb-2">{review.productName}</h3>
        <p className="text-sm text-white/50 mb-3 flex-1">{review.excerpt}</p>
        <div className="grid grid-cols-2 gap-1 mb-3">
          {[['Ease',review.easeOfUseScore],['Build',review.buildQualityScore],['Beginner',review.beginnerFriendlyScore],['Value',review.valueScore]].map(([l,v])=>(
            <div key={l} className="flex justify-between text-xs text-white/50 bg-white/5 rounded px-2 py-1">
              <span>{l}</span><span className="text-white font-semibold">{v}/10</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Link to="/reviews/$slug" params={{slug:review.slug}} className="flex-1 text-center py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors">Read Review</Link>
          {review.affiliateUrl && <a href={review.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track(EVENTS.REVIEW_OFFER_CLICK,{slug:review.slug})} className="px-3 py-2 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 text-sm rounded-lg transition-colors">View Offer</a>}
        </div>
      </div>
    </div>
  );
}
