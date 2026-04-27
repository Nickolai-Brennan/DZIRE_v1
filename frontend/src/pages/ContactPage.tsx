import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { track } from '../utils/track';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('contact_form_submit', { subject: form.subject });
    setSubmitted(true);
  };

  const CONTACT_INFO = [
    { icon: Mail, label: 'Email', value: 'hello@dzire.com' },
    { icon: MessageSquare, label: 'Editorial', value: 'editorial@dzire.com' },
    { icon: MapPin, label: 'Location', value: 'Remote — Worldwide' },
    { icon: Clock, label: 'Response Time', value: 'Within 48 hours' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-textPrimary mb-4">Get In Touch</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Questions, partnerships, editorial inquiries, or just want to say hello — we'd love to hear from you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Send a Message</h2>
            {submitted ? (
              <div className="bg-surface rounded-2xl p-8 border border-primary/30 text-center">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">Message Sent!</h3>
                <p className="text-textMuted">We'll get back to you within 48 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-textMuted mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-textMuted mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-textMuted mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Partnership / Advertising</option>
                    <option>Editorial / Content</option>
                    <option>Model / Creator</option>
                    <option>Technical Support</option>
                    <option>VIP / Subscription</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-textMuted mb-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Contact Info</h2>
            <div className="space-y-4 mb-8">
              {CONTACT_INFO.map(item => (
                <div key={item.label} className="flex items-center gap-4 bg-surface rounded-xl p-4 border border-white/8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-textMuted uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium text-textPrimary">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-white/8">
              <h3 className="font-bold text-textPrimary mb-3">Are you a creator?</h3>
              <p className="text-sm text-textMuted mb-4">
                Interested in becoming a DZIRE Doll or partnering with us? We'd love to feature your work.
              </p>
              <a href="mailto:creators@dzire.com" className="text-primary text-sm hover:underline">
                creators@dzire.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
