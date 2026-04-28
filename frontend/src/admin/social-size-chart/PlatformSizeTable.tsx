/**
 * frontend/src/admin/social-size-chart/PlatformSizeTable.tsx
 * Table displaying social media size chart rows.
 */
import React from "react";
import { TemplateDownloadButton } from "./TemplateDownloadButton";

export interface SizeChartRow {
  id: string;
  platform: string;
  asset_type: string;
  recommended_width: number;
  recommended_height: number;
  aspect_ratio?: string;
  text_limit?: number;
  caption_limit?: number;
  hashtag_limit?: number;
  safe_zone_notes?: string;
  file_type?: string;
  max_file_size?: string;
  template_path?: string;
  last_verified_at?: string;
  status: "active" | "outdated" | "deprecated";
}

export interface PlatformSizeTableProps {
  rows: SizeChartRow[];
  onEdit: (row: SizeChartRow) => void;
  onCopy: (row: SizeChartRow) => void;
  onToggleStatus: (row: SizeChartRow) => void;
}

const STATUS_COLORS: Record<SizeChartRow["status"], string> = {
  active: "bg-green-500/20 text-green-400",
  outdated: "bg-yellow-500/20 text-yellow-400",
  deprecated: "bg-red-500/20 text-red-400",
};

export const PlatformSizeTable: React.FC<PlatformSizeTableProps> = ({
  rows,
  onEdit,
  onCopy,
  onToggleStatus,
}) => {
  if (rows.length === 0) {
    return <p className="text-textMuted italic mt-4">No specs match the current filter.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-textMuted text-left">
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Platform</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Asset Type</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Width</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Height</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Ratio</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Text Limit</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Status</th>
            <th className="pb-3 pr-3 font-medium whitespace-nowrap">Last Verified</th>
            <th className="pb-3 font-medium whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-white/3 transition-colors">
              <td className="py-3 pr-3 text-textPrimary font-medium whitespace-nowrap">{row.platform}</td>
              <td className="py-3 pr-3 text-textMuted whitespace-nowrap">{row.asset_type}</td>
              <td className="py-3 pr-3 text-textMuted">{row.recommended_width}</td>
              <td className="py-3 pr-3 text-textMuted">{row.recommended_height}</td>
              <td className="py-3 pr-3 text-textMuted">{row.aspect_ratio ?? "—"}</td>
              <td className="py-3 pr-3 text-textMuted">{row.text_limit ?? "—"}</td>
              <td className="py-3 pr-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[row.status]}`}>
                  {row.status}
                </span>
              </td>
              <td className="py-3 pr-3 text-textMuted text-xs whitespace-nowrap">
                {row.last_verified_at ?? "—"}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-textMuted hover:text-textPrimary rounded text-xs transition-colors border border-white/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onCopy(row)}
                    title={`Copy ${row.recommended_width}x${row.recommended_height}`}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-textMuted hover:text-textPrimary rounded text-xs transition-colors border border-white/10"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => onToggleStatus(row)}
                    className={`px-2 py-1 rounded text-xs transition-colors border ${
                      row.status === "active"
                        ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                        : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
                    }`}
                  >
                    {row.status === "active" ? "Mark Outdated" : "Mark Active"}
                  </button>
                  {row.template_path && (
                    <TemplateDownloadButton
                      templatePath={row.template_path}
                      platform={row.platform}
                      assetType={row.asset_type}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
