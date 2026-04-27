import { PublicLayout } from '@/components/layout/PublicLayout';
import { mockDolls } from '@/data/mockDolls';
import { usePageTracking } from '@/hooks/usePageTracking';
import { track, EVENTS } from '@/lib/tracking';
import { DollCard } from '@/components/cards/DollCard';
import { Star, ExternalLink } from 'lucide-react';
interface Props { slug: string; }
export function DollProfilePage({ slug }: Props) {
  usePageTracking(`doll-${slug}`);
  const doll = mockDolls.find(d => d.slug === slug) || mockDolls[0];
  const similar = mockDolls.filter(d => d.id !== doll.id).slice(0,3);
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass-card overflow-hidden mb-8">
          <div className="relative">
            <img src={doll.imagePlaceholder} alt={doll.name} className="w-full h-72 sm:h-96 object-cover"/>
            {doll.isSponsored && <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-sm font-bold px-3 py-1 rounded-full"><Star className="w-4 h-4"/>Sponsored by DZIRE</div>}
            {doll.hasExclusivePromo && <div className="absolute top-4 right-4 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">{doll.promoLabel}</div>}
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-black text-white mb-2">{doll.name}</h1>
            <p className="text-rose-400 text-lg italic mb-4">"{doll.tagline}"</p>
            <div className="flex flex-wrap gap-2 mb-6">{doll.vibeTags.map(t=><span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-full text-sm">{t}</span>)}</div>
            {doll.hasExclusivePromo && (
              <button onClick={()=>track(EVENTS.DOLL_PROMO_CLICK,{slug:doll.slug})}
                className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors mb-8">
                <ExternalLink className="w-4 h-4"/>Claim Exclusive Promo
              </button>
            )}
            <h2 className="text-xl font-black text-white mb-3">About</h2>
            <p className="text-white/60 leading-relaxed mb-8">{doll.about}</p>
            <h2 className="text-xl font-black text-white mb-3">Connect</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {doll.platformLinks.map(l=>(
                <a key={l.platform} href={l.url} target="_blank" rel="noopener noreferrer"
                  onClick={()=>track(EVENTS.AFFILIATE_CLICK,{platform:l.platform,slug:doll.slug})}
                  className="px-4 py-2 glass-card hover:border-rose-500/30 text-white/60 hover:text-white text-sm transition-all">
                  {l.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-6">Similar DZIRE Dolls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {similar.map(d=><DollCard key={d.id} doll={d}/>)}
        </div>
      </div>
    </PublicLayout>
  );
}
