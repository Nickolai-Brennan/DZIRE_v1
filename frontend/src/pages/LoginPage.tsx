import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { track } from "../utils/track";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      track("login_complete", { email });
      navigate("/profile");
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-textPrimary mb-2">
            Welcome Back
          </h1>
          <p className="text-textMuted">Log in to your DZIRE account.</p>
        </div>

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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
            />
          </div>

          <Button variant="primary" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <p className="text-center text-sm text-textMuted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-accent transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
