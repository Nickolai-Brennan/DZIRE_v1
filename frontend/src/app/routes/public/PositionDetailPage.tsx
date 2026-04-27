import { ScorePill } from '@/components/ui/ScorePill';
import { scoreBarColor } from '@/lib/formatters';
import { mockPositions } from '@/data/mockPositions';
import { usePageTracking } from '@/hooks/usePageTracking';
import { track, EVENTS } from '@/lib/tracking';
import type { Position } from '@/data/types';
interface Props { slug: string; }
const RATINGS: { key: keyof Position; label: string }[] = [
  { key:'comfort', label:'Comfort' },{ key:'difficulty', label:'Difficulty' },
  { key:'energy', label:'Energy Level' },{ key:'intimacy', label:'Intimacy' },
];
export function PositionDetailPage({ slug }: Props) {
  usePageTracking(`position-${slug}`);
  const position = mockPositions.find(p => p.slug === slug) || mockPositions[0];
  const overallScore = Math.round(((position.comfort + position.energy + position.intimacy + (10 - position.difficulty)) / 4) * 10) / 10;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-4"><span className="text-xs text-rose-500 uppercase tracking-widest font-semibold">{position.category}</span></div>
      <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">{position.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">{position.keywords.map(k=><span key={k} className="text-xs px-2 py-1 bg-white/5 border border-white/10 text-white/50 rounded-full">{k}</span>)}</div>
      <img src={position.image} alt={position.title} className="w-full rounded-xl mb-8 aspect-video object-cover"/>
      <p className="text-lg text-white/60 mb-10">{position.description}</p>
      <div className="glass-card p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white">DZIRE Score Breakdown</h2>
          <ScorePill score={overallScore} label="Overall"/>
        </div>
        <div className="space-y-4">
          {RATINGS.map(({ key, label }) => {
            const val = position[key] as number;
            return (
              <div key={key}>
                <div className="flex justify-between text-sm text-white/50 mb-1.5"><span>{label}</span><span className="font-semibold text-white">{val}/10</span></div>
                <div className="h-2 bg-white/10 rounded-full"><div className={`h-full rounded-full ${scoreBarColor(val)} transition-all`} style={{width:`${val*10}%`}}/></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
        <h3 className="text-xl font-black text-white mb-2">Find Compatible Products</h3>
        <p className="text-white/50 mb-4 text-sm">Enhance this experience with curated product recommendations.</p>
        <button onClick={()=>track(EVENTS.AFFILIATE_CLICK,{slug:position.slug})} className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Browse Products</button>
      </div>
    </div>
  );
}
