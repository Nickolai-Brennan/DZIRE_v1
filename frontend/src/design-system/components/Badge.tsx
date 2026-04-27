/**
 * Design System — Badge Component
 *
 * Variants: default | category | success | warning | danger | info | vip | sponsor | trophy
 * Sizes: sm | md
 */
import React from 'react';

export type BadgeVariant =
  | 'default'
  | 'category'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'vip'
  | 'sponsor'
  | 'trophy';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface text-textMuted border border-white/10',
  category: 'bg-primary/20 text-accent border border-primary/30',
  success: 'bg-green-900/30 text-green-400 border border-green-500/30',
  warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
  danger: 'bg-red-900/30 text-red-400 border border-red-500/30',
  info: 'bg-blue-900/30 text-blue-400 border border-blue-500/30',
  vip: 'bg-purple-900/30 text-purple-300 border border-purple-500/30',
  sponsor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/40',
  trophy: 'bg-gold/20 text-gold border border-gold/40',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};
