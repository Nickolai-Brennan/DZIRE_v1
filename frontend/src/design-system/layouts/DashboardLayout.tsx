import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  kpiRow?: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

/**
 * DashboardLayout — full-width grid layout shell for analytics/dashboard pages.
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  kpiRow,
  title,
  actions,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {(title ?? actions) && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          {title && <h1 className="text-2xl font-bold text-textPrimary">{title}</h1>}
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}

      {kpiRow && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">{kpiRow}</section>
      )}

      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
};
