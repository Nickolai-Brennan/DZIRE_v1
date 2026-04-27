import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { track } from '../utils/track';

const INTEREST_OPTIONS = [
  'Beginner Friendly', 'Advanced Techniques', 'Partner Play', 'Solo Exploration',
  'Intimacy Focus', 'High Energy', 'Low Energy', 'Comfort Priority',
  'Educational Content', 'Fantasy Stories', 'Product Reviews', 'Health & Wellness',
];

export const OnboardingPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (interest: string) => {
    setSelected(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleComplete = () => {
    track('onboarding_complete', { interests: selected });
    navigate('/positions');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">Welcome to DZIRE</p>
          <h1 className="text-4xl font-black text-textPrimary mb-3">What are you into?</h1>
          <p className="text-textMuted">Select your interests so we can personalise your experience.</p>
        </div>

        <div className="bg-surface rounded-2xl border border-white/10 p-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {INTEREST_OPTIONS.map(interest => (
              <button
                key={interest}
                onClick={() => toggle(interest)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  selected.includes(interest)
                    ? 'bg-primary border-primary text-white'
                    : 'bg-surfaceAlt border-white/10 text-textMuted hover:border-primary/50'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-textMuted">{selected.length} selected</p>
            <Button variant="primary" onClick={handleComplete} disabled={selected.length === 0}>
              Get Started
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-textMuted mt-6">
          You can always update your preferences in your profile.
        </p>
      </div>
    </div>
  );
};
