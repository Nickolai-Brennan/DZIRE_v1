import React from 'react';
import { X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterPanelProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (groupId: string, value: string) => void;
  onClear?: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  groups,
  selected,
  onChange,
  onClear,
  className = '',
}) => {
  const hasFilters = Object.values(selected).some((v) => v.length > 0);

  return (
    <aside className={`bg-surface rounded-xl border border-white/8 p-5 space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-textPrimary">Filters</span>
        {hasFilters && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-textMuted hover:text-primary transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {groups.map((group) => (
        <div key={group.id}>
          <p className="text-xs font-medium text-textMuted uppercase tracking-wider mb-2">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const isActive = (selected[group.id] ?? []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(group.id, opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-surfaceAlt text-textMuted border border-white/10 hover:border-primary/40 hover:text-textPrimary'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};
