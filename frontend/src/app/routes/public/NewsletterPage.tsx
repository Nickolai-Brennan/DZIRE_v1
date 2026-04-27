import { PublicLayout } from '@/components/layout/PublicLayout';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { usePageTracking } from '@/hooks/usePageTracking';
import { Mail, Star, Zap, Lock } from 'lucide-react';
const BENEFITS = [
  { icon:<Star className="w-6 h-6 text-yellow-400"/>, title:'Exclusive Creator Content', desc:'First access to DZIRE Doll features and spotlights.' },
  { icon:<Zap className="w-6 h-6 text-rose-500"/>, title:'Product Discounts', desc:'Early access to deals on reviewed toys and wellness products.' },
  { icon:<Mail className="w-6 h-6 text-blue-400"/>, title:'Early Story Access', desc:'Read upcoming fiction and publication stories before public release.' },
  { icon:<Lock className="w-6 h-6 text-purple-400"/>, title:'VIP Previews', desc:'Sneak peeks at VIP-exclusive content drops.' },
];
export function NewsletterPage() {
  usePageTracking('newsletter');
  return (
    <PublicLayout>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-rose-500 text-sm font-semibold uppercase tracking-widest mb-4">Join the List</p>
        <h1 className="text-5xl font-black text-white mb-6">The DZIRE Newsletter</h1>
        <p className="text-lg text-white/50 mb-10">Get exclusive content from DZIRE Dolls, discounts on toys and reviews, and early access to upcoming publication stories.</p>
        <NewsletterForm/>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-black text-white text-center mb-8">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {BENEFITS.map(b=>(
            <div key={b.title} className="glass-card p-6 flex items-start gap-4">
              <div className="flex-shrink-0">{b.icon}</div>
              <div><h3 className="font-bold text-white mb-1">{b.title}</h3><p className="text-sm text-white/50">{b.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="glass-card p-4 text-center mb-8">
          <p className="text-white/40 text-sm">🔒 Trusted by <span className="text-white font-semibold">3,100+</span> subscribers · No spam · Unsubscribe anytime</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-black text-white mb-4">Ready to Join?</h3>
          <NewsletterForm compact/>
        </div>
      </section>
    </PublicLayout>
  );
}
