import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { mockDictionary } from '../data/mockDictionary';
import { mockPositions } from '../data/mockPositions';
import { Badge } from '../components/ui/Badge';
import { DictionaryTermCard } from '../components/dictionary/DictionaryTermCard';

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

export const DictionaryTermPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const term = mockDictionary.find(t => t.slug === slug);
  const relatedTerms = mockDictionary.filter(t => term?.relatedTerms.includes(t.id));
  const relatedPositions = mockPositions.filter(p => term?.relatedPositions.includes(p.id));

  if (!term) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">Term Not Found</h1>
        <Link to="/dictionary" className="text-primary hover:underline">Back to Dictionary</Link>
      </div>
    );
  }

  const faqs = [
    { question: `What does "${term.term}" mean?`, answer: term.shortDef },
    { question: `How is "${term.term}" pronounced?`, answer: `"${term.term}" is pronounced /${term.pronunciation}/.` },
    { question: `What category does "${term.term}" belong to?`, answer: `"${term.term}" falls under the ${term.category} category.` },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/dictionary" className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dictionary
        </Link>
      </div>

      {/* Term Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background pt-10 pb-14 px-4 sm:px-6 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="category" className="mb-4">{term.category}</Badge>
          <h1 className="text-5xl md:text-7xl font-black text-textPrimary mb-3">{term.term}</h1>
          {term.pronunciation && (
            <p className="text-xl text-textMuted italic mb-4">/ {term.pronunciation} /</p>
          )}
          <p className="text-lg text-textMuted max-w-2xl mx-auto">{term.shortDef}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">

          {/* Plain-English Definition */}
          <section className="bg-surface rounded-2xl p-6 border border-white/8">
            <h2 className="text-xl font-bold text-textPrimary mb-4">Definition</h2>
            <p className="text-textMuted leading-relaxed text-base">{term.shortDef}</p>
          </section>

          {/* Expanded Explanation */}
          <section className="bg-surface rounded-2xl p-6 border border-white/8">
            <h2 className="text-xl font-bold text-textPrimary mb-4">Full Explanation</h2>
            <p className="text-textMuted leading-relaxed">{term.fullDef}</p>
          </section>

          {/* Related Terms */}
          {relatedTerms.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-textPrimary mb-4">Related Terms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTerms.map((rt) => (
                  <DictionaryTermCard key={rt.id} term={rt} />
                ))}
              </div>
            </section>
          )}

          {/* Related Positions */}
          {relatedPositions.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-textPrimary mb-4">Related Positions</h2>
              <div className="flex flex-wrap gap-3">
                {relatedPositions.map((pos) => (
                  <Link
                    key={pos.id}
                    to={`/positions/${pos.slug}`}
                    className="px-4 py-2 bg-surface border border-white/10 hover:border-primary/40 rounded-lg text-textMuted hover:text-textPrimary text-sm transition-colors"
                  >
                    {pos.title} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="bg-surface rounded-2xl p-6 border border-white/8">
            <h2 className="text-xl font-bold text-textPrimary mb-4">FAQ</h2>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </section>

          {/* Internal Links */}
          <section className="bg-surfaceAlt rounded-2xl p-6 border border-white/8">
            <h2 className="text-lg font-bold text-textPrimary mb-4">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/dictionary" className="text-sm text-primary hover:text-accent transition-colors">All Dictionary Terms</Link>
              <Link to="/positions" className="text-sm text-primary hover:text-accent transition-colors">Position Guides</Link>
              <Link to="/reviews" className="text-sm text-primary hover:text-accent transition-colors">Product Reviews</Link>
            </div>
          </section>
        </div>

        <div className="mb-16" />
      </div>
    </div>
  );
};
