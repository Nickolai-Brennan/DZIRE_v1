import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AdminButton: React.FC = () => {
  // Only render in development builds
  if (!import.meta.env.DEV) return null;

  return (
    <Link
      to="/admin/login"
      className="fixed bottom-6 right-6 p-4 bg-surfaceAlt border border-white/10 rounded-full hover:bg-surface hover:border-primary/50 transition-all shadow-2xl z-50 group"
      title="Admin"
      aria-label="Admin login"
    >
      <Shield className="w-6 h-6 text-textMuted group-hover:text-primary transition-colors" />
      <span
        aria-hidden="true"
        className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-xs text-textMuted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-surface border border-white/10 px-2 py-1 rounded pointer-events-none"
      >
        Admin
      </span>
    </Link>
  );
};
