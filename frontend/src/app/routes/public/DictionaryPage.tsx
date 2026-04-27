
import { PageHero } from '@/components/layout/PageHero';
import { SearchBar } from '@/components/forms/SearchBar';
import { FilterChips } from '@/components/forms/FilterChips';
import { DictionaryTermCard } from '@/components/cards/DictionaryTermCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { mockDictionary } from '@/data/mockDictionary';
import { useFilters } from '@/hooks/useFilters';
import { usePageTracking } from '@/hooks/usePageTracking';
import type { DictionaryTerm } from '@/types/content';
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const CATS = ['Emotional Wellness','Lifestyle','Psychology','Safety & Respect','Wellness'];
export function DictionaryPage() {
  usePageTracking('dictionary');
  const { query, setQuery, activeFilters, toggleFilter, filtered } = useFilters<DictionaryTerm>(
    mockDictionary, (t,q) => t.term.toLowerCase().includes(q) || t.shortDef.toLowerCase().includes(q),
    (t,f) => f.includes(t.category)
  );
  return (
    
  <>
      <PageHero eyebrow="DZIRE Dictionary" title="Know the Language" subtitle="A curated guide to the vocabulary of adult wellness, intimacy, and lifestyle."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <SearchBar value={query} onChange={setQuery} placeholder="Search terms..." className="mb-6"/>
        <div className="mb-6"><FilterChips options={CATS} active={activeFilters} onToggle={toggleFilter}/></div>
        <div className="flex flex-wrap gap-1 mb-8">
          {ALPHA.map(l => <button key={l} className="w-8 h-8 rounded text-xs font-bold bg-white/5 border border-white/10 text-white/50 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all">{l}</button>)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t=><DictionaryTermCard key={t.id} term={t}/>)}
        </div>
        <div className="mt-20 max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-3">DZIRE Newsletter</h3>
          <p className="text-white/40 mb-6">Get new terms, guides and stories delivered to your inbox.</p>
          <NewsletterForm compact/>
        </div>
      </div>
  </>
);}
