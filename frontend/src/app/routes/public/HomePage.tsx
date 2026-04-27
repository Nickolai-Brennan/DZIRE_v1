import { PublicLayout } from '@/components/layout/PublicLayout';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { DollCard } from '@/components/cards/DollCard';
import { PositionCard } from '@/components/cards/PositionCard';
import { TrophyCard } from '@/components/cards/TrophyCard';
import { DictionaryTermCard } from '@/components/cards/DictionaryTermCard';
import { StoryCard } from '@/components/cards/StoryCard';
import { mockDolls } from '@/data/mockDolls';
import { mockPositions } from '@/data/mockPositions';
import { mockReviews } from '@/data/mockReviews';
import { mockDictionaryTerms } from '@/data/mockDictionary';
import { mockStories } from '@/data/mockStories';
import { TROPHY_CATEGORIES } from '@/lib/constants';
import { track, EVENTS } from '@/lib/tracking';
import { Link } from '@tanstack/react-router';
import { usePageTracking } from '@/hooks/usePageTracking';
import { Trophy } from 'lucide-react';
export function HomePage() {
  usePageTracking('homepage');
  const trophyWinners = TROPHY_CATEGORIES.map(cat => ({ cat, review: mockReviews.find(r => r.awardBadge === cat) }));
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D26]/40 to-[#09090B]"/>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-rose-500 text-sm font-semibold uppercase tracking-widest mb-4">Welcome to DZIRE</p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">Desire, Discovery,<br/>and Digital Intimacy</h1>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">DZIRE is a premium adult lifestyle publication for guides, reviews, creator spotlights, stories, and curated experiences.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/positions" onClick={()=>track(EVENTS.CTA_CLICK,{cta:'hero_explore'})} className="px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-full text-lg transition-all hover:scale-105">Explore DZIRE</Link>
            <Link to="/newsletter" onClick={()=>track(EVENTS.CTA_CLICK,{cta:'hero_newsletter'})} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold rounded-full text-lg transition-all">Join Newsletter</Link>
          </div>
        </div>
      </section>
      {/* Featured DZIRE Dolls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white">Featured DZIRE Dolls</h2>
          <Link to="/dzire-dolls" className="text-rose-400 hover:text-rose-300 text-sm font-semibold">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mockDolls.slice(0,4).map(d=><DollCard key={d.id} doll={d}/>)}
        </div>
      </section>
      {/* Trending Positions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white">Trending Positions</h2>
          <Link to="/positions" className="text-rose-400 hover:text-rose-300 text-sm font-semibold">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPositions.slice(0,3).map(p=><PositionCard key={p.id} position={p}/>)}
        </div>
      </section>
      {/* Trophy Hall Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3"><Trophy className="w-7 h-7 text-yellow-400"/><h2 className="text-3xl font-black text-white">Trophy Hall</h2></div>
          <Link to="/reviews" className="text-rose-400 hover:text-rose-300 text-sm font-semibold">See All Reviews →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trophyWinners.map(({cat,review})=><TrophyCard key={cat} category={cat} review={review}/>)}
        </div>
      </section>
      {/* Dictionary Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white">DZIRE Dictionary</h2>
          <Link to="/dictionary" className="text-rose-400 hover:text-rose-300 text-sm font-semibold">Browse All Terms →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDictionaryTerms.slice(0,3).map(t=><DictionaryTermCard key={t.id} term={t}/>)}
        </div>
      </section>
      {/* Latest Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white">Latest Stories</h2>
          <Link to="/stories" className="text-rose-400 hover:text-rose-300 text-sm font-semibold">Read All Stories →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStories.map(s=><StoryCard key={s.id} story={s}/>)}
        </div>
      </section>
      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl font-black text-white mb-3">Join the DZIRE Newsletter</h2>
        <p className="text-white/50 mb-8">Get exclusive content from DZIRE Dolls, discounts on toys and reviews, and early access to upcoming publication stories.</p>
        <NewsletterForm/>
      </section>
      {/* VIP CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card border border-yellow-400/20 p-10 text-center">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Exclusive Access</p>
          <h2 className="text-4xl font-black text-white mb-4">Unlock VIP DZIRE</h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">Premium content, early releases, VIP community access, and exclusive DZIRE Doll features — available only to VIP members.</p>
          <Link to="/vip" onClick={()=>track(EVENTS.VIP_CTA_CLICK,{source:'homepage'})} className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-full text-lg transition-all hover:scale-105">Join VIP Now</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
