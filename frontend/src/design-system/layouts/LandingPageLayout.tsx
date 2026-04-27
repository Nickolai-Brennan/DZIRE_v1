import React from 'react';

interface LandingPageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * LandingPageLayout — full-width section-based layout for marketing/landing pages.
 */
export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary overflow-x-hidden">
      {header && (
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-white/8">
          {header}
        </header>
      )}
      <main className="flex-1 flex flex-col">{children}</main>
      {footer && (
        <footer className="border-t border-white/8 bg-surfaceAlt">{footer}</footer>
      )}
    </div>
  );
};
