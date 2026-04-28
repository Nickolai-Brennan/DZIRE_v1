/**
 * Design System — LandingPageLayout
 *
 * Minimal, full-width layout for marketing / landing pages.
 * No container constraints — each section is responsible for its own width.
 */
import React from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

export interface LandingPageLayoutProps {
  children: React.ReactNode;
  /** Hide the shared Header (useful for custom branded headers) */
  hideHeader?: boolean;
  /** Hide the shared Footer */
  hideFooter?: boolean;
}

export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
  children,
  hideHeader = false,
  hideFooter = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary overflow-x-hidden">
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
