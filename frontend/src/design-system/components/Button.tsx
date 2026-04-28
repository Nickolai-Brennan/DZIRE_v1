/**
 * Design System — Button Component
 *
 * Variants: primary | secondary | accent | ghost | outline | danger | vip | sponsor
 * Sizes: sm | md | lg
 */
import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline"
  | "danger"
  | "vip"
  | "sponsor";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render a full-width block button */
  block?: boolean;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Prepend an icon element */
  leftIcon?: React.ReactNode;
  /** Append an icon element */
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-accent text-white focus-visible:ring-primary/50",
  secondary:
    "bg-surface hover:bg-surfaceAlt text-textPrimary border border-white/10 focus-visible:ring-white/20",
  accent: "bg-accent hover:bg-primary text-white focus-visible:ring-accent/50",
  ghost:
    "bg-transparent hover:bg-white/5 text-textPrimary focus-visible:ring-white/20",
  outline:
    "bg-transparent border border-white/20 hover:border-white/40 text-textPrimary focus-visible:ring-white/20",
  danger:
    "bg-red-700 hover:bg-red-600 text-white focus-visible:ring-red-500/50",
  vip: "bg-purple-700 hover:bg-purple-600 text-white focus-visible:ring-purple-500/50",
  sponsor:
    "bg-yellow-500 hover:bg-yellow-400 text-black focus-visible:ring-yellow-400/50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={[
        "inline-flex items-center justify-center font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        block ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
