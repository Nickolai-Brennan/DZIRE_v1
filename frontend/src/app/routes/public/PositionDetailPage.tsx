import { PublicLayout } from '@/components/layout/PublicLayout';
import { ScorePill } from '@/components/ui/ScorePill';
import { scoreBarColor } from '@/lib/formatters';
import { mockPositions } from '@/data/mockPositions';
import { usePageTracking } from '@/hooks/usePageTracking';
import { track, EVENTS } from '@/lib/tracking';
import { Star } from 'lucide-react';
interface Props { slug: string; }
const RATINGS = [
  { key:'comfortScore', label:'Comfort Score' },{ key:'difficultyScore', label:'Difficulty Score' },
  { key:'energyScore', label:'Energy Level' },{ key:'intimacyScore', label:'Intimacy Score' },
  { key:'flexibilityNeeded', label:'Flexibility Needed' },{ key:'toyCompatibility', label:'Toy Compatibility' },
];
export function PositionDetailPage({ slug }: Props) {
  usePageTracking(`position-${slug}`);
  const position = mockPositions.find(p => p.slug === slug) || mockPositions[0];
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-4"><span className="text-xs text-rose-500 uppercase tracking-widest font-semibold">{position.category}</span></div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">{position.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">{position.keywords.map(k=><span key={k} className="text-xs px-2 py-1 bg-white/5 border border-white/10 text-white/50 rounded-full">{k}</span>)}</div>
        <img src={position.imagePlaceholder} alt={position.title} className="w-full rounded-xl mb-8 aspect-video object-cover"/>
        {position.beginnerFriendly && <div className="flex items-center gap-2 text-green-400 font-semibold mb-6"><Star className="w-5 h-5"/>Beginner Friendly</div>}
        <p className="text-lg text-white/60 mb-10">{position.shortDescription}</p>
        <div className="glass-card p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-white">DZIRE Score Breakdown</h2>
            <ScorePill score={position.overallScore} label="Overall"/>
          </div>
          <div className="space-y-4">
            {RATINGS.map(({ key, label }) => {
              const val = position[key as keyof typeof position] as number;
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm text-white/50 mb-1.5"><span>{label}</span><span className="font-semibold text-white">{val}/10</span></div>
                  <div className="h-2 bg-white/10 rounded-full"><div className={`h-full rounded-full ${scoreBarColor(val)} transition-all`} style={{width:`${val*10}%`}}/></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {position.tags.map(t=><span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-full text-sm">{t}</span>)}
        </div>
        <div className="mt-10 p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
          <h3 className="text-xl font-black text-white mb-2">Find Compatible Products</h3>
          <p className="text-white/50 mb-4 text-sm">Enhance this experience with curated product recommendations.</p>
          <button onClick={()=>track(EVENTS.AFFILIATE_CLICK,{slug:position.slug})} className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Browse Products</button>
        </div>
      </div>
    </PublicLayout>
  );
}
