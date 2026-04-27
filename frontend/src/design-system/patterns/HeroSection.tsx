/**
 * Design System — HeroSection Pattern
 *
 * Full-width hero banner with headline, sub-copy, CTA buttons,
 * and an optional background image / video.
 */
import React from 'react';
import { Button } from '../components/Button';

export interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  /** Primary CTA */
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Secondary CTA */
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
  /** Background image URL */
  backgroundImage?: string;
  /** Centered or left-aligned layout */
  align?: 'left' | 'center';
  children?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheadline,
  ctaLabel,
  onCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
  backgroundImage,
  align = 'center',
  children,
}) => {
  return (
    <section
      className={[
        'relative w-full overflow-hidden',
        'py-20 md:py-28 lg:py-36',
        backgroundImage ? 'bg-background' : 'bg-background',
      ].join(' ')}
      aria-label="Hero section"
    >
      {/* Background image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
        </>
      )}

      {/* Decorative gradient blob */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden="true"
      />

      <div
        className={[
          'relative z-10 mx-auto max-w-4xl px-4 sm:px-6',
          align === 'center' ? 'text-center' : 'text-left',
        ].join(' ')}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-textPrimary leading-tight tracking-tight">
          {headline}
        </h1>

        {subheadline && (
          <p className="mt-4 text-lg sm:text-xl text-textMuted max-w-2xl mx-auto">
            {subheadline}
          </p>
        )}

        {(ctaLabel || secondaryCtaLabel) && (
          <div
            className={[
              'mt-8 flex flex-wrap gap-3',
              align === 'center' ? 'justify-center' : 'justify-start',
            ].join(' ')}
          >
            {ctaLabel && (
              <Button variant="primary" size="lg" onClick={onCtaClick}>
                {ctaLabel}
              </Button>
            )}
            {secondaryCtaLabel && (
              <Button variant="outline" size="lg" onClick={onSecondaryCtaClick}>
                {secondaryCtaLabel}
              </Button>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};
