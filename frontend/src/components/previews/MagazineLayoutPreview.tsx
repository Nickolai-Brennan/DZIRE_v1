/**
 * Magazine Layout Preview Component
 *
 * Interactive preview showcasing all magazine layout components with live examples.
 */
import React, { useState } from "react";
import {
  MagazineLayout,
  MagazineSection,
  HeroCard,
  ArticleCard,
  ArticleGrid,
} from "../../design-system/layouts/MagazineLayout";
import { Badge } from "../ui/Badge";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1532634726644-8a5282143e5a?w=800&h=600&fit=crop";

const SAMPLE_ARTICLES = [
  {
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
    title: "The Art of Digital Storytelling",
    excerpt: "Master the craft of compelling narratives in the digital age.",
    category: "GUIDES",
    author: "Sarah Chen",
    date: "Nov 13, 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Building Engaged Communities Online",
    excerpt:
      "Strategies for fostering genuine connections with your audience.",
    category: "INSIGHTS",
    author: "James Wilson",
    date: "Nov 10, 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514749292301-91531e1a9661?w=400&h=300&fit=crop",
    title: "Tools That Transform Workflows",
    excerpt: "New software making content creation faster and easier.",
    category: "TOOLS",
    author: "Mike Johnson",
    date: "Nov 8, 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499415479124-0e827e91acea?w=400&h=300&fit=crop",
    title: "Creator Stories: Scaling from Zero",
    excerpt: "How creators built million-dollar empires from scratch.",
    category: "STORIES",
    author: "Emma Brown",
    date: "Nov 5, 2024",
  },
];

interface PreviewSection {
  id: string;
  name: string;
  component: React.ReactNode;
  description: string;
}

