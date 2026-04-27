/**
 * frontend/src/admin/PostEditor.tsx
 * Admin post editor — create/edit CMS posts with metadata fields.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { getAdminToken, isAdminAuthenticated } from '../lib/auth/token';

const CONTENT_TYPES = [
  'blog_article', 'editorial', 'review', 'guide', 'news_post',
  'sponsor_post', 'affiliate_post', 'vip_post', 'social_embed_post',
  'newsletter_feature', 'landing_page',
];

const STATUSES = ['draft', 'scheduled', 'published', 'archived'];
const VISIBILITIES = ['public', 'members', 'vip', 'private'];

export const PostEditor: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    body_content: '',
    content_type: 'blog_article',
    status: 'draft',
    visibility: 'public',
    seo_title: '',
    seo_description: '',
    keywords: '',
    is_vip_only: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTitleBlur = () => {
    if (!form.slug && form.title) {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const token = getAdminToken();
      const payload = {
        ...form,
        keywords: form.keywords ? form.keywords.split(',').map((k) => k.trim()) : [],
      };
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, name: keyof typeof form, type: 'input' | 'textarea' = 'input') => (
    <div>
      <label className="block text-sm text-textMuted mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={form[name] as string}
          onChange={handleChange}
          rows={6}
          className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary/60 resize-y"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={form[name] as string}
          onChange={handleChange}
          onBlur={name === 'title' ? handleTitleBlur : undefined}
          className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary/60"
        />
      )}
    </div>
  );

  return (
    <AdminLayout title="Post Editor">
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {saved && (
          <div className="px-4 py-3 bg-green-500/20 text-green-400 rounded-lg text-sm">
            Post saved successfully!
          </div>
        )}
        {error && (
          <div className="px-4 py-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {field('Title', 'title')}
          {field('Slug', 'slug')}
        </div>

        {field('Subtitle', 'subtitle')}
        {field('Excerpt', 'excerpt', 'textarea')}
        {field('Body Content (HTML or Markdown)', 'body_content', 'textarea')}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-textMuted mb-1">Content Type</label>
            <select
              name="content_type"
              value={form.content_type}
              onChange={handleChange}
              className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary/60"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>{t.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-textMuted mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary/60"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-textMuted mb-1">Visibility</label>
            <select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary/60"
            >
              {VISIBILITIES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <h3 className="text-sm font-semibold text-textPrimary">SEO</h3>
          {field('SEO Title', 'seo_title')}
          {field('SEO Description', 'seo_description', 'textarea')}
          {field('Keywords (comma-separated)', 'keywords')}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_vip_only"
            name="is_vip_only"
            checked={form.is_vip_only}
            onChange={handleChange}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="is_vip_only" className="text-sm text-textMuted">
            VIP-only content
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Post'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
