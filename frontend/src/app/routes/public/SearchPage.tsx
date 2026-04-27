import { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SearchBar } from '@/components/forms/SearchBar';
import { FilterChips } from '@/components/forms/FilterChips';
import { PositionCard } from '@/components/cards/PositionCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { DollCard } from '@/components/cards/DollCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { mockPositions } from '@/data/mockPositions';
import { mockReviews } from '@/data/mockReviews';
import { mockDolls } from '@/data/mockDolls';
import { track, EVENTS } from '@/lib/tracking';
import { usePageTracking } from '@/hooks/usePageTracking';
const TYPES = ['Positions','Reviews','Creators','Stories','Dictionary'];
const POPULAR = ['beginner positions','luxury vibrators','intimacy guide','DZIRE Dolls'];
export function SearchPage() {
  usePageTracking('search');
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const handleSearch = (v: string) => { setQuery(v); if(v) track(EVENTS.SEARCH_QUERY, { query: v }); };
  const toggle = (f: string) => setActiveFilters(p => p.includes(f) ? p.filter(x=>x!==f) : [...p,f]);
  const lq = query.toLowerCase();
  const posResults = lq ? mockPositions.filter(p => p.title.toLowerCase().includes(lq)) : [];
  const revResults = lq ? mockReviews.filter(r => r.productName.toLowerCase().includes(lq)) : [];
  const dollResults = lq ? mockDolls.filter(d => d.name.toLowerCase().includes(lq)) : [];
  const hasResults = posResults.length+revResults.length+dollResults.length > 0;
  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-black text-white mb-8 text-center">Search DZIRE</h1>
        <SearchBar value={query} onChange={handleSearch} placeholder="Search positions, reviews, creators..." className="mb-4"/>
        <FilterChips options={TYPES} active={activeFilters} onToggle={toggle}/>
        {!query && (
          <div className="mt-8">
            <p className="text-sm text-white/40 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">{POPULAR.map(s=><button key={s} onClick={()=>handleSearch(s)} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-full text-sm transition-colors">{s}</button>)}</div>
          </div>
        )}
        {query && !hasResults && <p className="text-center text-white/30 py-16">No results found for "{query}"</p>}
        {posResults.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-black text-white mb-4">Positions ({posResults.length})</h2>
            <div className="grid sm:grid-cols-3 gap-4">{posResults.map(p=><PositionCard key={p.id} position={p}/>)}</div>
          </div>
        )}
        {revResults.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-black text-white mb-4">Reviews ({revResults.length})</h2>
            <div className="grid sm:grid-cols-3 gap-4">{revResults.map(r=><ReviewCard key={r.id} review={r}/>)}</div>
          </div>
        )}
        {dollResults.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-black text-white mb-4">Creators ({dollResults.length})</h2>
            <div className="grid sm:grid-cols-3 gap-4">{dollResults.map(d=><DollCard key={d.id} doll={d}/>)}</div>
          </div>
        )}
        <div className="mt-20 max-w-lg mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-3">Join the DZIRE Newsletter</h3>
          <NewsletterForm compact/>
        </div>
      </div>
    </PublicLayout>
  );
}
