import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * PublicLayout — shell for all public-facing pages.
 * Pass a custom header/footer or drop in the app's existing Header/Footer components.
 */
export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, header, footer }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      {header && <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-white/8">{header}</header>}
      <main className="flex-1">{children}</main>
      {footer && <footer className="border-t border-white/8">{footer}</footer>}
    </div>
  );
};
