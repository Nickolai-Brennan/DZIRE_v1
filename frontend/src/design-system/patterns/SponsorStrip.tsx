import React from 'react';

interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  url?: string;
}

interface SponsorStripProps {
  sponsors: Sponsor[];
  label?: string;
  className?: string;
}

export const SponsorStrip: React.FC<SponsorStripProps> = ({
  sponsors,
  label = 'Proudly supported by',
  className = '',
}) => {
  return (
    <section className={`py-10 px-4 border-y border-white/8 bg-surfaceAlt ${className}`}>
      <div className="max-w-5xl mx-auto">
        {label && (
          <p className="text-xs font-semibold text-textMuted uppercase tracking-widest text-center mb-6">
            {label}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {sponsor.logoUrl ? (
                <img
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="text-textMuted font-semibold text-sm">{sponsor.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
