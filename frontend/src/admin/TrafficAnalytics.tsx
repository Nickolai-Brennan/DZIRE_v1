/**
 * frontend/src/admin/TrafficAnalytics.tsx
 * Admin traffic analytics page.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';

interface DashboardStats {
  total_posts?: number;
  published_posts?: number;
  draft_posts?: number;
  total_subscribers?: number;
  total_vip_subscriptions?: number;
}

export const TrafficAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: { stats?: DashboardStats }) => setStats(data.stats ?? {}))
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, [navigate]);

  const kpis = [
    { label: 'Total Posts', value: stats.total_posts ?? 0 },
    { label: 'Published', value: stats.published_posts ?? 0 },
    { label: 'Drafts', value: stats.draft_posts ?? 0 },
    { label: 'Newsletter Subscribers', value: stats.total_subscribers ?? 0 },
    { label: 'VIP Subscriptions', value: stats.total_vip_subscriptions ?? 0 },
  ];

  return (
    <AdminLayout title="Traffic Analytics">
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="p-5 bg-surfaceAlt rounded-xl border border-white/10">
                <p className="text-textMuted text-xs mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-textPrimary">{kpi.value}</p>
              </div>
            ))}
          </div>
          <p className="text-textMuted text-sm italic">
            Detailed page-view and click tracking data will appear here as events are recorded.
          </p>
        </div>
      )}
    </AdminLayout>
  );
};
