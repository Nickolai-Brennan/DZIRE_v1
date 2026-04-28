/**
 * frontend/src/auth/ResetPasswordPage.tsx
 * Reset-password page — accepts a token from the URL query param and sets a new password.
 */
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { resetPassword } from "../services/authService";

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Reset failed. Your link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-textPrimary mb-2">
            Reset Password
          </h1>
          <p className="text-textMuted">Enter your new password below.</p>
        </div>

        {success ? (
          <div className="bg-surface rounded-2xl border border-white/10 p-8 text-center">
            <p className="text-green-400">
              Password updated! Redirecting to login…
            </p>
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
              <label className="block text-sm font-medium text-textMuted mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat new password"
                required
                className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
              />
            </div>
            <Button variant="primary" className="w-full" disabled={loading}>
              {loading ? "Saving…" : "Set New Password"}
            </Button>
            <p className="text-center text-sm text-textMuted">
              <Link
                to="/login"
                className="text-primary hover:text-accent transition-colors"
              >
                Back to login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
