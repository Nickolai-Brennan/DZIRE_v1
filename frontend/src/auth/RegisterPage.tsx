/**
 * frontend/src/auth/RegisterPage.tsx
 * Registration page.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { track } from '../utils/track';

export const RegisterPage: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (
    email: string,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) => {
    setLoading(true);
    setError('');
    try {
      track('signup_start', { email });
      await signup(email, username, password, firstName, lastName);
      track('signup_complete', { email });
      navigate('/onboarding');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-textPrimary mb-2">Join DZIRE</h1>
          <p className="text-textMuted">Create your account to unlock exclusive content.</p>
        </div>
        <RegisterForm onSubmit={handleRegister} isLoading={loading} error={error} />
      </div>
    </div>
  );
};
