import { ScorePill } from '@/components/ui/ScorePill';
import { scoreBarColor } from '@/lib/formatters';
import { mockReviews } from '@/data/mockReviews';
import { usePageTracking } from '@/hooks/usePageTracking';
import { track, EVENTS } from '@/lib/tracking';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';
interface Props { slug: string; }
export function ReviewDetailPage({ slug }: Props) {
  usePageTracking(`review-${slug}`);
  const review = mockReviews.find(r => r.slug === slug) || mockReviews[0];
  const related = mockReviews.filter(r => r.id !== review.id && r.category === review.category).slice(0,3);
  const scores = [
    { label:'Ease of Use', val: review.easeOfUse },{ label:'Build Quality', val: review.buildQuality },
    { label:'Beginner Friendly', val: review.beginnerFriendly },{ label:'Value', val: review.valueScore },
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {review.isTrophy && review.trophyLabel && (
        <div className="flex items-center gap-2 mb-4 text-yellow-400 font-bold text-sm"><Trophy className="w-4 h-4"/>{review.trophyLabel}</div>
      )}
      <span className="text-xs text-rose-500 uppercase tracking-widest font-semibold">{review.category}</span>
      <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">{review.title}</h1>
      <img src={review.image} alt={review.title} className="w-full rounded-xl mb-8 aspect-video object-cover"/>
      <div className="glass-card p-4 mb-8 flex items-center justify-between">
        <p className="text-white/60 italic">{review.excerpt}</p>
        <ScorePill score={review.overallScore} label="Overall"/>
      </div>
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-black text-white mb-4">Score Breakdown</h2>
        <div className="space-y-4">
          {scores.map(({label,val})=>(
            <div key={label}>
              <div className="flex justify-between text-sm text-white/50 mb-1.5"><span>{label}</span><span className="font-semibold text-white">{val}/10</span></div>
              <div className="h-2 bg-white/10 rounded-full"><div className={`h-full rounded-full ${scoreBarColor(val)}`} style={{width:`${val*10}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400"/>Pros</h3>
          <ul className="space-y-2">{review.pros.map(p=><li key={p} className="text-sm text-white/60">✓ {p}</li>)}</ul>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400"/>Cons</h3>
          <ul className="space-y-2">{review.cons.map(c=><li key={c} className="text-sm text-white/60">✗ {c}</li>)}</ul>
        </div>
      </div>
      {review.affiliateUrl && (
        <div className="glass-card border border-yellow-400/20 p-6 text-center mb-8">
          <p className="text-white/60 mb-2 text-sm">Ready to purchase? We may earn a commission from affiliate links.</p>
          <a href={review.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
            onClick={()=>track(EVENTS.REVIEW_OFFER_CLICK,{slug:review.slug})}
            className="inline-block px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-full transition-all">
            View Best Price
          </a>
        </div>
      )}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Related Reviews</h2>
          <div className="grid sm:grid-cols-3 gap-4">{related.map(r=><ReviewCard key={r.id} review={r}/>)}</div>
        </div>
      )}
    </div>
  );
}
