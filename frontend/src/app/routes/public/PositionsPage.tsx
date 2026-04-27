import { PublicLayout } from '@/components/layout/PublicLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SearchBar } from '@/components/forms/SearchBar';
import { FilterChips } from '@/components/forms/FilterChips';
import { PositionCard } from '@/components/cards/PositionCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { mockPositions } from '@/data/mockPositions';
import { useFilters } from '@/hooks/useFilters';
import { usePageTracking } from '@/hooks/usePageTracking';
import { track, EVENTS } from '@/lib/tracking';
import type { Position } from '@/types/content';
const CATEGORIES = ['Classic','Elevated','Active','Relaxed','Advanced'];
export function PositionsPage() {
  usePageTracking('positions');
  const { query, setQuery, activeFilters, toggleFilter, filtered } = useFilters<Position>(
    mockPositions,
    (p,q) => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.tags.some(t=>t.toLowerCase().includes(q)),
    (p,f) => f.includes(p.category)
  );
  const handleQuery = (v: string) => { setQuery(v); if(v) track(EVENTS.SEARCH_QUERY,{query:v,page:'positions'}); };
  const handleFilter = (f: string) => { toggleFilter(f); track(EVENTS.FILTER_USED,{filter:f,page:'positions'}); };
  return (
    <PublicLayout>
      <PageHero eyebrow="DZIRE Guides" title="Position Archive" subtitle="Explore our curated collection of intimate position guides with detailed scoring and compatibility insights."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchBar value={query} onChange={handleQuery} placeholder="Search positions..." className="flex-1"/>
        </div>
        <div className="mb-8"><FilterChips options={CATEGORIES} active={activeFilters} onToggle={handleFilter}/></div>
        <p className="text-white/40 text-sm mb-6">{filtered.length} positions found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p=><PositionCard key={p.id} position={p}/>)}
        </div>
        <div className="mt-20 max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-3">Stay Updated</h3>
          <p className="text-white/40 mb-6">Get new position guides delivered to your inbox.</p>
          <NewsletterForm compact/>
        </div>
      </div>
    </PublicLayout>
  );
}
