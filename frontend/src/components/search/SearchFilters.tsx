import React from "react";

interface SearchFiltersProps {
  contentTypes: string[];
  activeContentType: string;
  onContentTypeChange: (type: string) => void;
  isVipOnly: boolean | null;
  onVipOnlyChange: (value: boolean | null) => void;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  contentTypes,
  activeContentType,
  onContentTypeChange,
  isVipOnly,
  onVipOnlyChange,
  className = "",
}) => {
  return (
    <aside className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-sm font-semibold text-textPrimary uppercase tracking-widest mb-3">
          Content Type
        </h3>
        <ul className="space-y-1">
          {["All", ...contentTypes].map((type) => (
            <li key={type}>
              <button
                onClick={() => onContentTypeChange(type === "All" ? "" : type)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  (type === "All" && !activeContentType) ||
                  activeContentType === type
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-textMuted hover:bg-surface hover:text-textPrimary"
                }`}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-textPrimary uppercase tracking-widest mb-3">
          Access
        </h3>
        <ul className="space-y-1">
          {[
            { label: "All Content", value: null },
            { label: "Free / Public", value: false },
            { label: "VIP Only", value: true },
          ].map((opt) => (
            <li key={String(opt.value)}>
              <button
                onClick={() => onVipOnlyChange(opt.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  isVipOnly === opt.value
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-textMuted hover:bg-surface hover:text-textPrimary"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
