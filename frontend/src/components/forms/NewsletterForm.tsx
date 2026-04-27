import { useState } from 'react';
import { track, EVENTS } from '@/lib/tracking';
const INTERESTS = ['Positions','Reviews','DZIRE Dolls','Stories','Magazine','VIP','Dictionary','Wellness'];
export function NewsletterForm({ compact=false }: { compact?: boolean }) {
  const [form, setForm] = useState({ firstName:'',email:'' });
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const toggle = (i: string) => setSelected(p => p.includes(i) ? p.filter(x=>x!==i) : [...p,i]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    track(EVENTS.NEWSLETTER_SIGNUP, { ...form, interests: selected });
    setSubmitted(true);
  };
  if (submitted) return <div className="text-center py-8"><p className="text-xl font-bold text-rose-500">You're in! 🖤</p><p className="text-white/50 mt-2">Welcome to DZIRE. Check your inbox.</p></div>;
  return (
    <form onSubmit={submit} className="space-y-4">
      {!compact && <div className="flex flex-wrap gap-2 mb-2">{INTERESTS.map(i=><button type="button" key={i} onClick={()=>toggle(i)} className={`px-3 py-1 rounded-full text-sm border transition-all ${selected.includes(i)?'bg-rose-500 border-rose-500 text-white':'bg-white/5 border-white/10 text-white/60'}`}>{i}</button>)}</div>}
      <div className="flex flex-col sm:flex-row gap-3">
        <input required value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="First Name" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50" aria-label="First Name"/>
        <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email Address" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50" aria-label="Email Address"/>
        <button type="submit" className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">Join DZIRE</button>
      </div>
    </form>
  );
}
