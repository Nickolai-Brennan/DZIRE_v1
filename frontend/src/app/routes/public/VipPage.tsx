
import { track, EVENTS } from '@/lib/tracking';
import { usePageTracking } from '@/hooks/usePageTracking';
import { Lock, Star, Zap, Crown } from 'lucide-react';
const BENEFITS = ['Exclusive DZIRE Doll content drops','VIP-only fiction and essays','Early access to product reviews','Member-only newsletter tier','Locked guide content','Monthly VIP box discount codes'];
const FAQS = [
  { q:'Is VIP content explicit?', a:'DZIRE VIP is editorial and tasteful — premium positioning guides, deeper creator spotlights, and exclusive fiction.' },
  { q:'Can I cancel anytime?', a:'Yes, VIP membership can be cancelled at any time from your account dashboard.' },
  { q:'What payment methods are accepted?', a:'We accept all major credit cards and select digital payment methods.' },
];
export function VipPage() {
  usePageTracking('vip');
  return (
    
  <>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4"/>
        <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-4">Exclusive Access</p>
        <h1 className="text-5xl font-black text-white mb-6">DZIRE VIP</h1>
        <p className="text-lg text-white/50 mb-10">Premium content, early releases, VIP community access, and exclusive DZIRE Doll features.</p>
        <button onClick={()=>track(EVENTS.VIP_CTA_CLICK,{source:'vip_page'})} className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-full text-lg transition-all hover:scale-105">Join VIP — Coming Soon</button>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass-card border border-yellow-400/20 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6"><Star className="w-6 h-6 text-yellow-400"/><h2 className="text-2xl font-black text-white">VIP Benefits</h2></div>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map(b=><div key={b} className="flex items-center gap-2 text-sm text-white/70"><Zap className="w-4 h-4 text-rose-500 flex-shrink-0"/>{b}</div>)}
          </div>
        </div>
        <div className="glass-card p-8 text-center mb-10 border border-white/10">
          <Lock className="w-8 h-8 text-white/20 mx-auto mb-3"/>
          <p className="text-white font-bold mb-2">Pricing Coming Soon</p>
          <p className="text-white/40 text-sm">VIP membership pricing will be announced at launch. Join the newsletter to get early access.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white mb-6">FAQ</h2>
          {FAQS.map(f=>(
            <div key={f.q} className="glass-card p-5">
              <h3 className="font-bold text-white mb-2">{f.q}</h3>
              <p className="text-sm text-white/50">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
  </>
);}
