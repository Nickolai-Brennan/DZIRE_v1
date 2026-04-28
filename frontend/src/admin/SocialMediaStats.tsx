/**
 * frontend/src/admin/SocialMediaStats.tsx
 * Admin social media stats page.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { getAdminToken, isAdminAuthenticated } from "../lib/auth/token";

const PLATFORMS = [
  "X / Twitter",
  "Instagram",
  "TikTok",
  "YouTube",
  "Reddit",
  "Bluesky",
  "Facebook",
  "Threads",
];

export const SocialMediaStats: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch("/api/admin/social", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="Social Media Stats">
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLATFORMS.map((platform) => (
              <div
                key={platform}
                className="p-4 bg-surfaceAlt rounded-xl border border-white/10"
              >
                <p className="text-xs text-textMuted mb-2">{platform}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-textPrimary">—</span>
                  <span className="text-xs text-textMuted">followers</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-textPrimary">
                    —
                  </span>
                  <span className="text-xs text-textMuted">engagement</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-textMuted text-sm italic">
            Social metrics will populate when embed tracking is active.
          </p>
        </div>
      )}
    </AdminLayout>
  );
};
