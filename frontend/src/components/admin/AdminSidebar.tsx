import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart2, TrendingUp, Search, Tag, Mail, Users, Globe, PieChart, Calendar, PenLine, FileText, DollarSign, Star, Settings, Flame, LogOut } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard:<LayoutDashboard className="w-4 h-4"/>, BarChart2:<BarChart2 className="w-4 h-4"/>,
  TrendingUp:<TrendingUp className="w-4 h-4"/>, Search:<Search className="w-4 h-4"/>,
  Tag:<Tag className="w-4 h-4"/>, Mail:<Mail className="w-4 h-4"/>, Users:<Users className="w-4 h-4"/>,
  Globe:<Globe className="w-4 h-4"/>, PieChart:<PieChart className="w-4 h-4"/>,
  Calendar:<Calendar className="w-4 h-4"/>, PenLine:<PenLine className="w-4 h-4"/>,
  FileText:<FileText className="w-4 h-4"/>, DollarSign:<DollarSign className="w-4 h-4"/>,
  Star:<Star className="w-4 h-4"/>, Settings:<Settings className="w-4 h-4"/>,
};
import { ADMIN_ROUTES } from '@/lib/constants';
export function AdminSidebar({ collapsed=false }: { collapsed?: boolean }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/admin/login'); };
  return (
    <aside className={`h-screen sticky top-0 bg-[#15151C] border-r border-white/8 flex flex-col transition-all ${collapsed?'w-16':'w-56'}`}>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/8">
        <Flame className="w-5 h-5 text-rose-500 flex-shrink-0"/>
        {!collapsed && <span className="font-black text-white">DZIRE Admin</span>}
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {ADMIN_ROUTES.map(r => (
          <NavLink key={r.href} to={r.href}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'text-white bg-rose-500/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
            {ICON_MAP[r.icon]}{!collapsed && <span>{r.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/8">
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
          <LogOut className="w-4 h-4"/>{!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}
