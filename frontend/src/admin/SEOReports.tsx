/**
 * frontend/src/admin/SEOReports.tsx
 * Admin SEO reports dashboard.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';

interface SEOReport {
  id: string;
  post_id: string;
  seo_score: number;
  word_count?: number;
  title_length?: number;
  meta_description_length?: number;
  keyword_count?: number;
  tag_count?: number;
  recommendations?: string[];
  created_at: string;
}

const scoreBadge = (score: number) => {
  if (score >= 90) return 'bg-green-500/20 text-green-400';
  if (score >= 75) return 'bg-blue-500/20 text-blue-400';
  if (score >= 60) return 'bg-yellow-500/20 text-yellow-400';
  return 'bg-red-500/20 text-red-400';
};

const scoreLabel = (score: number) => {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Needs Work';
  return 'Poor';
};

export const SEOReports: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<SEOReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch('/api/admin/seo', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : { reports: [] }))
      .then((data: { reports: SEOReport[] }) => setReports(data.reports ?? []))
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="SEO Reports">
      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && reports.length === 0 && (
        <p className="text-textMuted italic">No SEO reports generated yet.</p>
      )}

      {reports.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-textMuted text-left">
                <th className="pb-3 pr-4 font-medium">Post ID</th>
                <th className="pb-3 pr-4 font-medium">Score</th>
                <th className="pb-3 pr-4 font-medium">Words</th>
                <th className="pb-3 pr-4 font-medium">Title Len</th>
                <th className="pb-3 pr-4 font-medium">Keywords</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reports.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 pr-4 text-textMuted font-mono text-xs">{r.post_id.slice(0, 8)}…</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${scoreBadge(r.seo_score)}`}>
                      {r.seo_score} — {scoreLabel(r.seo_score)}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-textMuted">{r.word_count ?? '—'}</td>
                  <td className="py-3 pr-4 text-textMuted">{r.title_length ?? '—'}</td>
                  <td className="py-3 pr-4 text-textMuted">{r.keyword_count ?? '—'}</td>
                  <td className="py-3 text-textMuted">{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};
