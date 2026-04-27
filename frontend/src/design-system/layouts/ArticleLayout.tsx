import React from 'react';

interface ArticleLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * ArticleLayout — constrained reading width with optional sidebar.
 */
export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      {header && <div>{header}</div>}

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`flex gap-12 ${sidebar ? 'items-start' : 'justify-center'}`}>
          <article className="flex-1 max-w-3xl min-w-0 prose-invert">{children}</article>
          {sidebar && (
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">{sidebar}</aside>
          )}
        </div>
      </div>

      {footer && <div>{footer}</div>}
    </div>
  );
};
