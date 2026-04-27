import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Flame } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-black text-xl text-white">
          <Flame className="w-6 h-6 text-rose-500" />
          <span>DZIRE</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <Link key={l.href} to={l.href} className="text-sm text-white/60 hover:text-white transition-colors" activeProps={{className:'text-rose-400'}}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/vip" className="hidden sm:block px-4 py-1.5 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-full transition-colors">VIP</Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white/60 hover:text-white" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-[#15151C] border-t border-white/8 px-4 py-4 space-y-2">
          {NAV_LINKS.map(l => (
            <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)}
              className="block py-2 text-white/70 hover:text-white transition-colors">{l.label}</Link>
          ))}
          <Link to="/vip" onClick={() => setMobileOpen(false)} className="block mt-3 px-4 py-2 bg-rose-500 text-white text-center font-semibold rounded-lg">VIP Access</Link>
        </div>
      )}
    </header>
  );
}
