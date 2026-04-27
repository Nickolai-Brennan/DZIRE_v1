import React from 'react';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'category'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'vip'
  | 'sponsor'
  | 'gold';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface text-textMuted border border-white/10',
  primary: 'bg-primary/20 text-accent border border-primary/30',
  category: 'bg-primary/20 text-accent border border-primary/30',
  success: 'bg-green-900/40 text-green-400 border border-green-500/30',
  warning: 'bg-yellow-900/40 text-yellow-400 border border-yellow-500/30',
  danger: 'bg-red-900/40 text-red-400 border border-red-500/30',
  info: 'bg-blue-900/40 text-blue-400 border border-blue-500/30',
  vip: 'bg-purple-900/40 text-purple-300 border border-purple-500/40',
  sponsor: 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/40',
  gold: 'bg-gold/20 text-gold border border-gold/40',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';

  return (
    <span className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
