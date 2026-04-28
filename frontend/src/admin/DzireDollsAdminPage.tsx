/**
 * frontend/src/admin/DzireDollsAdminPage.tsx
 * Admin DZIRE Dolls management — view, manage, and track doll profiles.
 */
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ExternalLink,
  Heart,
  Star,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { mockDolls } from "../data/mockDolls";
import { isAdminAuthenticated } from "../lib/auth/token";

export const DzireDollsAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const filtered = mockDolls.filter(
    (d) =>
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tagline.toLowerCase().includes(search.toLowerCase()) ||
      d.vibeTags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  const featuredCount = mockDolls.filter((d) => d.isFeatured).length;
  const sponsoredCount = mockDolls.filter((d) => d.isSponsored).length;

  return (
    <AdminLayout title="DZIRE Dolls">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface rounded-2xl p-5 border border-white/8 text-center">
          <p className="text-3xl font-black text-textPrimary">
            {mockDolls.length}
          </p>
          <p className="text-xs text-textMuted mt-1">Total Dolls</p>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-white/8 text-center">
          <p className="text-3xl font-black text-gold">{featuredCount}</p>
          <p className="text-xs text-textMuted mt-1">Featured</p>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-white/8 text-center">
          <p className="text-3xl font-black text-primary">{sponsoredCount}</p>
          <p className="text-xs text-textMuted mt-1">Sponsored</p>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-white/8 text-center">
          <p className="text-3xl font-black text-blue-400">
            {mockDolls.reduce((s, d) => s + d.platforms.length, 0)}
          </p>
          <p className="text-xs text-textMuted mt-1">Platform Links</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dolls by name, tagline, or vibe tag..."
          className="w-full bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary text-sm"
        />
      </div>

      {/* Doll Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doll) => (
          <div
            key={doll.id}
            className="bg-surface rounded-2xl border border-white/8 overflow-hidden hover:border-primary/30 transition-colors"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <img
                src={doll.image}
                alt={doll.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-textPrimary">{doll.name}</h3>
                <p className="text-xs text-textMuted">{doll.tagline}</p>
              </div>
              {/* Status badges */}
              <div className="absolute top-3 right-3 flex gap-2">
                {doll.isFeatured && (
                  <span className="flex items-center gap-1 text-xs bg-gold/90 text-background font-bold px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
                {doll.isSponsored && (
                  <span className="flex items-center gap-1 text-xs bg-primary/90 text-white font-bold px-2 py-0.5 rounded-full">
                    <Heart className="w-3 h-3" />
                    Sponsored
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              {/* Vibe Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {doll.vibeTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-surfaceAlt rounded-full text-textMuted border border-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Platforms */}
              <div className="mb-4">
                <p className="text-xs text-textMuted uppercase tracking-wider mb-2">
                  Platforms
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {doll.platforms.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:text-accent px-2 py-0.5 bg-primary/10 rounded-full transition-colors"
                    >
                      {p.name}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  {doll.isFeatured ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-textMuted" />
                  )}
                  <span className="text-textMuted">Featured</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {doll.isSponsored ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-textMuted" />
                  )}
                  <span className="text-textMuted">Sponsored</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to={`/dzire-dolls/${doll.slug}`}
                  target="_blank"
                  className="flex-1 text-center py-2 text-xs font-medium text-textPrimary bg-surfaceAlt border border-white/10 rounded-xl hover:border-primary/40 transition-colors"
                >
                  View Profile
                </Link>
                <button className="flex-1 py-2 text-xs font-medium text-textPrimary bg-primary/20 border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-textMuted">
          <p className="text-xl font-bold mb-2">No dolls found</p>
          <p>Try adjusting your search.</p>
        </div>
      )}
    </AdminLayout>
  );
};
