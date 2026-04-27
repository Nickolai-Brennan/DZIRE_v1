/**
 * frontend/src/pages/BlogPostPage.tsx
 * Public blog post detail page — fetches post by slug.
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  body_content?: string;
  featured_image?: string;
  content_type: string;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  is_vip_only: boolean;
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((data: Post | null) => {
        if (data) setPost(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-12 text-textMuted">Loading…</div>;
  }

  if (notFound || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-textPrimary mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="text-sm text-textMuted hover:text-primary mb-6 inline-block">
        ← Back to Blog
      </Link>

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-8"
        />
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-3">{post.title}</h1>
        {post.subtitle && (
          <p className="text-lg text-textMuted mb-3">{post.subtitle}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-textMuted">
          <span className="capitalize">{post.content_type.replace('_', ' ')}</span>
          {post.published_at && (
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
          )}
          {post.is_vip_only && (
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium">
              VIP Only
            </span>
          )}
        </div>
      </header>

      {post.body_content ? (
        <div
          className="prose prose-invert max-w-none text-textMuted"
          dangerouslySetInnerHTML={{ __html: post.body_content }}
        />
      ) : (
        <p className="text-textMuted italic">No content available.</p>
      )}
    </article>
  );
};
