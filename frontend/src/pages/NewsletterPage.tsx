import React, { useState } from 'react';
import { Mail, Zap, BookOpen, Star, Heart } from 'lucide-react';
import { NewsletterForm } from '../components/ui/NewsletterForm';
import { track } from '../utils/track';

const NEWSLETTER_PERKS = [
  { icon: Zap, title: 'Weekly Highlights', desc: 'Top positions, reviews, and stories delivered every week' },
  { icon: BookOpen, title: 'Exclusive Content', desc: 'Subscriber-only guides and tips not published on the site' },
  { icon: Star, title: 'Early Access', desc: 'Be first to know about new features, DZIRE Dolls, and updates' },
  { icon: Heart, title: 'No Spam', desc: 'We respect your inbox — one curated email per week, unsubscribe anytime' },
];

export const NewsletterPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    track('newsletter_subscribe', { source: 'newsletter-page' });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-20 px-4 text-center mb-12">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">The DZIRE Letter</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto mb-8">
          Weekly insights on intimacy, desire, and connection. Join 10,000+ readers.
        </p>
        {!submitted ? (
          <div className="max-w-md mx-auto">
            <NewsletterForm onSubmitSuccess={handleSubmit} />
          </div>
        ) : (
          <div className="bg-surface rounded-2xl p-8 max-w-md mx-auto border border-primary/30">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-textPrimary mb-2">You're in!</h3>
            <p className="text-textMuted text-sm">Check your inbox for a confirmation email. Your first DZIRE Letter arrives next Monday.</p>
          </div>
        )}
      </div>

      {/* Perks */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-bold text-textPrimary text-center mb-10">What You'll Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {NEWSLETTER_PERKS.map(perk => (
            <div key={perk.title} className="flex gap-4 bg-surface rounded-2xl p-6 border border-white/8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <perk.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-textPrimary mb-1">{perk.title}</h3>
                <p className="text-sm text-textMuted">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Past Issues Preview */}
        <div className="bg-surface rounded-2xl p-8 border border-white/8 text-center">
          <h3 className="text-xl font-bold text-textPrimary mb-3">Past Issues</h3>
          <p className="text-textMuted text-sm mb-6">Get a feel for what we send before you subscribe.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Issue #003 · Beginner Guides', 'Issue #002 · New Dolls Spotlight', 'Issue #001 · Welcome to DZIRE'].map(title => (
              <div key={title} className="bg-surfaceAlt rounded-xl p-4 border border-white/8 text-left">
                <p className="text-sm font-medium text-textPrimary">{title}</p>
                <p className="text-xs text-textMuted mt-1">Click to preview</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
