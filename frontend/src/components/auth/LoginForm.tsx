/**
 * frontend/src/components/auth/LoginForm.tsx
 * Reusable login form component.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-white/10 p-8 space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-textMuted mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-textMuted mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Your password"
          required
          className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-xs text-textMuted hover:text-primary transition-colors">
          Forgot password?
        </Link>
      </div>

      <Button variant="primary" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in…' : 'Log In'}
      </Button>

      <p className="text-center text-sm text-textMuted">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary hover:text-accent transition-colors">
          Sign up
        </Link>
      </p>
    </form>
  );
};
