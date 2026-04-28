import React from "react";

interface PaywallBlockProps {
  title?: string;
  subtitle?: string;
  planName?: string;
  planPrice?: string;
  features?: string[];
  ctaLabel?: string;
  onUpgrade?: () => void;
  className?: string;
}

export const PaywallBlock: React.FC<PaywallBlockProps> = ({
  title = "This content is for VIP members only",
  subtitle = "Unlock premium articles, exclusive guides, and member-only perks.",
  planName = "VIP Membership",
  planPrice,
  features = [],
  ctaLabel = "Upgrade to VIP",
  onUpgrade,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-purple-500/40 bg-surface ${className}`}
    >
      {/* Blur overlay suggesting blurred content beneath */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center p-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-900/40 text-purple-300 border border-purple-500/40 mb-6">
          VIP EXCLUSIVE
        </span>

        <h2 className="text-2xl font-extrabold text-textPrimary mb-3">
          {title}
        </h2>
        <p className="text-textMuted mb-8 max-w-md">{subtitle}</p>

        {features.length > 0 && (
          <ul className="flex flex-col gap-2 mb-8 text-sm text-textMuted w-full max-w-sm">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-purple-400">✦</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mb-6">
          <div className="text-sm text-textMuted">{planName}</div>
          {planPrice && (
            <div className="text-3xl font-extrabold text-textPrimary">
              {planPrice}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onUpgrade}
          className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(192,132,252,0.35)]"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
};
