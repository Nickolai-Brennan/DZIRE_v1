/**
 * frontend/src/admin/SocialSizeChartPage.tsx
 * Admin social size chart — reference specs for all social media platforms.
 */
import React, { useState, useMemo } from "react";
import { AdminLayout } from "./AdminLayout";
import { PlatformFilter } from "./social-size-chart/PlatformFilter";
import { AssetTypeFilter } from "./social-size-chart/AssetTypeFilter";
import { PlatformSizeTable, SizeChartRow } from "./social-size-chart/PlatformSizeTable";
import { SizeChartEditor } from "./social-size-chart/SizeChartEditor";

// Seed data — all platforms
const SEED_DATA: SizeChartRow[] = [
  // Instagram
  { id: "ig-1", platform: "Instagram", asset_type: "Square Feed", recommended_width: 1080, recommended_height: 1080, aspect_ratio: "1:1", caption_limit: 2200, hashtag_limit: 30, file_type: "JPG/PNG", max_file_size: "30MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "ig-2", platform: "Instagram", asset_type: "Portrait Feed", recommended_width: 1080, recommended_height: 1350, aspect_ratio: "4:5", caption_limit: 2200, hashtag_limit: 30, file_type: "JPG/PNG", max_file_size: "30MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "ig-3", platform: "Instagram", asset_type: "Landscape Feed", recommended_width: 1080, recommended_height: 566, aspect_ratio: "1.91:1", caption_limit: 2200, hashtag_limit: 30, file_type: "JPG/PNG", max_file_size: "30MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "ig-4", platform: "Instagram", asset_type: "Story", recommended_width: 1080, recommended_height: 1920, aspect_ratio: "9:16", safe_zone_notes: "Keep key content in center 1080x1420. Avoid top 250px (UI) and bottom 250px (swipe area).", file_type: "JPG/PNG/MP4", max_file_size: "30MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "ig-5", platform: "Instagram", asset_type: "Profile Photo", recommended_width: 320, recommended_height: 320, aspect_ratio: "1:1", safe_zone_notes: "Displayed as 110px circle. Keep subject centered.", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // Facebook
  { id: "fb-1", platform: "Facebook", asset_type: "Square Post", recommended_width: 1080, recommended_height: 1080, aspect_ratio: "1:1", caption_limit: 63206, file_type: "JPG/PNG", max_file_size: "30MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "fb-2", platform: "Facebook", asset_type: "Link Share", recommended_width: 1200, recommended_height: 630, aspect_ratio: "1.91:1", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },
  { id: "fb-3", platform: "Facebook", asset_type: "Cover Photo", recommended_width: 851, recommended_height: 315, aspect_ratio: "2.7:1", safe_zone_notes: "On mobile, cover is cropped to 640x360. Keep text in center-safe zone.", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },
  { id: "fb-4", platform: "Facebook", asset_type: "Story", recommended_width: 1080, recommended_height: 1920, aspect_ratio: "9:16", file_type: "JPG/PNG/MP4", max_file_size: "30MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "fb-5", platform: "Facebook", asset_type: "Profile", recommended_width: 196, recommended_height: 196, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle. Minimum 180x180 recommended.", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // X / Twitter
  { id: "x-1", platform: "X / Twitter", asset_type: "Profile Photo", recommended_width: 400, recommended_height: 400, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle. Keep subject well within frame.", file_type: "JPG/PNG/GIF", max_file_size: "2MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "x-2", platform: "X / Twitter", asset_type: "Header", recommended_width: 1500, recommended_height: 500, aspect_ratio: "3:1", safe_zone_notes: "Profile photo overlaps bottom-left. Keep important content in center 1260x360.", file_type: "JPG/PNG/GIF", max_file_size: "5MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "x-3", platform: "X / Twitter", asset_type: "Landscape", recommended_width: 1280, recommended_height: 720, aspect_ratio: "16:9", text_limit: 280, file_type: "JPG/PNG/GIF/MP4", max_file_size: "5MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "x-4", platform: "X / Twitter", asset_type: "Square", recommended_width: 720, recommended_height: 720, aspect_ratio: "1:1", text_limit: 280, file_type: "JPG/PNG/GIF", max_file_size: "5MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "x-5", platform: "X / Twitter", asset_type: "Link Card", recommended_width: 1200, recommended_height: 628, aspect_ratio: "1.91:1", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // TikTok
  { id: "tt-1", platform: "TikTok", asset_type: "Vertical Video", recommended_width: 1080, recommended_height: 1920, aspect_ratio: "9:16", caption_limit: 2200, hashtag_limit: 30, safe_zone_notes: "Keep text and key visuals in center 1080x1420. Avoid bottom 400px (UI overlay).", file_type: "MP4/MOV", max_file_size: "287.6MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "tt-2", platform: "TikTok", asset_type: "Profile", recommended_width: 20, recommended_height: 20, aspect_ratio: "1:1", safe_zone_notes: "Minimum 20x20, recommended 200x200 for quality. Displayed as circle.", file_type: "JPG/PNG/GIF", last_verified_at: "2025-01-01", status: "active" },
  { id: "tt-3", platform: "TikTok", asset_type: "Story", recommended_width: 1080, recommended_height: 1920, aspect_ratio: "9:16", file_type: "MP4/MOV", max_file_size: "50MB", last_verified_at: "2025-01-01", status: "active" },

  // YouTube
  { id: "yt-1", platform: "YouTube", asset_type: "Thumbnail", recommended_width: 1280, recommended_height: 720, aspect_ratio: "16:9", safe_zone_notes: "Minimum 640x360. Use high contrast and readable text at small sizes.", file_type: "JPG/PNG/GIF/BMP", max_file_size: "2MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "yt-2", platform: "YouTube", asset_type: "Channel Banner", recommended_width: 2560, recommended_height: 1440, aspect_ratio: "16:9", safe_zone_notes: "Safe area for all devices: 1546x423 centered. TV displays the full 2560x1440.", file_type: "JPG/PNG", max_file_size: "6MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "yt-3", platform: "YouTube", asset_type: "Shorts", recommended_width: 1080, recommended_height: 1920, aspect_ratio: "9:16", file_type: "MP4/MOV", last_verified_at: "2025-01-01", status: "active" },
  { id: "yt-4", platform: "YouTube", asset_type: "Profile", recommended_width: 800, recommended_height: 800, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle. Minimum 98x98.", file_type: "JPG/PNG/GIF/BMP", max_file_size: "2MB", last_verified_at: "2025-01-01", status: "active" },

  // LinkedIn
  { id: "li-1", platform: "LinkedIn", asset_type: "Profile", recommended_width: 400, recommended_height: 400, aspect_ratio: "1:1", file_type: "JPG/PNG/GIF", max_file_size: "8MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "li-2", platform: "LinkedIn", asset_type: "Company Cover", recommended_width: 1128, recommended_height: 191, aspect_ratio: "5.9:1", file_type: "JPG/PNG", max_file_size: "4MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "li-3", platform: "LinkedIn", asset_type: "Link Post", recommended_width: 1200, recommended_height: 627, aspect_ratio: "1.91:1", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },
  { id: "li-4", platform: "LinkedIn", asset_type: "Square Post", recommended_width: 1200, recommended_height: 1200, aspect_ratio: "1:1", caption_limit: 3000, file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // Pinterest
  { id: "pi-1", platform: "Pinterest", asset_type: "Standard Pin", recommended_width: 1000, recommended_height: 1500, aspect_ratio: "2:3", caption_limit: 500, file_type: "JPG/PNG", max_file_size: "20MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "pi-2", platform: "Pinterest", asset_type: "Square Pin", recommended_width: 1000, recommended_height: 1000, aspect_ratio: "1:1", file_type: "JPG/PNG", max_file_size: "20MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "pi-3", platform: "Pinterest", asset_type: "Profile", recommended_width: 165, recommended_height: 165, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle. Minimum 165x165.", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // Reddit
  { id: "rd-1", platform: "Reddit", asset_type: "Profile", recommended_width: 256, recommended_height: 256, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle.", file_type: "JPG/PNG", max_file_size: "1MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "rd-2", platform: "Reddit", asset_type: "Banner", recommended_width: 1920, recommended_height: 384, aspect_ratio: "5:1", file_type: "JPG/PNG", max_file_size: "4MB", last_verified_at: "2025-01-01", status: "active" },

  // Bluesky
  { id: "bs-1", platform: "Bluesky", asset_type: "Profile", recommended_width: 400, recommended_height: 400, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle.", file_type: "JPG/PNG", max_file_size: "1MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "bs-2", platform: "Bluesky", asset_type: "Banner", recommended_width: 1500, recommended_height: 500, aspect_ratio: "3:1", file_type: "JPG/PNG", max_file_size: "1MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "bs-3", platform: "Bluesky", asset_type: "Landscape", recommended_width: 1200, recommended_height: 627, aspect_ratio: "1.91:1", text_limit: 300, file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },
  { id: "bs-4", platform: "Bluesky", asset_type: "Square", recommended_width: 1080, recommended_height: 1080, aspect_ratio: "1:1", text_limit: 300, file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // Threads
  { id: "th-1", platform: "Threads", asset_type: "Profile", recommended_width: 320, recommended_height: 320, aspect_ratio: "1:1", safe_zone_notes: "Synced with Instagram profile photo.", file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },
  { id: "th-2", platform: "Threads", asset_type: "Square", recommended_width: 1080, recommended_height: 1080, aspect_ratio: "1:1", text_limit: 500, file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },
  { id: "th-3", platform: "Threads", asset_type: "Portrait", recommended_width: 1080, recommended_height: 1350, aspect_ratio: "4:5", text_limit: 500, file_type: "JPG/PNG", last_verified_at: "2025-01-01", status: "active" },

  // Mastodon
  { id: "ms-1", platform: "Mastodon", asset_type: "Avatar", recommended_width: 400, recommended_height: 400, aspect_ratio: "1:1", safe_zone_notes: "Displayed as square with rounded corners.", file_type: "JPG/PNG/GIF", max_file_size: "2MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "ms-2", platform: "Mastodon", asset_type: "Header", recommended_width: 1500, recommended_height: 500, aspect_ratio: "3:1", file_type: "JPG/PNG/GIF", max_file_size: "2MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "ms-3", platform: "Mastodon", asset_type: "Landscape", recommended_width: 1200, recommended_height: 675, aspect_ratio: "16:9", text_limit: 500, file_type: "JPG/PNG/GIF", max_file_size: "8MB", last_verified_at: "2025-01-01", status: "active" },

  // Discord
  { id: "dc-1", platform: "Discord", asset_type: "User Avatar", recommended_width: 256, recommended_height: 256, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle. Minimum 128x128 recommended.", file_type: "JPG/PNG/GIF/WebP", max_file_size: "8MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "dc-2", platform: "Discord", asset_type: "Server Icon", recommended_width: 512, recommended_height: 512, aspect_ratio: "1:1", safe_zone_notes: "Displayed as circle. Minimum 512x512 for best quality.", file_type: "JPG/PNG/GIF/WebP", max_file_size: "8MB", last_verified_at: "2025-01-01", status: "active" },
  { id: "dc-3", platform: "Discord", asset_type: "Embed Image", recommended_width: 1200, recommended_height: 628, aspect_ratio: "1.91:1", file_type: "JPG/PNG/GIF/WebP", last_verified_at: "2025-01-01", status: "active" },
  { id: "dc-4", platform: "Discord", asset_type: "Server Banner", recommended_width: 960, recommended_height: 540, aspect_ratio: "16:9", safe_zone_notes: "Requires Boost Level 2+. Animated GIF banners require Level 3.", file_type: "JPG/PNG/GIF", max_file_size: "10MB", last_verified_at: "2025-01-01", status: "active" },
];

const ALL_PLATFORMS = ["All", ...Array.from(new Set(SEED_DATA.map((r) => r.platform))).sort()];
const ALL_ASSET_TYPES = (platform: string) => {
  const rows = platform === "All" ? SEED_DATA : SEED_DATA.filter((r) => r.platform === platform);
  return ["All", ...Array.from(new Set(rows.map((r) => r.asset_type))).sort()];
};

function exportCSV(rows: SizeChartRow[]) {
  const headers = [
    "Platform", "Asset Type", "Width", "Height", "Aspect Ratio",
    "Text Limit", "Caption Limit", "Hashtag Limit", "File Type",
    "Max File Size", "Safe Zone Notes", "Template Path", "Last Verified", "Status",
  ];
  const escape = (v: string | number | undefined) =>
    v == null ? "" : `"${String(v).replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.platform, r.asset_type, r.recommended_width, r.recommended_height,
        r.aspect_ratio, r.text_limit, r.caption_limit, r.hashtag_limit,
        r.file_type, r.max_file_size, r.safe_zone_notes, r.template_path,
        r.last_verified_at, r.status,
      ]
        .map(escape)
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "social-size-chart.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export const SocialSizeChartPage: React.FC = () => {
  const [rows, setRows] = useState<SizeChartRow[]>(SEED_DATA);
  const [platformFilter, setPlatformFilter] = useState("All");
  const [assetTypeFilter, setAssetTypeFilter] = useState("All");
  const [editingRow, setEditingRow] = useState<SizeChartRow | null | undefined>(undefined);
  const [copyMsg, setCopyMsg] = useState("");

  const assetTypes = useMemo(() => ALL_ASSET_TYPES(platformFilter), [platformFilter]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const matchPlatform = platformFilter === "All" || r.platform === platformFilter;
      const matchAsset = assetTypeFilter === "All" || r.asset_type === assetTypeFilter;
      return matchPlatform && matchAsset;
    });
  }, [rows, platformFilter, assetTypeFilter]);

  const handlePlatformChange = (p: string) => {
    setPlatformFilter(p);
    setAssetTypeFilter("All");
  };

  const handleSave = (saved: SizeChartRow) => {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r.id === saved.id);
      return idx >= 0 ? prev.map((r) => (r.id === saved.id ? saved : r)) : [...prev, saved];
    });
    setEditingRow(undefined);
  };

  const handleCopy = (row: SizeChartRow) => {
    const text = `${row.recommended_width}x${row.recommended_height}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopyMsg(`Copied ${text}`);
      setTimeout(() => setCopyMsg(""), 2000);
    });
  };

  const handleToggleStatus = (row: SizeChartRow) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? { ...r, status: r.status === "active" ? "outdated" : "active" }
          : r
      )
    );
  };

  return (
    <AdminLayout title="Social Size Chart">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <PlatformFilter
          platforms={ALL_PLATFORMS}
          selected={platformFilter}
          onChange={handlePlatformChange}
        />
        <AssetTypeFilter
          assetTypes={assetTypes}
          selected={assetTypeFilter}
          onChange={setAssetTypeFilter}
        />
        <div className="ml-auto flex items-center gap-2">
          {copyMsg && (
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
              ✓ {copyMsg}
            </span>
          )}
          <button
            onClick={() => exportCSV(filteredRows)}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-textMuted hover:text-textPrimary rounded-lg text-sm transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => setEditingRow(null)}
            className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + Add New Spec
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-textMuted mb-4">
        Showing {filteredRows.length} of {rows.length} specs
      </p>

      <PlatformSizeTable
        rows={filteredRows}
        onEdit={(row) => setEditingRow(row)}
        onCopy={handleCopy}
        onToggleStatus={handleToggleStatus}
      />

      {/* Editor modal */}
      {editingRow !== undefined && (
        <SizeChartEditor
          row={editingRow}
          onSave={handleSave}
          onCancel={() => setEditingRow(undefined)}
        />
      )}
    </AdminLayout>
  );
};
