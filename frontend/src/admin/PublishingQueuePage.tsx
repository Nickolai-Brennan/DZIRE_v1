/**
 * frontend/src/admin/PublishingQueuePage.tsx
 * Admin publishing queue — view posts by pipeline status.
 */
import React from "react";
import { AdminLayout } from "./AdminLayout";

type QueueStatus = "draft" | "scheduled" | "ready" | "publishing" | "published" | "failed";

interface QueuePost {
  id: string;
  title: string;
  platform: string;
  status: QueueStatus;
  scheduled_at: string;
}

const MOCK_QUEUE: QueuePost[] = [
  { id: "1", title: "Summer Lookbook Drop", platform: "Instagram", status: "draft", scheduled_at: "2025-07-15" },
  { id: "2", title: "Style Tips Thread", platform: "X / Twitter", status: "scheduled", scheduled_at: "2025-07-10" },
  { id: "3", title: "Behind the Scenes", platform: "TikTok", status: "ready", scheduled_at: "2025-07-09" },
  { id: "4", title: "Collection Announcement", platform: "Facebook", status: "publishing", scheduled_at: "2025-07-09" },
  { id: "5", title: "Spring Recap", platform: "Instagram", status: "published", scheduled_at: "2025-07-01" },
  { id: "6", title: "Community Poll", platform: "Reddit", status: "failed", scheduled_at: "2025-07-08" },
  { id: "7", title: "New Drop Teaser", platform: "Bluesky", status: "scheduled", scheduled_at: "2025-07-11" },
  { id: "8", title: "Collab Reveal", platform: "YouTube", status: "draft", scheduled_at: "2025-07-20" },
  { id: "9", title: "Q&A Highlights", platform: "Threads", status: "published", scheduled_at: "2025-07-03" },
];

const STATUSES: QueueStatus[] = ["draft", "scheduled", "ready", "publishing", "published", "failed"];

const STATUS_COLORS: Record<QueueStatus, string> = {
  draft: "bg-yellow-500/20 text-yellow-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  ready: "bg-cyan-500/20 text-cyan-400",
  publishing: "bg-orange-500/20 text-orange-400",
  published: "bg-green-500/20 text-green-400",
  failed: "bg-red-500/20 text-red-400",
};

const STATUS_HEADER_COLORS: Record<QueueStatus, string> = {
  draft: "text-yellow-400",
  scheduled: "text-blue-400",
  ready: "text-cyan-400",
  publishing: "text-orange-400",
  published: "text-green-400",
  failed: "text-red-400",
};

export const PublishingQueuePage: React.FC = () => {
  const countByStatus = (s: QueueStatus) => MOCK_QUEUE.filter((p) => p.status === s).length;

  return (
    <AdminLayout title="Publishing Queue">
      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {STATUSES.map((s) => (
          <div key={s} className="p-4 bg-surfaceAlt rounded-xl border border-white/10 text-center">
            <p className={`text-2xl font-bold ${STATUS_HEADER_COLORS[s]}`}>{countByStatus(s)}</p>
            <p className="text-xs text-textMuted mt-1 capitalize">{s}</p>
          </div>
        ))}
      </div>

      {/* Per-status columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {STATUSES.map((s) => {
          const posts = MOCK_QUEUE.filter((p) => p.status === s);
          return (
            <div key={s} className="bg-surfaceAlt rounded-xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className={`text-sm font-medium capitalize ${STATUS_HEADER_COLORS[s]}`}>{s}</span>
                <span className="text-xs text-textMuted bg-white/5 px-2 py-0.5 rounded-full">{posts.length}</span>
              </div>
              <div className="p-3 space-y-2">
                {posts.length === 0 && (
                  <p className="text-xs text-textMuted italic p-2">No posts</p>
                )}
                {posts.map((post) => (
                  <div key={post.id} className="p-3 bg-background rounded-lg border border-white/5">
                    <p className="text-sm text-textPrimary font-medium truncate">{post.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-textMuted">{post.platform}</span>
                      <span className="text-xs text-textMuted">{post.scheduled_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};
