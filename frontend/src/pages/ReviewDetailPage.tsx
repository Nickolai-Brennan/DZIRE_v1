import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { mockReviews } from '../data/mockReviews';
import { ScoreBar } from '../components/ui/ScoreBar';
import { Badge } from '../components/ui/Badge';
import { track } from '../utils/track';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left text-textPrimary hover:text-primary transition-colors"
      >
        <span className="font-medium">{question}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
      </button>
      {open && <p className="pb-4 text-textMuted text-sm leading-relaxed">{answer}</p>}
    </div>
  );
};

export const ReviewDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const review = mockReviews.find(r => r.slug === slug);
  const similar = mockReviews.filter(r => r.id !== review?.id).slice(0, 3);

  if (!review) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">Review Not Found</h1>
        <Link to="/reviews" className="text-primary hover:underline">Back to Reviews</Link>
      </div>
    );
  }

  const faqs = [
    { question: 'Is this product beginner-friendly?', answer: `With a beginners score of ${review.beginnerFriendly}/10, ${review.title} is ${review.beginnerFriendly >= 8 ? 'highly recommended for beginners' : 'better suited for intermediate users'}.` },
    { question: 'How is the build quality?', answer: `Build quality score: ${review.buildQuality}/10. The materials and construction ${review.buildQuality >= 8 ? 'are excellent and built to last' : 'are decent for the price point'}.` },
    { question: 'Is it worth the price?', answer: `Value score: ${review.valueScore}/10. At $${review.price} (${review.priceRange}), it ${review.valueScore >= 8 ? 'offers outstanding value' : 'provides fair value for the quality'}.` },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/reviews" className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Reviews
        </Link>
      </div>

      {/* Product Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <img src={review.image} alt={review.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <Badge variant="category" className="mb-3">{review.category}</Badge>
            <p className="text-textMuted mb-1">{review.brand}</p>
            <h1 className="text-3xl md:text-4xl font-black text-textPrimary mb-4">{review.title}</h1>
            {review.isTrophy && review.trophyLabel && (
              <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🏆 {review.trophyLabel}
              </div>
            )}
            <p className="text-textMuted mb-6 leading-relaxed">{review.excerpt}</p>
            <div className="flex items-center gap-4 mb-6">
              <div>
                <span className="text-5xl font-black text-gold">{review.overallScore}</span>
                <span className="text-textMuted">/10</span>
              </div>
              <div>
                <p className="text-sm text-textMuted">Overall Score</p>
                <p className="text-textPrimary font-bold">{review.priceRange}</p>
              </div>
            </div>
            <a
              href={review.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('review_offer_click', { reviewId: review.id })}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-white font-bold rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Check Best Price
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Score Breakdown */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-5">Score Breakdown</h2>
              <div className="space-y-4">
                <ScoreBar label="Overall Score" value={review.overallScore} color="gold" />
                <ScoreBar label="Ease of Use" value={review.easeOfUse} />
                <ScoreBar label="Build Quality" value={review.buildQuality} />
                <ScoreBar label="Beginner Friendly" value={review.beginnerFriendly} />
                <ScoreBar label="Value Score" value={review.valueScore} />
                <ScoreBar label="Comfort" value={review.comfort} />
              </div>
            </section>

            {/* Pros / Cons */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-5">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3">Pros</h3>
                  <ul className="space-y-2">
                    {review.pros.map((pro, i) => (
                      <li key={i} className="flex gap-2 text-sm text-textMuted">
                        <span className="text-green-400 mt-0.5">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Cons</h3>
                  <ul className="space-y-2">
                    {review.cons.map((con, i) => (
                      <li key={i} className="flex gap-2 text-sm text-textMuted">
                        <span className="text-primary mt-0.5">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Full Description */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-4">Product Overview</h2>
              <p className="text-textMuted leading-relaxed">{review.fullDescription}</p>
            </section>

            {/* Best For */}
            {review.awards.length > 0 && (
              <section className="bg-surface rounded-2xl p-6 border border-white/8">
                <h2 className="text-xl font-bold text-textPrimary mb-4">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {review.awards.map((award) => (
                    <Badge key={award} variant="trophy">{award}</Badge>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section className="bg-surface rounded-2xl p-6 border border-white/8">
              <h2 className="text-xl font-bold text-textPrimary mb-4">FAQ</h2>
              <div>
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </section>

            {/* Sponsor Disclosure */}
            <section className="bg-surfaceAlt rounded-2xl p-4 border border-white/8">
              <p className="text-xs text-textMuted italic">
                Disclosure: Some links on this page are affiliate links. DZIRE may earn a commission if you purchase through these links at no extra cost to you. All reviews are based on independent editorial assessment.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Affiliate CTA */}
            <div className="bg-surface rounded-2xl p-5 border border-primary/20 text-center">
              <p className="text-sm text-textMuted mb-2">Ready to try it?</p>
              <p className="text-xl font-black text-textPrimary mb-1">${review.price}</p>
              <p className="text-xs text-textMuted mb-4">{review.priceRange}</p>
              <a
                href={review.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('affiliate_click', { reviewId: review.id })}
                className="block w-full py-3 bg-primary hover:bg-accent text-white font-bold rounded-xl transition-colors text-sm"
              >
                Check Best Price →
              </a>
            </div>

            {/* Overall Score Widget */}
            <div className="bg-surface rounded-2xl p-5 border border-white/8 text-center">
              <p className="text-xs text-textMuted uppercase tracking-wider mb-2">DZIRE Score</p>
              <p className="text-6xl font-black text-gold">{review.overallScore}</p>
              <p className="text-sm text-textMuted mt-1">/ 10 Overall</p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((r) => (
                <Link
                  key={r.id}
                  to={`/reviews/${r.slug}`}
                  className="bg-surface rounded-2xl overflow-hidden border border-white/8 hover:border-primary/30 transition-all hover:-translate-y-1 block"
                >
                  <img src={r.image} alt={r.title} className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <p className="text-xs text-textMuted mb-1">{r.brand}</p>
                    <h3 className="font-bold text-textPrimary mb-1">{r.title}</h3>
                    <span className="text-lg font-bold text-gold">{r.overallScore}<span className="text-xs text-textMuted font-normal">/10</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
