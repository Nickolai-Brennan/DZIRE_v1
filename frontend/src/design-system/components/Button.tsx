import React from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'vip'
  | 'sponsor';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary hover:bg-accent text-white',
  secondary: 'bg-surface hover:bg-surfaceAlt text-textPrimary border border-white/10',
  accent: 'bg-accent hover:bg-primary text-white',
  ghost: 'bg-transparent hover:bg-surface text-textPrimary',
  outline: 'bg-transparent border border-white/20 text-textPrimary hover:border-white/40 hover:bg-white/5',
  danger: 'bg-danger hover:bg-red-700 text-white',
  vip: 'bg-purple-500 hover:bg-purple-400 text-white',
  sponsor: 'bg-gold hover:bg-gold/90 text-background font-bold',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60';

  return (
    <button
      type={type}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
