import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-20 px-4 text-center ${className}`}
    >
      {icon && <div className="mb-4 text-textMuted opacity-60">{icon}</div>}
      <h3 className="text-xl font-bold text-textPrimary mb-2">{title}</h3>
      {description && (
        <p className="text-textMuted mb-6 max-w-md text-sm">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
