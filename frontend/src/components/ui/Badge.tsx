import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "category" | "trophy" | "accent" | "sponsor";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";

  const variantClasses = {
    default: "bg-surface text-textMuted border border-white/10",
    category: "bg-primary/20 text-accent border border-primary/30",
    trophy: "bg-gold/20 text-gold border border-gold/40",
    accent: "bg-accent/20 text-accent border border-accent/30",
    sponsor: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/40",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
