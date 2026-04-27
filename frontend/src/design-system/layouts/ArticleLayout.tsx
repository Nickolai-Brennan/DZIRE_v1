/**
 * Design System — ArticleLayout
 *
 * Optimised for long-form article / blog post reading experience.
 * Narrow content column with optional sidebar.
 */
import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export interface ArticleLayoutProps {
  children: React.ReactNode;
  /** Optional sidebar content (TOC, related posts, etc.) */
  sidebar?: React.ReactNode;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  children,
  sidebar,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className={`flex gap-10 ${sidebar ? 'flex-col lg:flex-row' : ''}`}>
          {/* Article body */}
          <article className="flex-1 min-w-0 max-w-2xl">
            {children}
          </article>

          {/* Optional sidebar */}
          {sidebar && (
            <aside className="lg:w-72 shrink-0 space-y-6" aria-label="Article sidebar">
              {sidebar}
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
