import React from "react";

const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most_viewed", label: "Most Viewed" },
  { value: "most_clicked", label: "Most Clicked" },
];

interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-surface border border-white/10 rounded-lg text-sm text-textPrimary px-3 py-2 focus:outline-none focus:border-primary/50 transition-colors ${className}`}
      aria-label="Sort results"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
