/**
 * frontend/src/pages/admin/AdminDashboardPage.tsx
 * Admin dashboard — placeholder page protected by auth guard.
 * Redirects to /admin/login if no valid token is present.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { adminMe, adminLogout } from '../../lib/api/admin';
import { getAdminToken, clearAdminToken, isAdminAuthenticated } from '../../lib/auth/token';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    adminMe(token)
      .then((user) => setUsername(user.username))
      .catch(() => {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
      });
  }, [navigate]);

  const handleLogout = async () => {
    const token = getAdminToken();
    if (token) {
      try {
        await adminLogout(token);
      } catch {
        // ignore — proceed with client-side logout
      }
    }
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-surfaceAlt px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          <span className="text-textPrimary font-semibold">DZIRE Admin</span>
        </div>
        {username && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-textMuted">
              Signed in as <strong className="text-textPrimary">{username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-textMuted hover:text-textPrimary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold text-textPrimary mb-2">
          Dashboard
        </h1>
        <p className="text-textMuted">
          Admin dashboard — coming soon. More sections will be added in Phase 3+.
        </p>
      </main>
    </div>
  );
};
