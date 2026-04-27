/**
 * frontend/src/admin/AdvertisingDashboard.tsx
 * Admin advertising dashboard — sponsor campaigns and placements.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { getAdminToken, isAdminAuthenticated } from "../lib/auth/token";

export const AdvertisingDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch("/api/admin/advertising", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d: Record<string, unknown>) => setData(d))
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="Advertising Dashboard">
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Campaigns", value: "—" },
              { label: "Total Impressions", value: "—" },
              { label: "Total Clicks", value: "—" },
              { label: "Avg CTR", value: "—" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="p-5 bg-surfaceAlt rounded-xl border border-white/10"
              >
                <p className="text-textMuted text-xs mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-textPrimary">
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-textMuted text-sm italic">
            {typeof data.message === "string"
              ? data.message
              : "Advertising data will populate as campaigns are created."}
          </p>
        </div>
      )}
    </AdminLayout>
  );
};
