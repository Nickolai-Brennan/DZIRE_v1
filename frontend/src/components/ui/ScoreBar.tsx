import React from 'react';

interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
  color?: 'primary' | 'gold' | 'green';
}

export const ScoreBar: React.FC<ScoreBarProps> = ({ label, value, max = 10, color = 'primary' }) => {
  const pct = Math.round((value / max) * 100);
  const colorClasses = {
    primary: 'bg-primary',
    gold: 'bg-gold',
    green: 'bg-green-500',
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-textMuted w-32 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold text-textPrimary w-8 text-right">{value}</span>
    </div>
  );
};
