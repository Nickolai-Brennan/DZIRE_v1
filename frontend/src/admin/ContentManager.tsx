/**
 * frontend/src/admin/ContentManager.tsx
 * Admin content manager — lists all CMS posts with status.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  content_type: string;
  published_at?: string;
  created_at: string;
}

export const ContentManager: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const token = getAdminToken();
    fetch('/api/admin/content', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((data: { posts: Post[] }) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      published: 'bg-green-500/20 text-green-400',
      draft: 'bg-yellow-500/20 text-yellow-400',
      scheduled: 'bg-blue-500/20 text-blue-400',
      archived: 'bg-white/10 text-textMuted',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] ?? 'bg-white/10 text-textMuted'}`}>
        {status}
      </span>
    );
  };

  return (
    <AdminLayout title="Content Manager">
      <div className="flex items-center justify-between mb-6">
        <p className="text-textMuted text-sm">{posts.length} posts total</p>
        <Link
          to="/admin/editor"
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + New Post
        </Link>
      </div>

      {loading && <p className="text-textMuted">Loading…</p>}

      {!loading && posts.length === 0 && (
        <p className="text-textMuted italic">No posts yet.</p>
      )}

      {posts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-textMuted text-left">
                <th className="pb-3 pr-4 font-medium">Title</th>
                <th className="pb-3 pr-4 font-medium">Type</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-4 text-textPrimary">{post.title}</td>
                  <td className="py-3 pr-4 text-textMuted capitalize">
                    {post.content_type.replace('_', ' ')}
                  </td>
                  <td className="py-3 pr-4">{statusBadge(post.status)}</td>
                  <td className="py-3 text-textMuted">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : new Date(post.created_at).toLocaleDateString()}
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
