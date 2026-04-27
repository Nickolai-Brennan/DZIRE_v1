import { PublicLayout } from '@/components/layout/PublicLayout';
import { PageHero } from '@/components/layout/PageHero';
import { DollCard } from '@/components/cards/DollCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { mockDolls } from '@/data/mockDolls';
import { usePageTracking } from '@/hooks/usePageTracking';
export function DollsPage() {
  usePageTracking('dzire-dolls');
  return (
    <PublicLayout>
      <PageHero eyebrow="Creator Discovery" title="DZIRE Dolls" subtitle="Sponsored creators, lifestyle voices, and curated personalities featured on the DZIRE platform."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <section className="mb-16">
          <h2 className="text-2xl font-black text-white mb-6">Featured This Month</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {mockDolls.filter(d=>d.isSponsored).slice(0,2).map(d=>(
              <div key={d.id} className="glass-card overflow-hidden flex flex-col sm:flex-row gap-5 p-5 border border-yellow-400/20">
                <img src={d.imagePlaceholder} alt={d.name} className="w-full sm:w-40 h-48 sm:h-auto object-cover rounded-lg flex-shrink-0"/>
                <div className="flex flex-col justify-center">
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Featured</p>
                  <h3 className="text-2xl font-black text-white mb-2">{d.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{d.tagline}</p>
                  <div className="flex flex-wrap gap-1">{d.vibeTags.map(t=><span key={t} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded-full">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-black text-white mb-6">All Creators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockDolls.map(d=><DollCard key={d.id} doll={d}/>)}
          </div>
        </section>
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-3">Stay Connected</h3>
          <p className="text-white/40 mb-6">Get DZIRE Doll spotlights and exclusive promo drops in your inbox.</p>
          <NewsletterForm compact/>
        </div>
      </div>
    </PublicLayout>
  );
}
