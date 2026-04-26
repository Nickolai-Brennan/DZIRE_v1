import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AdminButton } from './AdminButton';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AdminButton />
    </div>
  );
};
