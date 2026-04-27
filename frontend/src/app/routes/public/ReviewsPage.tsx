import { PublicLayout } from '@/components/layout/PublicLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SearchBar } from '@/components/forms/SearchBar';
import { FilterChips } from '@/components/forms/FilterChips';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { TrophyCard } from '@/components/cards/TrophyCard';
import { mockReviews } from '@/data/mockReviews';
import { TROPHY_CATEGORIES } from '@/lib/constants';
import { useFilters } from '@/hooks/useFilters';
import { usePageTracking } from '@/hooks/usePageTracking';
import type { Review } from '@/types/content';
import { Trophy, ShieldCheck } from 'lucide-react';
const CATS = ['Vibrators','Couples','Beginner Kits','Wands','Sets','Pulse'];
export function ReviewsPage() {
  usePageTracking('reviews');
  const { query, setQuery, activeFilters, toggleFilter, filtered } = useFilters<Review>(
    mockReviews, (r,q) => r.productName.toLowerCase().includes(q), (r,f) => f.includes(r.category)
  );
  return (
    <PublicLayout>
      {/* Trophy Hall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-6"><Trophy className="w-7 h-7 text-yellow-400"/><h2 className="text-3xl font-black text-white">DZIRE Trophy Hall of Fame</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {TROPHY_CATEGORIES.map(cat=><TrophyCard key={cat} category={cat} review={mockReviews.find(r=>r.awardBadge===cat)}/>)}
        </div>
      </section>
      <PageHero eyebrow="Product Reviews" title="DZIRE Reviews" subtitle="In-depth, honest reviews of premium intimate wellness products."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['Editorially Independent','All Products Tested','Affiliate Disclosed','Expert Reviewed'].map(b=>(
            <div key={b} className="flex items-center gap-1.5 px-3 py-1.5 glass-card text-sm text-white/60"><ShieldCheck className="w-4 h-4 text-green-400"/>{b}</div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchBar value={query} onChange={setQuery} placeholder="Search products..." className="flex-1"/>
        </div>
        <div className="mb-8"><FilterChips options={CATS} active={activeFilters} onToggle={toggleFilter}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r=><ReviewCard key={r.id} review={r}/>)}
        </div>
        <div className="mt-16 glass-card border border-rose-500/20 p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">Want to be featured?</h3>
          <p className="text-white/50 mb-4">Submit your product for a DZIRE editorial review consideration.</p>
          <a href="/contact" className="inline-block px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Submit for Review</a>
        </div>
      </div>
    </PublicLayout>
  );
}
