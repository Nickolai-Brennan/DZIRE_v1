/**
 * frontend/src/admin/SocialSchedulerPage.tsx
 * Admin social scheduler — manage scheduled social media posts.
 */
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";

type PostStatus = "draft" | "scheduled" | "ready" | "publishing" | "published" | "failed";

interface ScheduledPost {
  id: string;
  platform: string;
  caption: string;
  scheduled_at: string;
  status: PostStatus;
}

const MOCK_POSTS: ScheduledPost[] = [
  { id: "1", platform: "Instagram", caption: "Summer vibes are calling ☀️ Check out our latest lookbook featuring the hottest styles of the season…", scheduled_at: "2025-07-10 09:00", status: "scheduled" },
  { id: "2", platform: "X / Twitter", caption: "New drop incoming 🔥 Our most-requested collection is finally here. Thread below for details…", scheduled_at: "2025-07-10 12:00", status: "ready" },
  { id: "3", platform: "TikTok", caption: "POV: you just found your new favorite outfit 😍 #DZIRE #Fashion #Style #OOTD", scheduled_at: "2025-07-11 15:00", status: "draft" },
  { id: "4", platform: "Facebook", caption: "We're celebrating 10K followers! Thank you for your incredible support. Here's something special…", scheduled_at: "2025-07-09 10:00", status: "published" },
  { id: "5", platform: "Bluesky", caption: "Your daily dose of inspiration has arrived. Swipe through to see this week's featured styles…", scheduled_at: "2025-07-08 08:00", status: "failed" },
  { id: "6", platform: "Reddit", caption: "r/fashion — What are your top picks for summer 2025? Here's our curated list of must-haves…", scheduled_at: "2025-07-12 14:00", status: "scheduled" },
];

const STATUS_COLORS: Record<PostStatus, string> = {
  draft: "bg-yellow-500/20 text-yellow-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  ready: "bg-cyan-500/20 text-cyan-400",
  publishing: "bg-orange-500/20 text-orange-400",
  published: "bg-green-500/20 text-green-400",
  failed: "bg-red-500/20 text-red-400",
};

export const SocialSchedulerPage: React.FC = () => {
  const [posts] = useState<ScheduledPost[]>(MOCK_POSTS);

  return (
    <AdminLayout title="Social Scheduler">
      <div className="flex items-center justify-between mb-6">
        <p className="text-textMuted text-sm">{posts.length} posts total</p>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          + Schedule Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-4 p-4 bg-surfaceAlt rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-textPrimary">{post.platform}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[post.status]}`}>
                  {post.status}
                </span>
              </div>
              <p className="text-sm text-textMuted truncate">{post.caption}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-textMuted whitespace-nowrap">{post.scheduled_at}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
