/**
 * frontend/src/pages/admin/AdminLoginPage.tsx
 * Admin login form with dev warning banner.
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle } from "lucide-react";
import { adminLogin } from "../../lib/api/admin";
import { setAdminToken } from "../../lib/auth/token";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      setAdminToken(data.access_token);
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Dev warning — only visible in development */}
        {import.meta.env.DEV && (
          <div className="flex items-start gap-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 text-yellow-400 text-sm">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <span>
              <strong>Development only:</strong> Temporary admin credentials in
              use. <strong>Change before production.</strong>
            </span>
          </div>
        )}

        <div className="rounded-xl border border-white/10 bg-surfaceAlt p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-semibold text-textPrimary">
              Admin Login
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-textMuted mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary/60 transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-textMuted mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary/60 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-textMuted">
            {/* Forgot password — placeholder for MVP */}
            Forgot password?{" "}
            <span className="text-primary/70 cursor-not-allowed">
              Contact your administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
