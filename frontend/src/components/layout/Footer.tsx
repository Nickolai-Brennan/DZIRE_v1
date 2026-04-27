import { Link } from '@tanstack/react-router';
import { Flame } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#15151C] border-t border-white/8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 font-black text-lg text-white mb-3"><Flame className="w-5 h-5 text-rose-500"/>DZIRE</div>
            <p className="text-xs text-white/40">A premium adult lifestyle publication. 18+ only.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[['Positions','/positions'],['Reviews','/reviews'],['Dictionary','/dictionary'],['Stories','/stories']].map(([l,h]) => <li key={h}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[['DZIRE Dolls','/dzire-dolls'],['Magazine','/magazine'],['Newsletter','/newsletter'],['VIP','/vip']].map(([l,h]) => <li key={h}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[['Contact','/contact'],['Collaborate','/contact'],['Advertise','/contact']].map(([l,h]) => <li key={h}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} DZIRE. All rights reserved. For adults 18+.</p>
          <p className="text-xs text-white/20">Content is editorial and non-explicit. All affiliate links disclosed.</p>
        </div>
      </div>
    </footer>
  );
}
