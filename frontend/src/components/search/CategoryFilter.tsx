import React from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onChange("")}
        className={`text-sm rounded-full px-4 py-1.5 border transition-colors ${
          !activeCategory
            ? "bg-primary text-white border-primary"
            : "bg-surface border-white/10 text-textMuted hover:border-white/20 hover:text-textPrimary"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-sm rounded-full px-4 py-1.5 border transition-colors ${
            activeCategory === cat
              ? "bg-primary text-white border-primary"
              : "bg-surface border-white/10 text-textMuted hover:border-white/20 hover:text-textPrimary"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
