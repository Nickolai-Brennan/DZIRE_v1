import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  Tag,
  ArrowRight,
} from "lucide-react";
import { mockArticles } from "../data/mockArticles";
import { mockPositions } from "../data/mockPositions";
import { mockDictionary } from "../data/mockDictionary";
import { Badge } from "../components/ui/Badge";
import { NewsletterForm } from "../components/ui/NewsletterForm";
import { track } from "../utils/track";

const TEMPLATE_BODY: Record<
  string,
  (article: (typeof mockArticles)[0]) => React.ReactNode
> = {
  "profile-spotlight": (a) => (
    <div className="space-y-6">
      <blockquote className="border-l-4 border-primary pl-6 py-2">
        <p className="text-xl text-textPrimary italic font-medium leading-relaxed">
          "Building a digital persona is not about playing a character — it is
          about finding the most authentic version of yourself and learning how
          to share her with the world."
        </p>
      </blockquote>
      <p className="text-textMuted leading-relaxed">{a.excerpt}</p>
      <p className="text-textMuted leading-relaxed">
        The modern creator economy has opened doors that were previously
        inaccessible to independent artists. DZIRE Dolls represent a curated
        layer of this ecosystem — creators who bring warmth, authenticity, and
        artistry to their digital presence.
      </p>
      <h2 className="text-2xl font-bold text-textPrimary mt-8">
        The Art of Boundaries
      </h2>
      <p className="text-textMuted leading-relaxed">
        Every successful creator has a clear boundary system. Not limits placed
        by others, but frameworks they have designed themselves — knowing what
        content energizes them, what drains them, and what aligns with their
        long-term vision. This clarity becomes part of their brand identity.
      </p>
      <h2 className="text-2xl font-bold text-textPrimary mt-8">
        Interview Preview
      </h2>
      <p className="text-textMuted leading-relaxed">
        We sat down with a featured DZIRE Doll to discuss her journey from
        hobbyist creator to professional, the tools she uses to manage her
        digital presence, and the mindset shifts that changed everything.
      </p>
    </div>
  ),
  "longform-essay": (a) => (
    <div className="space-y-6">
      <p className="text-xl text-textMuted leading-relaxed font-medium">
        {a.excerpt}
      </p>
      <p className="text-textMuted leading-relaxed">
        When the first dating apps arrived, critics dismissed them as shallow.
        What those critics missed was a fundamental transformation already
        underway — the digitization of longing itself.
      </p>
      <h2 className="text-2xl font-bold text-textPrimary mt-8">
        The Architecture of Digital Desire
      </h2>
      <p className="text-textMuted leading-relaxed">
        Desire is not simply physical. It is anticipatory, narrative,
        contextual. Digital platforms understood this intuitively. The profile,
        the swipe, the message — each is a carefully designed ritual of
        imagination.
      </p>
      <blockquote className="border-l-4 border-gold pl-6 py-2">
        <p className="text-lg text-textPrimary italic font-medium">
          "The screen did not kill romance. It gave it new rooms to inhabit."
        </p>
      </blockquote>
      <h2 className="text-2xl font-bold text-textPrimary mt-8">
        Connection in the Age of Performance
      </h2>
      <p className="text-textMuted leading-relaxed">
        Every digital interaction is partly performance. We curate, we edit, we
        choose angles. But within this performance lies something authentic —
        the desire to be seen, to be chosen, to matter to someone else.
      </p>
      <p className="text-textMuted leading-relaxed">
        The challenge of modern intimacy is learning to move from the performed
        self to the felt self — and trusting that the felt self is enough.
      </p>
    </div>
  ),
  general: (a) => (
    <div className="space-y-6">
      <p className="text-lg text-textMuted leading-relaxed">{a.excerpt}</p>
      {[
        {
          n: 1,
          title: "Stop Apologizing for Taking Up Space",
          body: "The moment you stop shrinking yourself — physically, verbally, emotionally — something shifts. Your presence becomes an invitation rather than an intrusion.",
        },
        {
          n: 2,
          title: "Swap Comparison for Curiosity",
          body: "Instead of measuring yourself against an imagined ideal, get curious about what you actually enjoy. Curiosity is the engine of genuine confidence.",
        },
        {
          n: 3,
          title: "Name What You Want Out Loud",
          body: "Voicing desire — even just to yourself — is a radical act. It turns a vague longing into a real intention and starts rewiring how you show up.",
        },
        {
          n: 4,
          title: "Let Slow be Your Speed",
          body: "Rushing through intimacy to perform competence is the opposite of confidence. Real confidence is comfortable with slowness, with pausing, with listening.",
        },
        {
          n: 5,
          title: "Celebrate What Your Body Can Do",
          body: "Shift from evaluating your body aesthetically to appreciating it functionally. What can it feel? What connections can it create? That shift is transformative.",
        },
      ].map((s) => (
        <div
          key={s.n}
          className="bg-surface rounded-2xl p-6 border border-white/8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary/20 text-primary font-black flex items-center justify-center text-sm">
              {s.n}
            </span>
            <h3 className="text-lg font-bold text-textPrimary">{s.title}</h3>
          </div>
          <p className="text-textMuted leading-relaxed">{s.body}</p>
        </div>
      ))}
    </div>
  ),
  review: (a) => (
    <div className="space-y-6">
      <p className="text-lg text-textMuted leading-relaxed">{a.excerpt}</p>
      <h2 className="text-2xl font-bold text-textPrimary">
        What to Look for First
      </h2>
      {[
        {
          label: "Material Safety",
          desc: "Body-safe silicone, ABS plastic, or stainless steel. Avoid porous materials that can harbor bacteria.",
        },
        {
          label: "Motor Strength",
          desc: "More expensive doesn't always mean stronger. Look for reviews that mention consistent intensity without overheating.",
        },
        {
          label: "Ease of Cleaning",
          desc: "Waterproof or submersible toys are far easier to keep clean. Look for USB-rechargeable models.",
        },
        {
          label: "Beginner vs Advanced",
          desc: "Start simple. A single-function wand or bullet vibrator is a better first purchase than a multi-function device.",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="flex gap-4 bg-surface rounded-xl p-5 border border-white/8"
        >
          <span className="text-primary mt-0.5">•</span>
          <div>
            <p className="font-bold text-textPrimary mb-1">{item.label}</p>
            <p className="text-sm text-textMuted">{item.desc}</p>
          </div>
        </div>
      ))}
      <div className="bg-surfaceAlt rounded-2xl p-4 border border-white/8">
        <p className="text-xs text-textMuted italic">
          Sponsor Disclosure: Some product links in this guide are affiliate
          links. DZIRE may receive a commission if you purchase through these
          links. All recommendations are based on independent research and
          editorial judgment.
        </p>
      </div>
    </div>
  ),
  tips: (a) => (
    <div className="space-y-6">
      <p className="text-xl text-textMuted leading-relaxed font-medium">
        {a.excerpt}
      </p>
      <p className="text-textMuted leading-relaxed">
        Before a single touch, something transformative can happen in the space
        between two people — a conversation. Not negotiation, not a checklist,
        but genuine curiosity about another person.
      </p>
      <h2 className="text-2xl font-bold text-textPrimary mt-6">
        Why It Matters
      </h2>
      <p className="text-textMuted leading-relaxed">
        Research consistently shows that verbal communication before and during
        intimacy increases satisfaction for all partners. It removes guesswork,
        creates safety, and transforms intimacy from something that happens to
        you into something you actively create together.
      </p>
      <h2 className="text-2xl font-bold text-textPrimary mt-6">
        Communication Prompts to Try
      </h2>
      <div className="space-y-3">
        {[
          '"What would feel really good for you tonight?"',
          '"Is there anything you\'ve been curious about exploring?"',
          '"What makes you feel most comfortable and safe?"',
          '"What would you love more of? Less of?"',
        ].map((prompt) => (
          <div
            key={prompt}
            className="flex gap-3 bg-surface rounded-xl p-4 border border-white/8"
          >
            <span className="text-primary mt-0.5">→</span>
            <p className="text-textPrimary italic text-sm">{prompt}</p>
          </div>
        ))}
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <p className="text-sm text-blue-300 font-medium">
          A note on consent: Consent is enthusiastic, ongoing, and freely given.
          These prompts are starting points — real consent includes checking in
          throughout and respecting any change of mind at any time.
        </p>
      </div>
    </div>
  ),
};

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">
          Article Not Found
        </h1>
        <Link to="/articles" className="text-primary hover:underline">
          Back to Articles
        </Link>
      </div>
    );
  }

  const relatedArticles = mockArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => {
      const aMatch = a.category === article.category ? 1 : 0;
      const bMatch = b.category === article.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const relatedPositions = mockPositions.slice(0, 2);
  const relatedTerms = mockDictionary.slice(0, 2);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch((err) => {
      console.warn("[DZIRE] Clipboard copy failed:", err);
    });
    track("article_share_click", { articleSlug: slug });
  };

  const bodyRenderer =
    TEMPLATE_BODY[article.templateType] ?? TEMPLATE_BODY.general;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          to="/articles"
          className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/7]">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge variant="category" className="mb-3">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black text-textPrimary max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Meta */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5 text-sm text-textMuted">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime} min read
            </span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article body by template */}
            <div className="prose-dzire">{bodyRenderer(article)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <Link key={tag} to={`/tags/${tag}`}>
                  <Badge
                    variant="category"
                    className="hover:border-primary/50 cursor-pointer flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Newsletter CTA in article */}
            <div className="mt-10">
              <NewsletterForm
                onSubmitSuccess={() =>
                  track("newsletter_signup_from_article", { articleSlug: slug })
                }
              />
            </div>

            {/* Sponsor block */}
            <div className="bg-surfaceAlt rounded-2xl p-5 border border-white/8 text-center">
              <p className="text-xs text-textMuted uppercase tracking-wider mb-1">
                Sponsored
              </p>
              <p className="text-sm text-textMuted">
                Partner placement — featured product or service goes here.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-surface rounded-2xl p-5 border border-primary/20 text-center">
              <p className="font-bold text-textPrimary mb-2">
                {article.ctaLabel}
              </p>
              <Link
                to="/articles"
                onClick={() =>
                  track("affiliate_cta_click", { articleSlug: slug })
                }
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-accent text-white font-bold rounded-xl transition-colors text-sm"
              >
                Explore More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Positions */}
            {relatedPositions.length > 0 && (
              <div className="bg-surface rounded-2xl p-5 border border-white/8">
                <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider mb-4">
                  Related Positions
                </h3>
                <div className="space-y-2">
                  {relatedPositions.map((pos) => (
                    <Link
                      key={pos.id}
                      to={`/positions/${pos.slug}`}
                      onClick={() =>
                        track("related_content_click", {
                          from: "article",
                          positionId: pos.id,
                        })
                      }
                      className="block text-sm text-primary hover:text-accent transition-colors"
                    >
                      {pos.title} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Dictionary Terms */}
            {relatedTerms.length > 0 && (
              <div className="bg-surface rounded-2xl p-5 border border-white/8">
                <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider mb-4">
                  Related Terms
                </h3>
                <div className="space-y-2">
                  {relatedTerms.map((term) => (
                    <Link
                      key={term.id}
                      to={`/dictionary/${term.slug}`}
                      className="block text-sm text-primary hover:text-accent transition-colors"
                    >
                      {term.term} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="bg-surface rounded-2xl p-5 border border-white/8 text-center">
              <p className="text-sm text-textMuted mb-3">Share this article</p>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 w-full py-2 border border-white/10 rounded-xl text-sm text-textMuted hover:text-textPrimary hover:border-white/20 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-textPrimary mb-6">
              More to Read
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <Link
                  key={a.id}
                  to={`/articles/${a.slug}`}
                  onClick={() =>
                    track("related_content_click", {
                      from: "article",
                      toArticle: a.id,
                    })
                  }
                  className="group bg-surface rounded-2xl overflow-hidden border border-white/8 hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <img
                    src={a.featuredImage}
                    alt={a.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <Badge variant="category" className="mb-2 text-xs">
                      {a.category}
                    </Badge>
                    <h3 className="font-bold text-textPrimary text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-textMuted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {a.readingTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Prev / Next navigation */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/8">
              {(() => {
                const idx = mockArticles.findIndex((a) => a.slug === slug);
                const prev = mockArticles[idx - 1];
                const next = mockArticles[idx + 1];
                return (
                  <>
                    <div>
                      {prev && (
                        <Link
                          to={`/articles/${prev.slug}`}
                          className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span className="line-clamp-1 max-w-[200px]">
                            {prev.title}
                          </span>
                        </Link>
                      )}
                    </div>
                    <div>
                      {next && (
                        <Link
                          to={`/articles/${next.slug}`}
                          className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors"
                        >
                          <span className="line-clamp-1 max-w-[200px]">
                            {next.title}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
