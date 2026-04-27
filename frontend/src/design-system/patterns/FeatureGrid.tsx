import React from 'react';

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  eyebrow,
  title,
  subtitle,
  className = '',
}) => {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <section className={`py-16 px-4 ${className}`}>
      {(eyebrow ?? title ?? subtitle) && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          {eyebrow && (
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-4xl font-extrabold text-textPrimary mb-4">{title}</h2>
          )}
          {subtitle && <p className="text-textMuted text-lg">{subtitle}</p>}
        </div>
      )}

      <div className={`max-w-7xl mx-auto grid grid-cols-1 ${colClass} gap-6`}>
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-surface rounded-2xl border border-white/8 p-6 flex flex-col gap-4"
          >
            {feature.icon && (
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {feature.icon}
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-textPrimary mb-1">{feature.title}</h3>
              <p className="text-sm text-textMuted leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
