import { useEffect } from 'react';
import type { Position } from '@/types/content';
import { X, Star } from 'lucide-react';
import { ScorePill } from '@/components/ui/ScorePill';
import { scoreBarColor } from '@/lib/formatters';
import { Link } from '@tanstack/react-router';
interface Props { position: Position; onClose: () => void; }
const RATINGS = [
  { key:'comfortScore', label:'Comfort Score' },{ key:'difficultyScore', label:'Difficulty Score' },
  { key:'energyScore', label:'Energy Level' },{ key:'intimacyScore', label:'Intimacy Score' },
  { key:'flexibilityNeeded', label:'Flexibility Needed' },{ key:'toyCompatibility', label:'Toy Compatibility' },
  { key:'overallScore', label:'Overall DZIRE Score' },
];
export function PositionQuickViewModal({ position, onClose }: Props) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label={`Quick view: ${position.title}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-t-2xl sm:rounded-2xl p-6 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white" aria-label="Close modal"><X className="w-5 h-5"/></button>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <img src={position.imagePlaceholder} alt={position.title} className="w-full rounded-xl mb-4"/>
            <h2 className="text-2xl font-black text-white mb-1">{position.title}</h2>
            <div className="flex flex-wrap gap-1 mb-4">
              {position.keywords.map(k=><span key={k} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded-full">{k}</span>)}
            </div>
            {position.beginnerFriendly && <div className="flex items-center gap-1 text-green-400 text-sm font-semibold mb-4"><Star className="w-4 h-4"/>Beginner Friendly</div>}
          </div>
          <div>
            <p className="text-white/60 text-sm mb-5">{position.shortDescription}</p>
            <div className="space-y-3 mb-6">
              {RATINGS.map(({ key, label }) => {
                const val = position[key as keyof Position] as number;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs text-white/50 mb-1"><span>{label}</span><span className="font-semibold text-white">{val}/10</span></div>
                    <div className="h-1.5 bg-white/10 rounded-full"><div className={`h-full rounded-full ${scoreBarColor(val)}`} style={{width:`${val*10}%`}}/></div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/positions/$slug" params={{slug:position.slug}} onClick={onClose} className="text-center py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Open Full Guide</Link>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm rounded-lg transition-colors">Save Position</button>
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm rounded-lg transition-colors">Find Similar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
