/**
 * frontend/src/admin/SocialMetricsPage.tsx
 * Admin social metrics — aggregate stats across platforms.
 */
import React from "react";
import { AdminLayout } from "./AdminLayout";

interface StatCard {
  label: string;
  value: string | number;
  sub?: string;
}

const SUMMARY_STATS: StatCard[] = [
  { label: "Scheduled Posts", value: 14, sub: "across all platforms" },
  { label: "Published Posts", value: 87, sub: "last 30 days" },
  { label: "Failed Posts", value: 3, sub: "need attention" },
  { label: "Total Impressions", value: "124.5K", sub: "last 30 days" },
  { label: "Total Clicks", value: "8,320", sub: "last 30 days" },
  { label: "Engagement Rate", value: "4.7%", sub: "avg across platforms" },
];

const PLATFORM_STATS = [
  { platform: "Instagram", posts: 32, impressions: "58.2K", engagement: "6.1%" },
  { platform: "TikTok", posts: 18, impressions: "41.0K", engagement: "8.4%" },
  { platform: "X / Twitter", posts: 15, impressions: "12.3K", engagement: "2.9%" },
  { platform: "Facebook", posts: 10, impressions: "7.8K", engagement: "3.2%" },
  { platform: "YouTube", posts: 4, impressions: "4.1K", engagement: "5.0%" },
  { platform: "Reddit", posts: 8, impressions: "1.1K", engagement: "1.4%" },
];

const TOP_POST = {
  platform: "TikTok",
  title: "Summer Lookbook 2025",
  impressions: "22.4K",
  engagement: "9.8%",
};

export const SocialMetricsPage: React.FC = () => {
  return (
    <AdminLayout title="Social Metrics">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="p-4 bg-surfaceAlt rounded-xl border border-white/10">
            <p className="text-xs text-textMuted mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-textPrimary">{stat.value}</p>
            {stat.sub && <p className="text-xs text-textMuted mt-1">{stat.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Platform */}
        <div className="p-5 bg-surfaceAlt rounded-xl border border-white/10">
          <p className="text-xs text-textMuted uppercase tracking-wide mb-3">Top Platform</p>
          <p className="text-xl font-bold text-textPrimary">TikTok</p>
          <p className="text-sm text-textMuted mt-1">8.4% avg engagement</p>
          <p className="text-sm text-textMuted">41.0K impressions</p>
        </div>

        {/* Top Post */}
        <div className="p-5 bg-surfaceAlt rounded-xl border border-white/10 lg:col-span-2">
          <p className="text-xs text-textMuted uppercase tracking-wide mb-3">Top Post</p>
          <p className="text-lg font-semibold text-textPrimary">{TOP_POST.title}</p>
          <p className="text-sm text-textMuted mt-1">{TOP_POST.platform}</p>
          <div className="flex gap-4 mt-3">
            <div>
              <p className="text-xs text-textMuted">Impressions</p>
              <p className="text-sm font-medium text-textPrimary">{TOP_POST.impressions}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Engagement</p>
              <p className="text-sm font-medium text-textPrimary">{TOP_POST.engagement}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Per-platform breakdown */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-textMuted text-left">
              <th className="pb-3 pr-4 font-medium">Platform</th>
              <th className="pb-3 pr-4 font-medium">Posts</th>
              <th className="pb-3 pr-4 font-medium">Impressions</th>
              <th className="pb-3 font-medium">Engagement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PLATFORM_STATS.map((row) => (
              <tr key={row.platform} className="hover:bg-white/3 transition-colors">
                <td className="py-3 pr-4 text-textPrimary font-medium">{row.platform}</td>
                <td className="py-3 pr-4 text-textMuted">{row.posts}</td>
                <td className="py-3 pr-4 text-textMuted">{row.impressions}</td>
                <td className="py-3 text-textMuted">{row.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
