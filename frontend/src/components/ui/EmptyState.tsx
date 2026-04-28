import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <h3 className="text-2xl font-bold text-textPrimary mb-2">{title}</h3>
    {description && (
      <p className="text-textMuted mb-6 max-w-md">{description}</p>
    )}
    {action && <div>{action}</div>}
  </div>
);
