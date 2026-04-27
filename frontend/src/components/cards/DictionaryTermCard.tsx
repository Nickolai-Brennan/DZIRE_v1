import { Link } from '@tanstack/react-router';
import type { DictionaryTerm } from '@/types/content';
interface Props { term: DictionaryTerm; }
export function DictionaryTermCard({ term }: Props) {
  return (
    <div className="glass-card p-5">
      <span className="text-xs text-rose-500 uppercase tracking-widest font-semibold">{term.category}</span>
      <h3 className="text-xl font-bold text-white mt-1">{term.term}</h3>
      <p className="text-xs text-white/30 mb-3 italic">{term.pronunciation}</p>
      <p className="text-sm text-white/60 mb-4">{term.shortDefinition}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {term.tags.map(t=><span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">{t}</span>)}
      </div>
      <Link to="/dictionary/$slug" params={{slug:term.slug}} className="text-sm text-rose-400 hover:text-rose-300 font-semibold transition-colors">Read More →</Link>
    </div>
  );
}
