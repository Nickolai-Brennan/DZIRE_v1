export interface Position {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: number; // 1-10
  comfort: number; // 1-10
  energy: number; // 1-10
  intimacy: number; // 1-10
  keywords: string[];
  relatedPositions: string[];
  relatedProducts: string[];
  relatedTerms: string[];
  image: string;
  isFeatured: boolean;
}

export interface Review {
  id: string;
  title: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  priceRange: string;
  overallScore: number; // 0-10
  easeOfUse: number; // 0-10
  buildQuality: number; // 0-10
  beginnerFriendly: number; // 0-10
  valueScore: number; // 0-10
  comfort: number; // 0-10
  pros: string[];
  cons: string[];
  excerpt: string;
  fullDescription: string;
  affiliateUrl: string;
  awards: string[];
  image: string;
  isTrophy: boolean;
  trophyLabel?: string;
}

export interface DictionaryTerm {
  id: string;
  term: string;
  slug: string;
  pronunciation: string;
  category: string;
  shortDef: string;
  fullDef: string;
  relatedTerms: string[];
  relatedPositions: string[];
  relatedReviews: string[];
  relatedArticles: string[];
  isFeatured: boolean;
}

export interface DollProfile {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  bio: string;
  vibeTags: string[];
  platforms: Array<{ name: string; url: string }>;
  featuredProducts: string[];
  promoUrl: string;
  isSponsored: boolean;
  isFeatured: boolean;
  image: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readingTime: number;
  image: string;
  tags: string[];
}

export interface MagazineIssue {
  id: string;
  title: string;
  slug: string;
  issueNumber: number;
  coverDate: string;
  articles: string[];
  coverImage: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  templateType: 'profile-spotlight' | 'longform-essay' | 'general' | 'review' | 'tips';
  author: string;
  publishDate: string;
  readingTime: number;
  featuredImage: string;
  tags: string[];
  targetKeyword: string;
  ctaLabel: string;
}

export interface AdminStats {
  pageViews: number;
  activeUsers: number;
  newsletterSignups: number;
  vipMembers: number;
  affiliateClicks: number;
  sponsorClicks: number;
  topContent: Array<{ title: string; views: number; type: string }>;
  recentActivity: Array<{ action: string; timestamp: string; user?: string }>;
}
