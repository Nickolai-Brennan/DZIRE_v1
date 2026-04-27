
import { mockDictionary } from '@/data/mockDictionary';
import { usePageTracking } from '@/hooks/usePageTracking';
import { DictionaryTermCard } from '@/components/cards/DictionaryTermCard';
interface Props { slug: string; }
export function DictionaryDetailPage({ slug }: Props) {
  usePageTracking(`dictionary-${slug}`);
  const term = mockDictionary.find(t => t.slug === slug) || mockDictionary[0];
  const related = mockDictionary.filter(t => term.relatedTerms.includes(t.id));
  return (
    
  <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <span className="text-xs text-rose-500 uppercase tracking-widest font-semibold">{term.category}</span>
        <h1 className="text-5xl font-black text-white mt-2 mb-1">{term.term}</h1>
        <p className="text-white/30 italic text-sm mb-6">{term.pronunciation}</p>
        <div className="glass-card p-6 mb-8">
          <p className="text-lg text-white/70 leading-relaxed mb-4">{term.shortDef}</p>
          <p className="text-white/50 leading-relaxed">{term.fullDef}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {term.relatedTerms.map(t=><span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-full text-sm">{t}</span>)}
        </div>
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Related Terms</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(t=><DictionaryTermCard key={t.id} term={t}/>)}
            </div>
          </div>
        )}
      </div>
  </>
);}
