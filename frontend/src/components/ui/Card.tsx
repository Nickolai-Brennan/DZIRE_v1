import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = false 
}) => {
  const baseClasses = 'bg-surface rounded-2xl border border-white/8 backdrop-blur-sm';
  const hoverClasses = hover ? 'hover:bg-surfaceAlt hover:border-white/12 transition-all duration-300 cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};
