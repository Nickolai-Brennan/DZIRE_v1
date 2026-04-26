import React, { useState } from 'react';
import { Button } from './Button';
import { track } from '../../utils/track';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('newsletter_signup', { email });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-6 py-4 bg-surface border border-white/10 rounded-xl text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary/50"
        />
        <Button type="submit" variant="primary" className="sm:w-auto">
          {submitted ? '✓ Subscribed!' : 'Subscribe'}
        </Button>
      </div>
      <p className="text-sm text-textMuted mt-4 text-center">
        Join 3,421+ readers. Unsubscribe anytime.
      </p>
    </form>
  );
};
