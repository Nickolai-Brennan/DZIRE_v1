/**
 * frontend/src/components/monetization/AffiliateWidget.tsx
 * Displays an affiliate link with click tracking.
 */
import React from "react";

interface AffiliateWidgetProps {
  affiliateId?: string;
  url: string;
  label?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  postId?: string;
}

export const AffiliateWidget: React.FC<AffiliateWidgetProps> = ({
  affiliateId,
  url,
  label = "Check it out",
  utmSource,
  utmMedium,
  utmCampaign,
  postId,
}) => {
  const handleClick = async () => {
    try {
      await fetch("/api/affiliates/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliate_id: affiliateId,
          post_id: postId,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          referrer: window.location.href,
          session_id: sessionStorage.getItem("session_id"),
        }),
      });
    } catch {
      // Tracking failure should not block navigation
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-surfaceAlt border border-white/10 rounded-lg text-sm text-textPrimary hover:border-primary/50 transition-colors"
    >
      <span>🔗</span>
      {label}
    </button>
  );
};
