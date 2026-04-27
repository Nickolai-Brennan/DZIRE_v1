/**
 * frontend/src/admin/AffiliateManager.tsx
 * Admin affiliate partner and link manager.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';

interface Affiliate {
  id: string;
  name: string;
  website?: string;
  contact_email?: string;
  network?: string;
  commission_rate?: number;
  status: string;
}

export const AffiliateManager: React.FC = () => {
  const navigate = useNavigate();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch('/api/affiliates', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Affiliate[]) => setAffiliates(data))
      .catch(() => setAffiliates([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  const statusColor = (status: string) =>
    status === 'active' ? 'text-green-400' : status === 'pending' ? 'text-yellow-400' : 'text-textMuted';

  return (
    <AdminLayout title="Affiliate Manager">
      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && affiliates.length === 0 && (
        <p className="text-textMuted italic">No affiliate partners yet.</p>
      )}

      {affiliates.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-textMuted text-left">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Network</th>
                <th className="pb-3 pr-4 font-medium">Commission</th>
                <th className="pb-3 pr-4 font-medium">Contact</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {affiliates.map((a) => (
                <tr key={a.id}>
                  <td className="py-3 pr-4 text-textPrimary">{a.name}</td>
                  <td className="py-3 pr-4 text-textMuted">{a.network ?? '—'}</td>
                  <td className="py-3 pr-4 text-textMuted">
                    {a.commission_rate != null ? `${(a.commission_rate * 100).toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-textMuted">{a.contact_email ?? '—'}</td>
                  <td className={`py-3 font-medium ${statusColor(a.status)}`}>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};
