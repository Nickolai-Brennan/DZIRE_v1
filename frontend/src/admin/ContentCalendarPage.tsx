/**
 * frontend/src/admin/ContentCalendarPage.tsx
 * Admin content calendar — schedule and track content across platforms.
 */
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";

type CalendarStatus = "idea" | "draft" | "scheduled" | "published";

interface CalendarItem {
  id: string;
  title: string;
  platform: string;
  status: CalendarStatus;
  scheduled_at: string;
  content_type: string;
}

const MOCK_ITEMS: CalendarItem[] = [
  {
    id: "1",
    title: "Summer Fashion Lookbook",
    platform: "Instagram",
    status: "published",
    scheduled_at: "2025-07-01",
    content_type: "Image Post",
  },
  {
    id: "2",
    title: "Top 10 Style Tips",
    platform: "TikTok",
    status: "scheduled",
    scheduled_at: "2025-07-10",
    content_type: "Video",
  },
  {
    id: "3",
    title: "Behind the Scenes Reel",
    platform: "Instagram",
    status: "draft",
    scheduled_at: "2025-07-15",
    content_type: "Reel",
  },
  {
    id: "4",
    title: "New Collection Teaser",
    platform: "X / Twitter",
    status: "idea",
    scheduled_at: "2025-07-20",
    content_type: "Thread",
  },
  {
    id: "5",
    title: "Model Spotlight Feature",
    platform: "Facebook",
    status: "scheduled",
    scheduled_at: "2025-07-12",
    content_type: "Article",
  },
  {
    id: "6",
    title: "Weekly Digest Newsletter",
    platform: "Email",
    status: "draft",
    scheduled_at: "2025-07-08",
    content_type: "Newsletter",
  },
  {
    id: "7",
    title: "Community Poll",
    platform: "Reddit",
    status: "idea",
    scheduled_at: "2025-07-18",
    content_type: "Poll",
  },
];

const PLATFORMS = [
  "All",
  "Instagram",
  "TikTok",
  "X / Twitter",
  "Facebook",
  "Email",
  "Reddit",
  "YouTube",
];

const STATUS_COLORS: Record<CalendarStatus, string> = {
  idea: "bg-purple-500/20 text-purple-400",
  draft: "bg-yellow-500/20 text-yellow-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  published: "bg-green-500/20 text-green-400",
};

export const ContentCalendarPage: React.FC = () => {
  const [platformFilter, setPlatformFilter] = useState("All");

  const filtered =
    platformFilter === "All"
      ? MOCK_ITEMS
      : MOCK_ITEMS.filter((i) => i.platform === platformFilter);

  return (
    <AdminLayout title="Content Calendar">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <label className="text-sm text-textMuted">Platform:</label>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-surfaceAlt border border-white/10 text-textPrimary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          + New Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-textMuted text-left">
              <th className="pb-3 pr-4 font-medium">Title</th>
              <th className="pb-3 pr-4 font-medium">Platform</th>
              <th className="pb-3 pr-4 font-medium">Type</th>
              <th className="pb-3 pr-4 font-medium">Scheduled</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-white/3 transition-colors">
                <td className="py-3 pr-4 text-textPrimary font-medium">
                  {item.title}
                </td>
                <td className="py-3 pr-4 text-textMuted">{item.platform}</td>
                <td className="py-3 pr-4 text-textMuted">
                  {item.content_type}
                </td>
                <td className="py-3 pr-4 text-textMuted">
                  {item.scheduled_at}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-textMuted italic mt-4">
            No items for this platform.
          </p>
        )}
      </div>
    </AdminLayout>
  );
};
