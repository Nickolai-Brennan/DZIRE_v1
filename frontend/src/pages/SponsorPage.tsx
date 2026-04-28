/**
 * frontend/src/pages/SponsorPage.tsx
 * Public sponsor showcase page.
 */
import React, { useEffect, useState } from "react";

interface Sponsor {
  id: string;
  name: string;
  website?: string;
  logo_url?: string;
}

export const SponsorPage: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Public endpoint — requires auth in the current implementation
    // so we render a static message if fetch fails
    fetch("/api/sponsors")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Sponsor[]) => setSponsors(data))
      .catch(() => setSponsors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-4">Our Sponsors</h1>
      <p className="text-textMuted mb-8">
        DZIRE is supported by amazing sponsors. Interested in sponsoring?
        Contact us.
      </p>
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && sponsors.length === 0 && (
        <p className="text-textMuted italic">Sponsor details coming soon.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {sponsors.map((s) => (
          <a
            key={s.id}
            href={s.website ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-surfaceAlt rounded-xl border border-white/10 hover:border-primary/40 transition-colors"
          >
            {s.logo_url ? (
              <img
                src={s.logo_url}
                alt={s.name}
                className="h-12 object-contain"
              />
            ) : (
              <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center text-textMuted text-xs">
                {s.name}
              </div>
            )}
            <span className="text-sm text-textPrimary font-medium">
              {s.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
