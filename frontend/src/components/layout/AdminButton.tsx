import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AdminButton: React.FC = () => {
  return (
    <Link
      to="/admin/login"
      className="fixed bottom-6 right-6 p-4 bg-surfaceAlt border border-white/10 rounded-full hover:bg-surface hover:border-primary/50 transition-all shadow-2xl z-50 group"
      title="Admin Access"
    >
      <Shield className="w-6 h-6 text-textMuted group-hover:text-primary transition-colors" />
    </Link>
  );
};
