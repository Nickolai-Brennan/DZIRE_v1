import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'primary' | 'gold' | 'vip';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const glowClasses = {
  primary: 'shadow-[0_0_24px_rgba(225,29,72,0.25)]',
  gold: 'shadow-[0_0_24px_rgba(245,196,81,0.25)]',
  vip: 'shadow-[0_0_24px_rgba(192,132,252,0.25)]',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glow,
  padding = 'none',
}) => {
  const base = 'bg-surface rounded-2xl border border-white/8 backdrop-blur-sm';
  const hoverClass = hover ? 'hover:bg-surfaceAlt hover:border-white/12 transition-all duration-300 cursor-pointer' : '';
  const glowClass = glow ? glowClasses[glow] : '';
  const padClass = paddingClasses[padding];

  return (
    <div className={`${base} ${hoverClass} ${glowClass} ${padClass} ${className}`}>
      {children}
    </div>
  );
};
