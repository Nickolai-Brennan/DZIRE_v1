import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useNavigate, Link } from '@tanstack/react-router';
import { Flame, Lock, AlertTriangle } from 'lucide-react';
export function AdminLoginPage() {
  const { login, error } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:'', password:'' });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(form.username, form.password)) navigate({ to: '/admin/dashboard' });
  };
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2"><Flame className="w-8 h-8 text-rose-500"/></div>
          <h1 className="text-2xl font-black text-white">DZIRE Admin</h1>
          <p className="text-white/40 text-sm">Secure access for DZIRE administrators.</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-start gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg mb-5">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0"/>
            <p className="text-xs text-yellow-400">Temporary admin credentials. Change before production.</p>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <div><label className="sr-only" htmlFor="username">Username</label>
              <input id="username" required value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Username" autoComplete="username"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50"/></div>
            <div><label className="sr-only" htmlFor="password">Password</label>
              <input id="password" required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50"/></div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">
              <Lock className="w-4 h-4 inline mr-2"/>Sign In
            </button>
          </form>
        </div>
        <div className="text-center mt-4"><Link to="/" className="text-white/30 hover:text-white text-sm transition-colors">← Back to DZIRE</Link></div>
      </div>
    </div>
  );
}
