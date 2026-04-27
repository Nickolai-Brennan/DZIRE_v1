/**
 * frontend/src/admin/KeywordTagReports.tsx
 * Admin keyword and tag reports page.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { isAdminAuthenticated } from '../lib/auth/token';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export const KeywordTagReports: React.FC = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    fetch('/api/tags')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Tag[]) => setTags(data))
      .catch(() => setTags([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AdminLayout title="Keyword / Tag Reports">
      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-surfaceAlt rounded-xl border border-white/10">
              <p className="text-textMuted text-sm mb-1">Total Tags</p>
              <p className="text-3xl font-bold text-textPrimary">{tags.length}</p>
            </div>
          </div>

          {tags.length === 0 && (
            <p className="text-textMuted italic">No tags defined yet.</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-textMuted"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};
