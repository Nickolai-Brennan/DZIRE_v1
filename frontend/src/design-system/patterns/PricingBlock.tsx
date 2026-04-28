import React from 'react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingBlockProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
  onSelect?: (tier: PricingTier) => void;
  className?: string;
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  tiers,
  title,
  subtitle,
  onSelect,
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 ${className}`}>
      {(title ?? subtitle) && (
        <div className="max-w-2xl mx-auto text-center mb-12">
          {title && <h2 className="text-4xl font-extrabold text-textPrimary mb-4">{title}</h2>}
          {subtitle && <p className="text-textMuted text-lg">{subtitle}</p>}
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              tier.highlighted
                ? 'bg-primary/10 border-primary/50 shadow-[0_0_24px_rgba(225,29,72,0.2)]'
                : 'bg-surface border-white/8'
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                {tier.badge}
              </span>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-textPrimary mb-1">{tier.name}</h3>
              {tier.description && (
                <p className="text-sm text-textMuted">{tier.description}</p>
              )}
            </div>

            <div className="mb-6">
              <span className="text-4xl font-extrabold text-textPrimary">{tier.price}</span>
              {tier.period && <span className="text-textMuted text-sm ml-1">/{tier.period}</span>}
            </div>

            <ul className="flex flex-col gap-2 mb-8 flex-1">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-textMuted">
                  <span className="text-primary mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onSelect?.(tier)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                tier.highlighted
                  ? 'bg-primary hover:bg-accent text-white'
                  : 'bg-surfaceAlt hover:bg-white/8 text-textPrimary border border-white/10'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
