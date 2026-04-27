/**
 * frontend/src/admin/MarketingDashboard.tsx
 * Admin marketing dashboard.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { getAdminToken, isAdminAuthenticated } from "../lib/auth/token";

export const MarketingDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch("/api/admin/marketing", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d: Record<string, unknown>) => setData(d))
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="Marketing Dashboard">
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surfaceAlt rounded-xl border border-white/10">
              <h2 className="text-base font-semibold text-textPrimary mb-2">
                Newsletter
              </h2>
              <p className="text-textMuted text-sm">
                Campaign performance and subscriber growth.
              </p>
            </div>
            <div className="p-6 bg-surfaceAlt rounded-xl border border-white/10">
              <h2 className="text-base font-semibold text-textPrimary mb-2">
                SEO &amp; Search
              </h2>
              <p className="text-textMuted text-sm">
                Keyword rankings, organic traffic trends.
              </p>
            </div>
            <div className="p-6 bg-surfaceAlt rounded-xl border border-white/10">
              <h2 className="text-base font-semibold text-textPrimary mb-2">
                Social Media
              </h2>
              <p className="text-textMuted text-sm">
                Referrals, engagement metrics by platform.
              </p>
            </div>
            <div className="p-6 bg-surfaceAlt rounded-xl border border-white/10">
              <h2 className="text-base font-semibold text-textPrimary mb-2">
                Conversions
              </h2>
              <p className="text-textMuted text-sm">
                Newsletter and VIP signup conversion rates.
              </p>
            </div>
          </div>
          <p className="text-textMuted text-sm italic">
            {typeof data.message === "string"
              ? data.message
              : "Marketing metrics will populate as events are tracked."}
          </p>
        </div>
      )}
    </AdminLayout>
  );
};
