/**
 * frontend/src/admin/social-size-chart/SizeChartEditor.tsx
 * Modal form for creating or editing a social media size chart spec.
 */
import React, { useEffect, useState } from "react";
import { SizeChartRow } from "./PlatformSizeTable";

interface SizeChartEditorProps {
  row: SizeChartRow | null;
  onSave: (row: SizeChartRow) => void;
  onCancel: () => void;
}

const EMPTY_ROW: SizeChartRow = {
  id: "",
  platform: "",
  asset_type: "",
  recommended_width: 0,
  recommended_height: 0,
  aspect_ratio: "",
  text_limit: undefined,
  caption_limit: undefined,
  hashtag_limit: undefined,
  safe_zone_notes: "",
  file_type: "",
  max_file_size: "",
  template_path: "",
  last_verified_at: "",
  status: "active",
};

export const SizeChartEditor: React.FC<SizeChartEditorProps> = ({ row, onSave, onCancel }) => {
  const [form, setForm] = useState<SizeChartRow>(EMPTY_ROW);

  useEffect(() => {
    setForm(row ?? { ...EMPTY_ROW, id: crypto.randomUUID() });
  }, [row]);

  const set = <K extends keyof SizeChartRow>(key: K, value: SizeChartRow[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const inputClass =
    "w-full bg-background border border-white/10 text-textPrimary text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-textMuted";
  const labelClass = "block text-xs text-textMuted mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-2xl bg-surfaceAlt border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-base font-semibold text-textPrimary">
            {row ? "Edit Spec" : "Add New Spec"}
          </h2>
          <button
            onClick={onCancel}
            className="text-textMuted hover:text-textPrimary transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Platform *</label>
              <input
                required
                className={inputClass}
                value={form.platform}
                onChange={(e) => set("platform", e.target.value)}
                placeholder="e.g. Instagram"
              />
            </div>
            <div>
              <label className={labelClass}>Asset Type *</label>
              <input
                required
                className={inputClass}
                value={form.asset_type}
                onChange={(e) => set("asset_type", e.target.value)}
                placeholder="e.g. Square Feed"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Width (px) *</label>
              <input
                required
                type="number"
                min={1}
                className={inputClass}
                value={form.recommended_width || ""}
                onChange={(e) => set("recommended_width", Number(e.target.value))}
              />
            </div>
            <div>
              <label className={labelClass}>Height (px) *</label>
              <input
                required
                type="number"
                min={1}
                className={inputClass}
                value={form.recommended_height || ""}
                onChange={(e) => set("recommended_height", Number(e.target.value))}
              />
            </div>
            <div>
              <label className={labelClass}>Aspect Ratio</label>
              <input
                className={inputClass}
                value={form.aspect_ratio ?? ""}
                onChange={(e) => set("aspect_ratio", e.target.value)}
                placeholder="e.g. 1:1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Text Limit</label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.text_limit ?? ""}
                onChange={(e) => set("text_limit", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <label className={labelClass}>Caption Limit</label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.caption_limit ?? ""}
                onChange={(e) => set("caption_limit", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <label className={labelClass}>Hashtag Limit</label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.hashtag_limit ?? ""}
                onChange={(e) => set("hashtag_limit", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Safe Zone Notes</label>
            <textarea
              rows={3}
              className={inputClass}
              value={form.safe_zone_notes ?? ""}
              onChange={(e) => set("safe_zone_notes", e.target.value)}
              placeholder="Notes about safe areas, UI overlays, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>File Type</label>
              <input
                className={inputClass}
                value={form.file_type ?? ""}
                onChange={(e) => set("file_type", e.target.value)}
                placeholder="e.g. JPG, PNG, MP4"
              />
            </div>
            <div>
              <label className={labelClass}>Max File Size</label>
              <input
                className={inputClass}
                value={form.max_file_size ?? ""}
                onChange={(e) => set("max_file_size", e.target.value)}
                placeholder="e.g. 30MB"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Template Path</label>
              <input
                className={inputClass}
                value={form.template_path ?? ""}
                onChange={(e) => set("template_path", e.target.value)}
                placeholder="e.g. instagram/square-feed.psd"
              />
            </div>
            <div>
              <label className={labelClass}>Last Verified At</label>
              <input
                type="date"
                className={inputClass}
                value={form.last_verified_at ?? ""}
                onChange={(e) => set("last_verified_at", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => set("status", e.target.value as SizeChartRow["status"])}
            >
              <option value="active">Active</option>
              <option value="outdated">Outdated</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm text-textMuted hover:text-textPrimary hover:bg-white/5 transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
