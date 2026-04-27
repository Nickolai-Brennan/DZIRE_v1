import React from 'react';

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  backgroundImage,
  className = '',
}) => {
  return (
    <section
      className={`relative flex items-center justify-center min-h-[60vh] px-4 py-20 overflow-hidden ${className}`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      {/* Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {eyebrow && (
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            {eyebrow}
          </p>
        )}

        <h1 className="text-5xl sm:text-6xl font-extrabold text-textPrimary leading-tight mb-6">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg text-textMuted max-w-2xl mx-auto mb-8">{subtitle}</p>
        )}

        {(primaryAction ?? secondaryAction) && (
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </section>
  );
};
