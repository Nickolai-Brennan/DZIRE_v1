/**
 * frontend/src/admin/social-size-chart/AssetTypeFilter.tsx
 * Dropdown filter for asset type selection.
 */
import React from "react";

export interface AssetTypeFilterProps {
  assetTypes: string[];
  selected: string;
  onChange: (type: string) => void;
}

export const AssetTypeFilter: React.FC<AssetTypeFilterProps> = ({ assetTypes, selected, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-textMuted whitespace-nowrap">Asset Type:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surfaceAlt border border-white/10 text-textPrimary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {assetTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};
