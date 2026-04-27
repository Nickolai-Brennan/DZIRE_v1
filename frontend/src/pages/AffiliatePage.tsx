/**
 * frontend/src/pages/AffiliatePage.tsx
 * Public affiliate products/deals page.
 */
import React, { useEffect, useState } from "react";

interface AffiliateLink {
  id: string;
  product_name: string;
  destination_url: string;
  tracking_url?: string;
  coupon_code?: string;
}

export const AffiliatePage: React.FC = () => {
  const [links] = useState<AffiliateLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // affiliate /links requires admin auth — render fallback if unavailable
    setLoading(false);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-4">
        Affiliate Deals
      </h1>
      <p className="text-textMuted mb-8">
        Exclusive deals and recommendations from DZIRE. Some links are affiliate
        links — we may earn a commission at no cost to you.
      </p>
      {loading && <p className="text-textMuted">Loading…</p>}
      {!loading && links.length === 0 && (
        <p className="text-textMuted italic">
          Deals and recommendations coming soon.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link) => (
          <div
            key={link.id}
            className="p-6 bg-surfaceAlt rounded-xl border border-white/10"
          >
            <h2 className="text-lg font-semibold text-textPrimary mb-2">
              {link.product_name}
            </h2>
            {link.coupon_code && (
              <p className="text-sm text-textMuted mb-3">
                Coupon: <code className="text-primary">{link.coupon_code}</code>
              </p>
            )}
            <a
              href={link.tracking_url ?? link.destination_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Shop Now →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
