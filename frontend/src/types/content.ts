export interface Position {
  id: string; slug: string; title: string; shortDescription: string;
  keywords: string[]; tags: string[]; category: string; imagePlaceholder: string;
  comfortScore: number; difficultyScore: number; energyScore: number; intimacyScore: number;
  flexibilityNeeded: number; beginnerFriendly: boolean; toyCompatibility: number; overallScore: number;
  relatedPositions: string[]; relatedProducts: string[]; relatedDictionaryTerms: string[];
}
export interface Review {
  id: string; slug: string; productName: string; category: string; imagePlaceholder: string;
  easeOfUseScore: number; buildQualityScore: number; beginnerFriendlyScore: number;
  valueScore: number; overallScore: number; awardBadge?: string; excerpt: string;
  pros: string[]; cons: string[]; bestFor: string[]; affiliateUrl?: string; publishedAt: string;
}
export interface DictionaryTerm {
  id: string; slug: string; term: string; pronunciation: string; category: string;
  shortDefinition: string; expandedDefinition: string;
  relatedTerms: string[]; relatedPositions: string[]; relatedReviews: string[]; tags: string[];
}
export interface DzireDoll {
  id: string; slug: string; name: string; imagePlaceholder: string; shortBio: string;
  tagline: string; vibeTags: string[]; about: string;
  platformLinks: { platform: string; url: string }[];
  featuredProducts: string[]; recentFeatures: string[];
  isSponsored: boolean; hasExclusivePromo: boolean; promoLabel?: string;
}
export interface Story {
  id: string; slug: string; title: string; author: string; category: string;
  teaser: string; coverPlaceholder: string; rating: number; popularity: number;
  content: string; publishedAt: string;
}
export interface MagazineIssue {
  id: string; slug: string; title: string; subtitle: string; coverPlaceholder: string;
  publishedAt: string; tableOfContents: string[]; isFeatured: boolean;
}
