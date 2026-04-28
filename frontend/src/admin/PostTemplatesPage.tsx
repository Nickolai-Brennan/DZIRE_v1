/**
 * frontend/src/admin/PostTemplatesPage.tsx
 * Admin post templates — preview of available editorial templates for the CMS.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  User,
  BookOpen,
  Star,
  MessageSquare,
  Newspaper,
} from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { mockArticles } from "../data/mockArticles";
import { isAdminAuthenticated } from "../lib/auth/token";

const TEMPLATE_DEFS = [
  {
    id: "profile-spotlight",
    label: "Profile Spotlight",
    icon: User,
    color: "text-primary",
    bg: "bg-primary/10",
    description:
      "Showcase a DZIRE Doll or creator with editorial polish. Includes hero image, creator intro, pull quote, vibe tags, and promo CTA.",
    sections: [
      "Hero Image",
      "Creator Intro",
      "Pull Quote",
      "Interview Preview",
      "Vibe Tags",
      "Exclusive Promo CTA",
      "Related Dolls",
      "Newsletter CTA",
    ],
    seoFocus: "Creator name + niche keyword",
  },
  {
    id: "longform-essay",
    label: "Longform Essay / Cover Story",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    description:
      "Premium cover story format for launch issues. Cinematic hero, longform essay blocks, pull quotes, relationship insights, and sponsor placement.",
    sections: [
      "Cinematic Hero",
      "Opening Scene",
      "Longform Essay Blocks",
      "Pull Quotes",
      "Relationship Insights",
      "Related Dictionary Terms",
      "Related Articles",
      "Sponsor Placement",
      "Newsletter CTA",
    ],
    seoFocus: "Topic keyword + editorial authority",
  },
  {
    id: "general",
    label: "General Article",
    icon: FileText,
    color: "text-green-400",
    bg: "bg-green-500/10",
    description:
      "Simple editorial article for traffic and SEO. Numbered sections, practical takeaways, internal links, and related content.",
    sections: [
      "Intro",
      "Numbered Sections",
      "Practical Takeaways",
      "Internal Links",
      "Related Position Guides",
      "Related Dictionary Terms",
      "Newsletter CTA",
    ],
    seoFocus: "How-to / listicle keyword",
  },
  {
    id: "review",
    label: "Toy / Product Review",
    icon: Star,
    color: "text-gold",
    bg: "bg-gold/10",
    description:
      "Affiliate-friendly review article with buyer guide, category cards, rating explanation, comparison table, and affiliate CTA.",
    sections: [
      "Buyer Guide Intro",
      "Product Category Cards",
      "Rating Explanation",
      "Comparison Table",
      "Affiliate CTA Block",
      "Sponsor Disclosure",
      "Related Reviews",
      "Newsletter CTA",
    ],
    seoFocus: "Product name + review keyword",
  },
  {
    id: "tips",
    label: "Sex Secrets / Tips",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    description:
      "Short, engaging, tasteful advice article. Hook, main tip, communication prompts, consent note, and related content.",
    sections: [
      "Short Hook",
      "Main Tip",
      "Why It Matters",
      "Communication Prompts",
      "Consent Note",
      "Related Position Guide",
      "Related Dictionary Term",
      "Newsletter CTA",
    ],
    seoFocus: "Advice keyword + audience intent",
  },
];

export const PostTemplatesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <AdminLayout title="Post Templates">
      <p className="text-textMuted mb-8">
        DZIRE uses 5 editorial templates. Each template defines the content
        structure, SEO focus, section order, and CTA placement for that content
        type.
      </p>

      {/* Template Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {TEMPLATE_DEFS.map((tmpl) => {
          const usageCount = mockArticles.filter(
            (a) => a.templateType === tmpl.id,
          ).length;
          return (
            <div
              key={tmpl.id}
              className="bg-surface rounded-2xl p-6 border border-white/8 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl ${tmpl.bg} flex items-center justify-center shrink-0`}
                >
                  <tmpl.icon className={`w-5 h-5 ${tmpl.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-textPrimary">{tmpl.label}</h3>
                    <span className="text-xs text-textMuted bg-surfaceAlt px-2 py-0.5 rounded-full">
                      {usageCount} article{usageCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-mono mt-0.5">
                    {tmpl.id}
                  </p>
                </div>
              </div>

              <p className="text-sm text-textMuted mb-4">{tmpl.description}</p>

              <div className="mb-4">
                <p className="text-xs font-bold text-textMuted uppercase tracking-wider mb-2">
                  Sections
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tmpl.sections.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-full bg-surfaceAlt text-textMuted border border-white/8"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-surfaceAlt rounded-xl p-3">
                <span className="text-xs text-textMuted uppercase tracking-wider">
                  SEO Focus:
                </span>
                <span className="text-xs text-primary">{tmpl.seoFocus}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Articles Using Templates */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8">
        <div className="flex items-center gap-2 mb-5">
          <Newspaper className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-textPrimary">
            Published Articles by Template
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
              <th className="pb-3">Title</th>
              <th className="pb-3">Template</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Author</th>
              <th className="pb-3 text-right">Read Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockArticles.map((a) => {
              const tmpl = TEMPLATE_DEFS.find((t) => t.id === a.templateType);
              return (
                <tr key={a.id}>
                  <td className="py-3 text-textPrimary font-medium max-w-[220px] truncate">
                    {a.title}
                  </td>
                  <td className="py-3">
                    {tmpl && (
                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${tmpl.color}`}
                      >
                        <tmpl.icon className="w-3 h-3" />
                        {tmpl.label}
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-textMuted text-xs">{a.category}</td>
                  <td className="py-3 text-textMuted text-xs">{a.author}</td>
                  <td className="py-3 text-right text-textMuted text-xs">
                    {a.readingTime} min
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
