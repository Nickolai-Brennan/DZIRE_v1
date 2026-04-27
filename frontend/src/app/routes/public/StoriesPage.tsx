
import { PageHero } from '@/components/layout/PageHero';
import { FilterChips } from '@/components/forms/FilterChips';
import { StoryCard } from '@/components/cards/StoryCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { mockStories } from '@/data/mockStories';
import { useFilters } from '@/hooks/useFilters';
import { usePageTracking } from '@/hooks/usePageTracking';
import type { Story } from '@/data/types';
const CATS = ['Romantic Fiction','Literary Erotica','Contemporary Fiction'];
export function StoriesPage() {
  usePageTracking('stories');
  const { activeFilters, toggleFilter, filtered } = useFilters<Story>(
    mockStories, () => true, (s,f) => f.includes(s.category)
  );
  return (
    
  <>
      <PageHero eyebrow="DZIRE Fiction" title="Stories" subtitle="Original adult fiction — romantic, literary, and beautifully written."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <FilterChips options={CATS} active={activeFilters} onToggle={toggleFilter}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filtered.map(s=><StoryCard key={s.id} story={s}/>)}
        </div>
        <div className="mt-16 glass-card border border-rose-500/20 p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">DZIRE Fiction Contest</h3>
          <p className="text-white/50 mb-4">Submit your original adult fiction for a chance to be featured in DZIRE Monthly.</p>
          <a href="/contact" className="inline-block px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Submit Your Story</a>
        </div>
        <div className="mt-16 max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-3">Get New Stories First</h3>
          <NewsletterForm compact/>
        </div>
      </div>
  </>
);}
