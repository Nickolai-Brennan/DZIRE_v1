import { useState, useEffect } from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';
interface Props { onClose: () => void; }
export function AdminLoginModal({ onClose }: Props) {
  const { login, error } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:'', password:'' });
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key==='Escape') onClose(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(form.username, form.password)) { onClose(); navigate('/admin/dashboard'); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Admin Login">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full max-w-sm glass-card p-6 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white" aria-label="Close"><X className="w-4 h-4"/></button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-3"><Lock className="w-6 h-6 text-rose-500"/></div>
          <h2 className="text-xl font-black text-white">Admin Login</h2>
        </div>
        <div className="flex items-start gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg mb-4">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0"/>
          <p className="text-xs text-yellow-400">Temporary admin credentials. Change before production.</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input required value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Username" autoComplete="username"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50" aria-label="Username"/>
          <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" autoComplete="current-password"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50" aria-label="Password"/>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Sign In</button>
        </form>
      </div>
    </div>
  );
}
