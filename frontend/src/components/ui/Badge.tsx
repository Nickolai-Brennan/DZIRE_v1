import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "category" | "trophy";
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
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
