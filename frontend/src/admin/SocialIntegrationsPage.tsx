/**
 * frontend/src/admin/SocialIntegrationsPage.tsx
 * Admin social integrations — manage platform connections.
 */
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";

interface PlatformIntegration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  username?: string;
}

const INITIAL_PLATFORMS: PlatformIntegration[] = [
  { id: "x_twitter", name: "X / Twitter", icon: "𝕏", connected: false },
  { id: "instagram", name: "Instagram", icon: "📸", connected: true, username: "@dzire_official" },
  { id: "facebook", name: "Facebook", icon: "📘", connected: false },
  { id: "tiktok", name: "TikTok", icon: "🎵", connected: true, username: "@dzire" },
  { id: "youtube", name: "YouTube", icon: "▶️", connected: false },
  { id: "reddit", name: "Reddit", icon: "🤖", connected: false },
  { id: "bluesky", name: "Bluesky", icon: "🦋", connected: false },
  { id: "threads", name: "Threads", icon: "🧵", connected: false },
  { id: "mastodon", name: "Mastodon", icon: "🐘", connected: false },
  { id: "discord", name: "Discord", icon: "💬", connected: false },
];

export const SocialIntegrationsPage: React.FC = () => {
  const [platforms, setPlatforms] = useState<PlatformIntegration[]>(INITIAL_PLATFORMS);

  const toggleConnect = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, connected: !p.connected, username: !p.connected ? `@dzire_${p.id}` : undefined } : p
      )
    );
  };

  return (
    <AdminLayout title="Social Integrations">
      <p className="text-textMuted text-sm mb-6">
        Connect your social media accounts to enable scheduling and publishing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="p-5 bg-surfaceAlt rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{platform.icon}</span>
              <div>
                <p className="text-sm font-medium text-textPrimary">{platform.name}</p>
                {platform.connected && platform.username && (
                  <p className="text-xs text-textMuted">{platform.username}</p>
                )}
              </div>
              <div className="ml-auto">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                    platform.connected
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 text-textMuted"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${platform.connected ? "bg-green-400" : "bg-textMuted"}`}
                  />
                  {platform.connected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleConnect(platform.id)}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-opacity ${
                platform.connected
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-primary text-white hover:opacity-90"
              }`}
            >
              {platform.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
