import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendLabel,
  icon,
  className = '',
}) => {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div className={`bg-surface rounded-2xl border border-white/8 p-6 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-textMuted font-medium">{label}</span>
        {icon && <span className="text-textMuted">{icon}</span>}
      </div>

      <div className="text-3xl font-bold text-textPrimary mb-2">{value}</div>

      {trend !== undefined && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>
            {isPositive ? '+' : ''}
            {trend}%
          </span>
          {trendLabel && <span className="text-textMuted ml-1">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};
