/**
 * frontend/src/components/monetization/SponsorBanner.tsx
 * Displays a sponsor banner ad with click tracking.
 */
import React from "react";

interface SponsorBannerProps {
  sponsorId: string;
  campaignId?: string;
  imageUrl?: string;
  altText?: string;
  targetUrl: string;
  label?: string;
}

export const SponsorBanner: React.FC<SponsorBannerProps> = ({
  sponsorId,
  campaignId,
  imageUrl,
  altText = "Sponsored",
  targetUrl,
  label,
}) => {
  const handleClick = () => {
    // Use sendBeacon for reliable fire-and-forget tracking before navigation
    const payload = JSON.stringify({
      sponsor_id: sponsorId,
      campaign_id: campaignId,
      referrer: window.location.href,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/sponsors/clicks",
        new Blob([payload], { type: "application/json" }),
      );
    } else {
      fetch("/api/sponsors/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-surfaceAlt hover:border-primary/40 transition-colors"
      role="banner"
      aria-label={`Sponsored: ${altText}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="px-6 py-4 flex items-center justify-between">
          <span className="text-textMuted text-xs uppercase tracking-wide">
            Sponsored
          </span>
          <span className="text-textPrimary font-semibold">
            {label ?? altText}
          </span>
        </div>
      )}
    </div>
  );
};
