import React, { useState } from 'react';

interface NewsletterBlockProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export const NewsletterBlock: React.FC<NewsletterBlockProps> = ({
  title = 'Stay in the loop',
  subtitle = 'Get the latest articles, guides, and exclusive content delivered to your inbox.',
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  onSubmit,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmit?.(email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-xl mx-auto text-center bg-surface rounded-2xl border border-white/8 p-10">
        <h2 className="text-3xl font-extrabold text-textPrimary mb-3">{title}</h2>
        <p className="text-textMuted mb-8">{subtitle}</p>

        {submitted ? (
          <p className="text-green-400 font-medium">You're on the list — thanks!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 bg-surfaceAlt border border-white/10 rounded-xl text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-xl text-sm transition-all"
            >
              {buttonLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
