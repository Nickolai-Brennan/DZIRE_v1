import { PublicLayout } from '@/components/layout/PublicLayout';
import { PageHero } from '@/components/layout/PageHero';
import { usePageTracking } from '@/hooks/usePageTracking';
import { Star, BookOpen, Package, Megaphone, Link2, Shield, HelpCircle, Newspaper } from 'lucide-react';
const CARDS = [
  { icon:<Star className="w-6 h-6 text-yellow-400"/>, title:'Become a DZIRE Doll', desc:'Apply to be featured as a sponsored creator on the DZIRE platform.' },
  { icon:<BookOpen className="w-6 h-6 text-rose-500"/>, title:'Submit a Story', desc:'Send original fiction for editorial review and publication consideration.' },
  { icon:<Package className="w-6 h-6 text-blue-400"/>, title:'Send Product for Review', desc:'Submit intimate wellness products for an editorial DZIRE review.' },
  { icon:<Megaphone className="w-6 h-6 text-purple-400"/>, title:'Sponsor a Feature', desc:'Sponsor content placements, spotlights, and newsletter features.' },
  { icon:<Link2 className="w-6 h-6 text-green-400"/>, title:'Affiliate Partnership', desc:'Become an affiliate partner and earn commission on referred sales.' },
  { icon:<Shield className="w-6 h-6 text-yellow-400"/>, title:'VIP Support', desc:'Priority support and assistance for VIP members.' },
  { icon:<HelpCircle className="w-6 h-6 text-white/40"/>, title:'General Questions', desc:'Have a question? Reach out to the DZIRE team.' },
  { icon:<Newspaper className="w-6 h-6 text-rose-400"/>, title:'Press / Media', desc:'Media inquiries, editorial collaboration, and press requests.' },
];
export function ContactPage() {
  usePageTracking('contact');
  return (
    <PublicLayout>
      <PageHero eyebrow="Get in Touch" title="Contact & Collaborate" subtitle="Partner with DZIRE as a creator, sponsor, affiliate, or submit your content."/>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map(c=>(
            <button key={c.title} className="glass-card p-6 text-left hover:border-rose-500/30 transition-all group">
              <div className="mb-3">{c.icon}</div>
              <h3 className="font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">{c.title}</h3>
              <p className="text-sm text-white/50">{c.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
