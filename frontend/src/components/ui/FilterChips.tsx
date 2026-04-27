import React from "react";

interface FilterChipsProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  active,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${className}`}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === filter
              ? "bg-primary text-white"
              : "bg-surface text-textMuted border border-white/10 hover:border-primary/40 hover:text-textPrimary"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
