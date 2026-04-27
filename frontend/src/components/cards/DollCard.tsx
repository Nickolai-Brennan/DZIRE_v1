import { Link } from 'react-router-dom';
import type { DollProfile } from '@/data/types';
import { track, EVENTS } from '@/lib/tracking';
import { Star } from 'lucide-react';
interface Props { doll: DollProfile; }
export function DollCard({ doll }: Props) {
  return (
    <div className="glass-card overflow-hidden flex flex-col">
      <div className="relative aspect-[3/4] bg-[#1D1D26]">
        <img src={doll.image} alt={doll.name} className="w-full h-full object-cover"/>
        {doll.isSponsored && <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full"><Star className="w-3 h-3"/>Sponsored by DZIRE</div>}
        {doll.isFeatured && <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">Featured</div>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{doll.name}</h3>
        <p className="text-sm text-white/50 mb-3 flex-1">{doll.bio}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {doll.vibeTags.map(t=><span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">{t}</span>)}
        </div>
        <Link to={`/dzire-dolls/${doll.slug}`} onClick={()=>track(EVENTS.DOLL_PROFILE_VIEW,{slug:doll.slug})} className="text-center py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors">View Profile</Link>
      </div>
    </div>
  );
}
