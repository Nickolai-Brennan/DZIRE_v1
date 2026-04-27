import { Bell, Search, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
interface Props { title: string; }
export function AdminTopbar({ title }: Props) {
  return (
    <header className="h-14 bg-[#15151C] border-b border-white/8 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-base font-bold text-white">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40"/>
          <input placeholder="Search admin..." className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rose-500/40 w-48" aria-label="Search admin"/>
        </div>
        <Link to="/admin/post-content" className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-400 text-white text-xs font-semibold rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5"/>New Post
        </Link>
        <button className="text-white/40 hover:text-white transition-colors relative" aria-label="Notifications">
          <Bell className="w-5 h-5"/><span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"/>
        </button>
      </div>
    </header>
  );
}
