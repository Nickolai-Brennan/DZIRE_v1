/**
 * Design System — Card Component
 *
 * Variants: default | glass | elevated | outline | vip | sponsor
 */
import React from 'react';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'outline' | 'vip' | 'sponsor';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  /** Make the card interactive (hover + pointer) */
  interactive?: boolean;
  /** Additional Tailwind classes */
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-surface border border-white/8',
  glass:
    'bg-white/5 border border-white/10 backdrop-blur-md',
  elevated: 'bg-surfaceAlt border border-white/10 shadow-lg',
  outline: 'bg-transparent border border-white/20',
  vip: 'bg-purple-900/20 border border-purple-500/30',
  sponsor: 'bg-yellow-900/10 border border-yellow-500/20',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          : undefined
      }
      className={[
        'rounded-2xl',
        variantClasses[variant],
        interactive
          ? 'cursor-pointer transition-all duration-300 hover:border-white/16 hover:bg-opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};

// ── Convenience sub-components ─────────────────────────────────
export interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardSectionProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-white/8 ${className}`}>{children}</div>
);

export const CardBody: React.FC<CardSectionProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-5 ${className}`}>{children}</div>
);

export const CardFooter: React.FC<CardSectionProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-white/8 ${className}`}>{children}</div>
);
