import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
}

/**
 * AdminLayout — shell for all admin dashboard pages.
 * Pass a sidebar and optional header node, or use the existing AdminLayout from /admin/.
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  sidebar,
  header,
  title,
}) => {
  return (
    <div className="min-h-screen flex bg-background text-textPrimary">
      {sidebar && (
        <aside className="w-56 flex-shrink-0 bg-surfaceAlt border-r border-white/10 flex flex-col">
          {sidebar}
        </aside>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {(header ?? title) && (
          <header className="px-8 py-5 border-b border-white/10 bg-background/80 backdrop-blur-sm flex-shrink-0">
            {header ?? <h1 className="text-xl font-semibold text-textPrimary">{title}</h1>}
          </header>
        )}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};
