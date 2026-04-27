import { useState } from 'react';
import type { Position } from '@/types/content';
import { ScorePill } from '@/components/ui/ScorePill';
import { PositionQuickViewModal } from '@/components/modals/PositionQuickViewModal';
import { track, EVENTS } from '@/lib/tracking';
import { Link } from '@tanstack/react-router';
interface Props { position: Position; }
export function PositionCard({ position }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="glass-card overflow-hidden group flex flex-col">
        <div className="relative aspect-video bg-[#1D1D26]">
          <img src={position.imagePlaceholder} alt={position.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"/>
          <div className="absolute top-2 right-2"><ScorePill score={position.overallScore} size="sm"/></div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-rose-500 uppercase tracking-widest font-semibold mb-1">{position.category}</span>
          <h3 className="text-lg font-bold text-white mb-1">{position.title}</h3>
          <p className="text-sm text-white/50 mb-3 flex-1">{position.shortDescription}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {position.tags.map(t=><span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">{t}</span>)}
          </div>
          <div className="flex gap-2">
            <Link to="/positions/$slug" params={{slug:position.slug}}
              onClick={()=>track(EVENTS.POSITION_FULL_GUIDE,{slug:position.slug})}
              className="flex-1 text-center py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors">
              View Guide
            </Link>
            <button onClick={()=>{setShowModal(true);track(EVENTS.POSITION_POPUP_OPEN,{slug:position.slug});}}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm rounded-lg transition-colors">
              Quick View
            </button>
          </div>
        </div>
      </div>
      {showModal && <PositionQuickViewModal position={position} onClose={()=>setShowModal(false)}/>}
    </>
  );
}
