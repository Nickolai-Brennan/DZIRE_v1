import React from "react";

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggle: (tag: string) => void;
  className?: string;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  activeTags,
  onToggle,
  className = "",
}) => {
  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggle(tag)}
          className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
            activeTags.includes(tag)
              ? "bg-primary text-white border-primary"
              : "bg-surface border-white/10 text-textMuted hover:border-white/20 hover:text-textPrimary"
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};
