import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, ListMusic, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlaylist } from '../../context/PlaylistContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const { playlists } = usePlaylist();
  const navigate = useNavigate();

  const totalSavedItems = playlists.reduce((sum, p) => sum + p.items.length, 0);

  const navLinks = [
    { to: '/positions', label: 'Positions' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/dzire-dolls', label: 'DZIRE Dolls' },
    { to: '/stories', label: 'Stories' },
    { to: '/explore', label: 'Explore' },
    { to: '/vip', label: 'VIP' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

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
          <nav className="hidden lg:flex items-center gap-6">
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
          <div className="flex items-center gap-2">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center gap-1">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-36 bg-surfaceAlt border border-white/10 rounded-lg px-3 py-1.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
              />
              <button type="submit" className="p-2 hover:bg-surface rounded-lg transition-colors">
                <Search className="w-4 h-4 text-textMuted" />
              </button>
            </form>

            {/* Playlists */}
            <Link to="/playlists" className="relative p-2 hover:bg-surface rounded-lg transition-colors">
              <ListMusic className="w-5 h-5 text-textMuted" />
              {totalSavedItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalSavedItems > 9 ? '9+' : totalSavedItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-surface rounded-lg transition-colors">
                  <User className="w-5 h-5 text-textMuted" />
                  <span className="hidden sm:block text-sm text-textMuted">{user?.displayName}</span>
                </Link>
                <button onClick={logout} className="p-2 hover:bg-surface rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 text-textMuted" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm text-primary hover:text-accent transition-colors font-medium px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-primary/10">
                Sign In
              </Link>
            )}

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
            <hr className="border-white/10" />
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-textPrimary hover:text-primary transition-colors font-medium">Profile</Link>
                <Link to="/playlists" onClick={() => setMobileMenuOpen(false)} className="block text-textPrimary hover:text-primary transition-colors font-medium">Playlists</Link>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-textPrimary hover:text-primary transition-colors font-medium">Log In</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block text-textPrimary hover:text-primary transition-colors font-medium">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
