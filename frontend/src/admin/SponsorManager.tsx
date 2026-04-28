/**
 * frontend/src/admin/SponsorManager.tsx
 * Admin sponsor and campaign manager.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { getAdminToken, isAdminAuthenticated } from "../lib/auth/token";

interface Sponsor {
  id: string;
  name: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  status: string;
}

export const SponsorManager: React.FC = () => {
  const navigate = useNavigate();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch("/api/sponsors", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Sponsor[]) => setSponsors(data))
      .catch(() => setSponsors([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  const statusColor = (status: string) =>
    status === "active"
      ? "text-green-400"
      : status === "pending"
        ? "text-yellow-400"
        : "text-textMuted";

  return (
    <AdminLayout title="Sponsor Manager">
      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && sponsors.length === 0 && (
        <p className="text-textMuted italic">No sponsors yet.</p>
      )}

      {sponsors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-textMuted text-left">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Contact</th>
                <th className="pb-3 pr-4 font-medium">Website</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sponsors.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 pr-4 text-textPrimary">{s.name}</td>
                  <td className="py-3 pr-4 text-textMuted">
                    {s.contact_email ?? s.contact_name ?? "—"}
                  </td>
                  <td className="py-3 pr-4 text-textMuted">
                    {s.website ? (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        {s.website}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className={`py-3 font-medium ${statusColor(s.status)}`}>
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};
