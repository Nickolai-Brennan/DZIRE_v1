/**
 * Design System — SponsorStrip Pattern
 *
 * Horizontal strip displaying sponsor logos or names.
 * Works as a subtle trust/social-proof bar on landing pages.
 */
import React from "react";

export interface Sponsor {
  id: string | number;
  name: string;
  /** Logo image URL */
  logoUrl?: string;
  /** Link to sponsor website */
  href?: string;
}

export interface SponsorStripProps {
  sponsors: Sponsor[];
  label?: string;
}

export const SponsorStrip: React.FC<SponsorStripProps> = ({
  sponsors,
  label = "Our Partners",
}) => {
  if (sponsors.length === 0) return null;

  return (
    <section
      className="w-full border-y border-white/8 bg-surfaceAlt py-8 px-4 sm:px-6"
      aria-label={label}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-textSubtle mb-6">
          {label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((sponsor) => {
            const inner = sponsor.logoUrl ? (
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            ) : (
              <span className="text-sm font-semibold text-textMuted hover:text-textPrimary transition-colors">
                {sponsor.name}
              </span>
            );

            return sponsor.href ? (
              <a
                key={sponsor.id}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
              >
                {inner}
              </a>
            ) : (
              <div key={sponsor.id}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
