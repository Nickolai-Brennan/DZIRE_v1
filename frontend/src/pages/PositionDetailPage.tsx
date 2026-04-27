import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockPositions } from '../data/mockPositions';
import { ScoreBar } from '../components/ui/ScoreBar';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { NewsletterForm } from '../components/ui/NewsletterForm';
import { SaveToPlaylistButton } from '../components/ui/SaveToPlaylistButton';
import { track } from '../utils/track';

export const PositionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const position = mockPositions.find(p => p.slug === slug);

  if (!position) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">Position Not Found</h1>
        <Link to="/positions" className="text-primary hover:underline">Back to Positions</Link>
      </div>
    );
  }

  const relatedPositions = mockPositions
    .filter(p => position.relatedPositions.includes(p.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/positions" className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Positions
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/7]">
          <img src={position.image} alt={position.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge variant="category" className="mb-3">{position.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-textPrimary">{position.title}</h1>
          </div>
        </div>
      </div>

      {/* Save to Playlist */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex gap-3">
        <SaveToPlaylistButton
          item={{ id: position.id, type: 'position', title: position.title, slug: position.slug, image: position.image }}
        />
      </div>

      {/* Score Overview */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Comfort', score: position.comfort },
            { label: 'Energy', score: position.energy },
            { label: 'Difficulty', score: position.difficulty },
            { label: 'Intimacy', score: position.intimacy },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => track('attribute_click', { attribute: s.label, positionId: position.id })}
              className="bg-surface rounded-2xl p-5 border border-white/8 text-center hover:border-primary/30 transition-colors cursor-pointer"
            >
              <p className="text-xs text-textMuted uppercase tracking-wider mb-2">{s.label}</p>
              <p className="text-4xl font-black text-textPrimary">{s.score}</p>
              <p className="text-xs text-textMuted mt-1">out of 10</p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* What It Is */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-3">What It Is</h2>
              <p className="text-textMuted leading-relaxed">{position.description}</p>
            </section>

            {/* Why People Love It */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-3">Why People Love It</h2>
              <p className="text-textMuted leading-relaxed">
                This position offers a unique combination of intimacy and physical engagement, making it popular across
                experience levels. The natural body alignment creates comfort while enabling a variety of sensations.
              </p>
            </section>

            {/* Best For */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-4">Best For</h2>
              <div className="flex flex-wrap gap-2">
                {position.keywords.map((kw) => (
                  <Link key={kw} to={`/tags/${kw}`}>
                    <Badge key={kw} variant="category" className="cursor-pointer hover:border-primary/50">
                      #{kw}
                    </Badge>
                  </Link>
                ))}
              </div>
            </section>

            {/* Comfort Tips */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-4">Comfort Tips</h2>
              <ul className="space-y-3">
                {[
                  'Use pillows for extra support and angle adjustment.',
                  'Communicate with your partner throughout.',
                  'Take breaks whenever needed — there is no rush.',
                  'Start slowly to find your ideal rhythm.',
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-textMuted">
                    <span className="text-primary mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* Common Adjustments */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-4">Common Adjustments</h2>
              <ul className="space-y-3">
                {[
                  'Angle variation — shift hips slightly to change sensation depth.',
                  'Speed control — slower often increases intimacy.',
                  'Hand placement — use hands for additional touch.',
                  'Leg positioning — adjust for comfort and access.',
                ].map((adj, i) => (
                  <li key={i} className="flex gap-3 text-textMuted">
                    <span className="text-gold mt-0.5">→</span>
                    {adj}
                  </li>
                ))}
              </ul>
            </section>

            {/* Score Breakdown */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-5">Score Breakdown</h2>
              <div className="space-y-4">
                <ScoreBar label="Comfort" value={position.comfort} />
                <ScoreBar label="Energy" value={position.energy} />
                <ScoreBar label="Difficulty" value={position.difficulty} color="gold" />
                <ScoreBar label="Intimacy" value={position.intimacy} />
              </div>
            </section>

            {/* Try This Next */}
            {relatedPositions.length > 0 && (
              <section className="bg-surface rounded-2xl p-6 border border-white/8">
                <h2 className="text-xl font-bold text-textPrimary mb-5">Try This Next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPositions.map(related => (
                    <div key={related.id} className="relative">
                      <Link
                        to={`/positions/${related.slug}`}
                        onClick={() => track('related_position_click', { from: position.id, to: related.id })}
                      >
                        <Card hover className="overflow-hidden">
                          <img src={related.image} alt={related.title} className="w-full aspect-video object-cover" />
                          <div className="p-3">
                            <p className="font-bold text-textPrimary text-sm">{related.title}</p>
                          </div>
                        </Card>
                      </Link>
                      <div className="absolute top-2 right-2">
                        <SaveToPlaylistButton
                          item={{ id: related.id, type: 'position', title: related.title, slug: related.slug, image: related.image }}
                          label=""
                          className="!p-1.5 !rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Products */}
            {position.relatedProducts.length > 0 && (
              <div className="bg-surface rounded-2xl p-5 border border-white/8">
                <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider mb-4">Related Products</h3>
                <div className="space-y-3">
                  {position.relatedProducts.map((id) => (
                    <Link
                      key={id}
                      to={`/reviews`}
                      className="block p-3 rounded-xl bg-surfaceAlt hover:bg-surface border border-white/8 transition-colors"
                    >
                      <p className="text-sm text-textMuted">View Review →</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Dictionary Terms */}
            {position.relatedTerms.length > 0 && (
              <div className="bg-surface rounded-2xl p-5 border border-white/8">
                <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider mb-4">Dictionary Terms</h3>
                <div className="space-y-2">
                  {position.relatedTerms.map((id) => (
                    <Link
                      key={id}
                      to="/dictionary"
                      className="block text-sm text-primary hover:text-accent transition-colors"
                    >
                      Browse Dictionary →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Save CTA */}
            <div className="bg-surfaceAlt rounded-2xl p-5 border border-white/8 text-center">
              <p className="text-sm font-bold text-textPrimary mb-3">Save this position</p>
              <SaveToPlaylistButton
                item={{ id: position.id, type: 'position', title: position.title, slug: position.slug, image: position.image }}
                className="w-full justify-center"
              />
            </div>

            {/* Sponsor Placeholder */}
            <div className="bg-surfaceAlt rounded-2xl p-5 border border-white/8 text-center">
              <p className="text-xs text-textMuted uppercase tracking-wider mb-2">Sponsored</p>
              <p className="text-sm text-textMuted">Partner placement goes here.</p>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 mb-12">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};
