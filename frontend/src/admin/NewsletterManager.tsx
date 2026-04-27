/**
 * frontend/src/admin/NewsletterManager.tsx
 * Admin newsletter subscriber and campaign manager.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';

interface Subscriber {
  id: string;
  email: string;
  first_name?: string;
  source?: string;
  status: string;
  is_vip: boolean;
  created_at: string;
}

export const NewsletterManager: React.FC = () => {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch('/api/newsletter/subscribers', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Subscriber[]) => setSubscribers(data))
      .catch(() => setSubscribers([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="Newsletter Manager">
      <div className="mb-4">
        <p className="text-textMuted text-sm">{subscribers.length} subscribers</p>
      </div>

      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && subscribers.length === 0 && (
        <p className="text-textMuted italic">No subscribers yet.</p>
      )}

      {subscribers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-textMuted text-left">
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Source</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">VIP</th>
                <th className="pb-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subscribers.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 pr-4 text-textPrimary">{s.email}</td>
                  <td className="py-3 pr-4 text-textMuted">{s.first_name ?? '—'}</td>
                  <td className="py-3 pr-4 text-textMuted">{s.source ?? '—'}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-medium ${s.status === 'active' ? 'text-green-400' : 'text-textMuted'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-textMuted">{s.is_vip ? '✓' : '—'}</td>
                  <td className="py-3 text-textMuted">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};
