/**
 * frontend/src/pages/BlogIndexPage.tsx
 * Public blog index — lists published CMS posts.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  content_type: string;
  published_at?: string;
}

export const BlogIndexPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts?limit=20')
      .then((r) => r.json())
      .then((data: Post[]) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">Blog</h1>
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && posts.length === 0 && (
        <p className="text-textMuted">No posts published yet.</p>
      )}
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-white/10 pb-8">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-textPrimary mb-2">
              <Link
                to={`/blog/${post.slug}`}
                className="hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="text-textMuted text-sm mb-3">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-textMuted">
              <span className="capitalize">{post.content_type.replace('_', ' ')}</span>
              {post.published_at && (
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
              )}
              <Link
                to={`/blog/${post.slug}`}
                className="text-primary hover:underline"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
