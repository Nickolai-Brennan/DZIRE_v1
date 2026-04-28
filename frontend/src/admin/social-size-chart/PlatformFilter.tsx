/**
 * frontend/src/admin/social-size-chart/PlatformFilter.tsx
 * Dropdown filter for social platform selection.
 */
import React from "react";

export interface PlatformFilterProps {
  platforms: string[];
  selected: string;
  onChange: (platform: string) => void;
}

export const PlatformFilter: React.FC<PlatformFilterProps> = ({ platforms, selected, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-textMuted whitespace-nowrap">Platform:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surfaceAlt border border-white/10 text-textPrimary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {platforms.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
};
