/**
 * Design System — StatCard Component
 *
 * Displays a KPI metric with an optional icon, trend indicator, and label.
 */
import React from "react";

export type TrendDirection = "up" | "down" | "neutral";

export interface StatCardProps {
  /** Primary metric value (e.g. "12,400") */
  value: string | number;
  /** Label / metric name */
  label: string;
  /** Optional descriptive sub-label */
  description?: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Trend percentage string (e.g. "+4.2%") */
  trend?: string;
  trendDirection?: TrendDirection;
  className?: string;
}

const trendColors: Record<TrendDirection, string> = {
  up: "text-green-400",
  down: "text-red-400",
  neutral: "text-textMuted",
};

const trendIcons: Record<TrendDirection, React.ReactNode> = {
  up: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  down: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  neutral: null,
};

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  icon,
  trend,
  trendDirection = "neutral",
  className = "",
}) => {
  return (
    <div
      className={[
        "bg-surface border border-white/8 rounded-2xl p-5 flex flex-col gap-3",
        className,
      ].join(" ")}
    >
      {/* Icon + trend row */}
      <div className="flex items-start justify-between">
        {icon && (
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        {trend && (
          <span
            className={[
              "ml-auto inline-flex items-center gap-0.5 text-xs font-medium",
              trendColors[trendDirection],
            ].join(" ")}
          >
            {trendIcons[trendDirection]}
            {trend}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-textPrimary leading-none">
        {value}
      </p>

      {/* Label */}
      <div>
        <p className="text-sm font-medium text-textMuted">{label}</p>
        {description && (
          <p className="text-xs text-textSubtle mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
};
