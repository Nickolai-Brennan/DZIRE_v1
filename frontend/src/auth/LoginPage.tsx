/**
 * frontend/src/auth/LoginPage.tsx
 * Login page (lives under /src/auth/ per Step 7 spec).
 * The existing /src/pages/LoginPage.tsx is preserved for backwards-compatible routing.
 */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { track } from "../utils/track";

export const LoginPage: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    "/profile";

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      track("login_complete", { email });
      navigate(from, { replace: true });
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
        <LoginForm onSubmit={handleLogin} isLoading={loading} error={error} />
      </div>
    </div>
  );
};
