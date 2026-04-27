/**
 * frontend/src/auth/ForgotPasswordPage.tsx
 * Forgot-password page — submits the user's email to receive a reset link.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { forgotPassword } from '../services/authService';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-textPrimary mb-2">Forgot Password</h1>
          <p className="text-textMuted">Enter your email and we'll send a reset link.</p>
        </div>

        {submitted ? (
          <div className="bg-surface rounded-2xl border border-white/10 p-8 text-center space-y-4">
            <p className="text-textPrimary">Check your inbox for a password reset link.</p>
            <Link to="/login" className="text-primary hover:text-accent transition-colors text-sm">
              Back to login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface rounded-2xl border border-white/10 p-8 space-y-5"
          >
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
            <Button variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Sending…' : 'Send Reset Link'}
            </Button>
            <p className="text-center text-sm text-textMuted">
              <Link to="/login" className="text-primary hover:text-accent transition-colors">
                Back to login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
