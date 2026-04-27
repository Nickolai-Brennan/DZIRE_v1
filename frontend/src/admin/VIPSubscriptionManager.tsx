/**
 * frontend/src/admin/VIPSubscriptionManager.tsx
 * Admin VIP subscription plans and subscriber manager.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';

interface VipPlan {
  id: string;
  name: string;
  price: number;
  billing_interval: string;
  status: string;
}

export const VIPSubscriptionManager: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<VipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch('/api/vip/plans', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: VipPlan[]) => setPlans(data))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="VIP Subscription Manager">
      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-5 bg-surfaceAlt rounded-xl border border-white/10">
              <p className="text-textMuted text-sm mb-1">Active Plans</p>
              <p className="text-3xl font-bold text-textPrimary">
                {plans.filter((p) => p.status === 'active').length}
              </p>
            </div>
          </div>

          {plans.length === 0 && (
            <p className="text-textMuted italic">No VIP plans configured yet.</p>
          )}

          {plans.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-textMuted text-left">
                    <th className="pb-3 pr-4 font-medium">Plan Name</th>
                    <th className="pb-3 pr-4 font-medium">Price</th>
                    <th className="pb-3 pr-4 font-medium">Interval</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {plans.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 pr-4 text-textPrimary">{p.name}</td>
                      <td className="py-3 pr-4 text-textMuted">${p.price}</td>
                      <td className="py-3 pr-4 text-textMuted">{p.billing_interval}</td>
                      <td className={`py-3 font-medium text-sm ${p.status === 'active' ? 'text-green-400' : 'text-textMuted'}`}>
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};
