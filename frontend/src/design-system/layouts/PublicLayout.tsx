/**
 * Design System — PublicLayout
 *
 * Standard public-facing layout with Header and Footer.
 * Delegates to the existing Header/Footer in components/layout/.
 */
import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export interface PublicLayoutProps {
  children: React.ReactNode;
  /** Remove max-width container (useful for full-bleed hero pages) */
  fluid?: boolean;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  fluid = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />
      <main className={fluid ? 'flex-1' : 'flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
