/**
 * frontend/src/admin/AdminLayout.tsx
 * Shared admin dashboard layout with sidebar navigation.
 */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Search,
  Tag,
  TrendingUp,
  Megaphone,
  Share2,
  Link2,
  Building2,
  Mail,
  Crown,
  LogOut,
} from "lucide-react";
import { adminLogout } from "../lib/api/admin";
import { clearAdminToken, getAdminToken } from "../lib/auth/token";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Post Editor", path: "/admin/editor", icon: PenSquare },
  { label: "SEO Reports", path: "/admin/seo", icon: Search },
  { label: "Keyword / Tags", path: "/admin/keywords", icon: Tag },
  { label: "Traffic Analytics", path: "/admin/analytics", icon: TrendingUp },
  { label: "Marketing", path: "/admin/marketing", icon: Megaphone },
  { label: "Advertising", path: "/admin/advertising", icon: Building2 },
  { label: "Social Media", path: "/admin/social", icon: Share2 },
  { label: "Affiliates", path: "/admin/affiliates", icon: Link2 },
  { label: "Sponsors", path: "/admin/sponsors", icon: Building2 },
  { label: "Newsletter", path: "/admin/newsletter", icon: Mail },
  { label: "VIP", path: "/admin/vip", icon: Crown },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = getAdminToken();
    if (token) {
      try {
        await adminLogout(token);
      } catch {
        /* ignore */
      }
    }
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-surfaceAlt border-r border-white/10 flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-textPrimary font-bold text-lg">
            DZIRE Admin
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 space-y-0.5 px-3">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-textMuted hover:text-textPrimary hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-textMuted hover:text-textPrimary hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {title && (
          <header className="px-8 py-5 border-b border-white/10">
            <h1 className="text-xl font-semibold text-textPrimary">{title}</h1>
          </header>
        )}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};
