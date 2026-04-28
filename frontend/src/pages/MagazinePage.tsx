/**
 * Magazine Page
 *
 * Grid-based magazine layout showcasing featured articles, sections, and content discovery.
 */
import React from "react";
import {
  MagazineLayout,
  MagazineSection,
  HeroCard,
  ArticleCard,
  ArticleGrid,
} from "../design-system/layouts/MagazineLayout";
import { Badge } from "../components/ui/Badge";

// Mock data
const HERO_ARTICLE = {
  image:
    "https://images.unsplash.com/photo-1532634726644-8a5282143e5a?w=1200&h=600&fit=crop",
  headline: "Discover What's Shaping Digital Culture Right Now",
  excerpt:
    "From emerging trends to creator spotlights, explore the stories defining our era.",
  category: "FEATURED",
  author: "DZIRE Editorial",
  date: "November 13, 2019",
};

const FEATURED_ARTICLES = [
  {
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
    title: "The Art of Content Creation: Mastering Your Craft",
    excerpt: "Learn insider secrets from top creators in the industry.",
    category: "GUIDES",
    author: "Creative Team",
    date: "August 2, 2019",
    featured: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    title: "Building Community: Strategies That Work",
    excerpt:
      "How to foster genuine connections with your audience and grow organically.",
    category: "INSIGHTS",
    author: "James Wilson",
    date: "October 5, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514749292301-91531e1a9661?w=600&h=400&fit=crop",
    title: "Tech Tools Every Creator Should Know",
    excerpt: "New software and platforms that streamline your workflow.",
    category: "TOOLS",
    author: "Sarah Chen",
    date: "September 28, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499415479124-0e827e91acea?w=600&h=400&fit=crop",
    title: "Creator Stories: From Zero to One Million",
    excerpt: "Inspiring journeys of creators who built empires from scratch.",
    category: "STORIES",
    author: "Mike Johnson",
    date: "August 15, 2019",
  },
];

const CULTURE_ARTICLES = [
  {
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=400&h=300&fit=crop",
    title: "Trends Defining Digital Culture This Year",
    excerpt: "What's trending now and what's next in online culture.",
    category: "CULTURE",
    author: "Emma Brown",
    date: "November 10, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    title: "Creator Spotlights: Meet the Innovators",
    excerpt: "In-depth profiles of creators pushing boundaries.",
    category: "PROFILES",
    author: "Jessica Lee",
    date: "November 8, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1502980917128-1aa500764cbd?w=400&h=300&fit=crop",
    title: "The Future of Digital Platforms",
    excerpt: "Where social media and creator tools are headed next.",
    category: "ANALYSIS",
    author: "David Kim",
    date: "November 5, 2019",
  },
];

const TRENDING_ARTICLES = [
  {
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    title: "AI Tools Transforming Content Creation",
    excerpt: "How machine learning is democratizing creative work.",
    category: "INNOVATION",
    author: "Alex Rodriguez",
    date: "November 12, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516534775068-bb57e6de12a2?w=400&h=300&fit=crop",
    title: "Sustainable Creativity: Building Responsibly",
    excerpt: "Making ethical choices as a digital creator.",
    category: "ETHICS",
    author: "Nina Patel",
    date: "November 11, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    title: "Monetization Strategies That Actually Work",
    excerpt: "Multiple revenue streams for sustainable income.",
    category: "MONETIZATION",
    author: "Tom Walker",
    date: "November 9, 2019",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
    title: "Global Creator Economy Report 2024",
    excerpt: "Data-driven insights into the creator landscape.",
    category: "RESEARCH",
    author: "Lisa Anderson",
    date: "November 7, 2019",
  },
];

export const MagazinePage: React.FC = () => {
  return (
    <MagazineLayout
      hero={
        <div className="py-12">
          <HeroCard
            image={HERO_ARTICLE.image}
            headline={HERO_ARTICLE.headline}
            excerpt={HERO_ARTICLE.excerpt}
            category={HERO_ARTICLE.category}
            author={HERO_ARTICLE.author}
            date={HERO_ARTICLE.date}
            onClick={() => console.log("Hero clicked")}
          />
        </div>
      }
      featured={
        <MagazineSection
          title="Featured Stories"
          badge={<Badge variant="default">FEATURED</Badge>}
          viewAllHref="/magazine"
          viewAllLabel="See More"
        >
          <ArticleGrid columns={2}>
            {FEATURED_ARTICLES.map((article, idx) => (
              <ArticleCard
                key={idx}
                {...article}
                featured={idx === 0}
                onClick={() => console.log("Article clicked:", article.title)}
              />
            ))}
          </ArticleGrid>
        </MagazineSection>
      }
      sidebar={
        <div className="space-y-8">
          {/* Newsletter Signup */}
          <div className="bg-surfaceAlt rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p className="text-sm text-textSecondary">
              Get weekly articles and creator insights delivered to your inbox.
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

          {/* Social Links */}
          <div className="bg-surfaceAlt rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold">Follow DZIRE</h3>
            <div className="space-y-3 text-sm">
              <a href="#" className="block text-accent hover:underline">
                → Twitter / X
              </a>
              <a href="#" className="block text-accent hover:underline">
                → LinkedIn
              </a>
              <a href="#" className="block text-accent hover:underline">
                → YouTube
              </a>
              <a href="#" className="block text-accent hover:underline">
                → Instagram
              </a>
            </div>
          </div>

          {/* Featured Sponsor */}
          <div className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg p-6 border border-accent/30 text-center space-y-3">
            <Badge variant="sponsor">SPONSOR</Badge>
            <p className="text-sm font-semibold text-textPrimary">
              Amplify Your Reach
            </p>
            <p className="text-xs text-textSecondary">
              Advertising opportunities available
            </p>
            <button className="w-full px-4 py-2 bg-accent text-white rounded font-bold hover:bg-accentHover transition-colors text-sm">
              Learn More
            </button>
          </div>
        </div>
      }
    >
      {/* Main Content */}
      <div className="space-y-16">
        {/* Culture & Trends */}
        <MagazineSection
          title="Culture & Trends"
          badge={<Badge variant="category">CURATED</Badge>}
          description="What's happening in the creator economy"
          viewAllHref="/magazine/culture"
        >
          <ArticleGrid columns={3}>
            {CULTURE_ARTICLES.map((article, idx) => (
              <ArticleCard
                key={idx}
                {...article}
                onClick={() => console.log("Article clicked:", article.title)}
              />
            ))}
          </ArticleGrid>
        </MagazineSection>

        {/* Trending Now */}
        <MagazineSection
          title="Trending Now"
          badge={<Badge variant="accent">HOT</Badge>}
          description="Most read this week"
          viewAllHref="/magazine/trending"
        >
          <ArticleGrid columns={4}>
            {TRENDING_ARTICLES.map((article, idx) => (
              <ArticleCard
                key={idx}
                {...article}
                onClick={() => console.log("Article clicked:", article.title)}
              />
            ))}
          </ArticleGrid>
        </MagazineSection>

        {/* More Stories */}
        <MagazineSection
          title="More to Explore"
          description="Dive deeper into creator insights and guides"
          viewAllHref="/magazine/archive"
          viewAllLabel="View Archive"
        >
          <ArticleGrid columns={3}>
            {FEATURED_ARTICLES.slice(1).map((article, idx) => (
              <ArticleCard
                key={idx}
                {...article}
                onClick={() => console.log("Article clicked:", article.title)}
              />
            ))}
          </ArticleGrid>
        </MagazineSection>
      </div>
    </MagazineLayout>
  );
};
