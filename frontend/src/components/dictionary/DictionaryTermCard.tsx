import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import type { DictionaryTerm } from "../../data/types";

interface DictionaryTermCardProps {
  term: DictionaryTerm;
  featured?: boolean;
}

export const DictionaryTermCard: React.FC<DictionaryTermCardProps> = ({
  term,
  featured = false,
}) => {
  return (
    <Link
      to={`/dictionary/${term.slug}`}
      className={`group block bg-surface rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 ${
        featured
          ? "border-primary/30 hover:border-primary/60"
          : "border-white/8 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className={`font-bold text-textPrimary group-hover:text-primary transition-colors ${featured ? "text-xl" : "text-lg"}`}
        >
          {term.term}
        </h3>
        <Badge variant="category">{term.category}</Badge>
      </div>
      {term.pronunciation && (
        <p className="text-xs text-textMuted italic mb-2">
          / {term.pronunciation} /
        </p>
      )}
      <p className="text-sm text-textMuted line-clamp-2">{term.shortDef}</p>
    </Link>
  );
};
