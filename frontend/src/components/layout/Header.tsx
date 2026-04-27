import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/positions', label: 'Positions' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/dzire-dolls', label: 'DZIRE Dolls' },
    { to: '/stories', label: 'Stories' },
    { to: '/magazine', label: 'Magazine' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              DZIRE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-textMuted hover:text-textPrimary transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link to="/search" className="p-2 hover:bg-surface rounded-lg transition-colors">
              <Search className="w-5 h-5 text-textMuted" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-textMuted" />
              ) : (
                <Menu className="w-6 h-6 text-textMuted" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/8 bg-surface">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-textPrimary hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