export const MagazineLayoutPreview: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("full-page");

  const previewSections: PreviewSection[] = [
    {
      id: "full-page",
      name: "Full Page",
      description: "Complete magazine layout with all sections",
      component: (
        <div className="border border-borderDefault rounded-lg overflow-hidden">
          <MagazineLayout
            hero={
              <div className="py-12">
                <HeroCard
                  image={SAMPLE_IMAGE}
                  headline="The Future of Content Creation"
                  excerpt="Discover emerging trends shaping digital media."
                  category="FEATURED"
                  author="Editorial Team"
                  date="Today"
                  onClick={() =>
                    console.log("Hero card clicked")
                  }
                />
              </div>
            }
            featured={
              <MagazineSection
                title="Featured Stories"
                badge={<Badge variant="default">FEATURED</Badge>}
                viewAllHref="#"
              >
                <ArticleGrid columns={2}>
                  {SAMPLE_ARTICLES.slice(0, 4).map((article, idx) => (
                    <ArticleCard
                      key={idx}
                      {...article}
                      featured={idx === 0}
                      onClick={() =>
                        console.log("Article clicked:", article.title)
                      }
                    />
                  ))}
                </ArticleGrid>
              </MagazineSection>
            }
            sidebar={
              <div className="space-y-6">
                <div className="bg-surfaceAlt rounded-lg p-6 space-y-3">
                  <h3 className="text-lg font-bold">Newsletter</h3>
                  <p className="text-sm text-textSecondary">
                    Get weekly updates delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded border border-borderDefault bg-background text-sm"
                  />
                  <button className="w-full px-4 py-2 bg-accent text-white rounded font-semibold hover:bg-accentHover transition-colors text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            }
          >
            <MagazineSection
              title="Trending Now"
              badge={<Badge variant="accent">HOT</Badge>}
            >
              <ArticleGrid columns={4}>
                {SAMPLE_ARTICLES.map((article, idx) => (
                  <ArticleCard key={idx} {...article} />
                ))}
              </ArticleGrid>
            </MagazineSection>
          </MagazineLayout>
        </div>
      ),
    },
    {
      id: "hero-card",
      name: "Hero Card",
      description: "Large featured article with gradient overlay",
      component: (
        <div className="space-y-4">
          <HeroCard
            image={SAMPLE_IMAGE}
            headline="Breakthrough Discovery Changes Everything We Know"
            excerpt="A revolutionary finding that challenges conventional wisdom."
            category="BREAKING"
            author="Jane Doe"
            date="November 13, 2024"
            onClick={() => console.log("Hero clicked")}
          />
          <p className="text-sm text-textSecondary">
            ✓ Responsive (72px mobile → 480px desktop)
            <br />✓ Gradient overlay for text readability
            <br />✓ Hover scale animation
          </p>
        </div>
      ),
    },
    {
      id: "article-cards",
      name: "Article Cards",
      description: "Standard and featured article cards",
      component: (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-textSecondary mb-4 uppercase tracking-wider">
              Standard Cards (3 columns)
            </h3>
            <ArticleGrid columns={3}>
              {SAMPLE_ARTICLES.slice(0, 3).map((article, idx) => (
                <ArticleCard
                  key={idx}
                  {...article}
                  onClick={() =>
                    console.log("Clicked:", article.title)
                  }
                />
              ))}
            </ArticleGrid>
          </div>

          <div className="border-t border-borderDefault pt-8">
            <h3 className="text-sm font-bold text-textSecondary mb-4 uppercase tracking-wider">
              Featured Cards (2 columns, larger variant)
            </h3>
            <ArticleGrid columns={2}>
              {SAMPLE_ARTICLES.slice(0, 2).map((article, idx) => (
                <ArticleCard
                  key={idx}
                  {...article}
                  featured={true}
                  onClick={() =>
                    console.log("Clicked:", article.title)
                  }
                />
              ))}
            </ArticleGrid>
          </div>

          <div className="border-t border-borderDefault pt-8">
            <h3 className="text-sm font-bold text-textSecondary mb-4 uppercase tracking-wider">
              Grid Presets
            </h3>
            <div className="space-y-2 text-sm text-textSecondary">
              <p>✓ Auto (1 mobile, 2 tablet, 3 desktop)</p>
              <p>✓ 2-column layout</p>
              <p>✓ 3-column layout</p>
              <p>✓ 4-column layout</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sections",
      name: "Magazine Sections",
      description: "Section headers with badges and view-all links",
      component: (
        <div className="space-y-12">
          <MagazineSection
            title="Featured Stories"
            badge={<Badge variant="default">FEATURED</Badge>}
            viewAllHref="#"
          >
            <ArticleGrid columns={3}>
              {SAMPLE_ARTICLES.slice(0, 3).map((article, idx) => (
                <ArticleCard key={idx} {...article} />
              ))}
            </ArticleGrid>
          </MagazineSection>

          <MagazineSection
            title="Trending Now"
            badge={<Badge variant="accent">HOT</Badge>}
            description="Most read this week"
            viewAllHref="#"
          >
            <ArticleGrid columns={4}>
              {SAMPLE_ARTICLES.map((article, idx) => (
                <ArticleCard key={idx} {...article} />
              ))}
            </ArticleGrid>
          </MagazineSection>

          <MagazineSection
            title="Deep Dive"
            badge={<Badge variant="category">ANALYSIS</Badge>}
            description="In-depth explorations of trending topics"
            viewAllHref="#"
            viewAllLabel="View All Analysis"
          >
            <ArticleGrid columns={3}>
              {SAMPLE_ARTICLES.slice(0, 3).map((article, idx) => (
                <ArticleCard key={idx} {...article} featured={idx === 0} />
              ))}
            </ArticleGrid>
          </MagazineSection>
        </div>
      ),
    },
    {
      id: "responsive",
      name: "Responsive Grids",
      description: "Grid layouts at different breakpoints",
      component: (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-textSecondary mb-4 uppercase tracking-wider">
              4-Column Grid (resize to see responsive behavior)
            </h3>
            <ArticleGrid columns={4}>
              {SAMPLE_ARTICLES.map((article, idx) => (
                <ArticleCard key={idx} {...article} />
              ))}
            </ArticleGrid>
            <p className="text-xs text-textSecondary mt-4">
              Mobile: 1 col | Tablet: 2 cols | Desktop: 4 cols
            </p>
          </div>

          <div className="border-t border-borderDefault pt-8">
            <h3 className="text-sm font-bold text-textSecondary mb-4 uppercase tracking-wider">
              Auto-Grid (smart layout)
            </h3>
            <ArticleGrid columns="auto">
              {SAMPLE_ARTICLES.map((article, idx) => (
                <ArticleCard key={idx} {...article} />
              ))}
            </ArticleGrid>
            <p className="text-xs text-textSecondary mt-4">
              Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols
            </p>
          </div>

          <div className="border-t border-borderDefault pt-8">
            <h3 className="text-sm font-bold text-textSecondary mb-4 uppercase tracking-wider">
              Gap Sizes
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-textSecondary mb-2">Small Gap</p>
                <ArticleGrid columns={3} gap="sm">
                  {SAMPLE_ARTICLES.slice(0, 3).map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                  ))}
                </ArticleGrid>
              </div>
              <div>
                <p className="text-xs text-textSecondary mb-2">Medium Gap</p>
                <ArticleGrid columns={3} gap="md">
                  {SAMPLE_ARTICLES.slice(0, 3).map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                  ))}
                </ArticleGrid>
              </div>
              <div>
                <p className="text-xs text-textSecondary mb-2">Large Gap</p>
                <ArticleGrid columns={3} gap="lg">
                  {SAMPLE_ARTICLES.slice(0, 3).map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                  ))}
                </ArticleGrid>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activePreview = previewSections.find(
    (section) => section.id === activeSection
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-borderDefault sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-textPrimary mb-4">
            Magazine Layout Preview
          </h1>
          <div className="flex flex-wrap gap-2">
            {previewSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-accent text-white"
                    : "bg-surfaceAlt text-textPrimary hover:bg-surface"
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activePreview && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-textPrimary">
                {activePreview.name}
              </h2>
              <p className="text-sm text-textSecondary">
                {activePreview.description}
              </p>
            </div>
            <div className="bg-surface rounded-lg p-6 border border-borderDefault">
              {activePreview.component}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-borderDefault bg-surfaceAlt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-bold text-textPrimary mb-2">Components</h3>
              <ul className="space-y-1 text-textSecondary">
                <li>• MagazineLayout</li>
                <li>• MagazineSection</li>
                <li>• HeroCard</li>
                <li>• ArticleCard</li>
                <li>• ArticleGrid</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-textPrimary mb-2">Features</h3>
              <ul className="space-y-1 text-textSecondary">
                <li>✓ Fully responsive</li>
                <li>✓ Accessible (WCAG)</li>
                <li>✓ Dark mode ready</li>
                <li>✓ Hover animations</li>
                <li>✓ Design system tokens</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-textPrimary mb-2">Usage</h3>
              <p className="text-textSecondary">
                Import from{" "}
                <code className="bg-background px-2 py-1 rounded text-xs">
                  design-system/layouts/MagazineLayout
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
