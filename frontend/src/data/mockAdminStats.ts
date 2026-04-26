import type { MagazineIssue } from './types';

export const mockMagazine: MagazineIssue[] = [
  {
    id: 'mag-1',
    title: 'New Year, New Desire',
    slug: 'new-year-new-desire',
    issueNumber: 1,
    coverDate: 'January 2024',
    articles: ['art-1', 'art-2', 'art-3'],
    coverImage: 'https://placehold.co/800x1000/09090B/F8FAFC?text=Issue+01',
  },
  {
    id: 'mag-2',
    title: 'The Pleasure Issue',
    slug: 'the-pleasure-issue',
    issueNumber: 2,
    coverDate: 'February 2024',
    articles: ['art-4', 'art-5'],
    coverImage: 'https://placehold.co/800x1000/09090B/F8FAFC?text=Issue+02',
  },
];

export const mockAdminStats = {
  pageViews: 156789,
  activeUsers: 8432,
  newsletterSignups: 3421,
  vipMembers: 234,
  affiliateClicks: 1876,
  sponsorClicks: 945,
  topContent: [
    { title: 'Magic Wand Review', views: 12453, type: 'review' },
    { title: 'Classic Missionary Guide', views: 9821, type: 'position' },
    { title: 'Aftercare Definition', views: 7654, type: 'dictionary' },
    { title: 'Luna Starr Profile', views: 6543, type: 'doll' },
    { title: 'Modern Desire Essay', views: 5432, type: 'article' },
  ],
  recentActivity: [
    { action: 'New newsletter signup', timestamp: '2 minutes ago' },
    { action: 'VIP membership purchased', timestamp: '15 minutes ago' },
    { action: 'Affiliate click: Magic Wand', timestamp: '23 minutes ago' },
    { action: 'New article view: 12,453rd', timestamp: '45 minutes ago' },
    { action: 'Position guide opened', timestamp: '1 hour ago' },
  ],
};

export const mockMonetization = {
  affiliatePartners: [
    { name: 'Lovehoney', category: 'Toys', clicks: 876, conversions: 45, revenue: 2340.50 },
    { name: 'Magic Wand', category: 'Premium', clicks: 543, conversions: 38, revenue: 3654.00 },
    { name: 'LELO', category: 'Luxury', clicks: 234, conversions: 18, revenue: 2890.00 },
  ],
  sponsorships: [
    { name: 'Luna Starr Featured Placement', type: 'Creator Spotlight', status: 'active', monthlyRate: 1500 },
    { name: 'Scarlett Rain Content Series', type: 'Editorial', status: 'active', monthlyRate: 1200 },
    { name: 'Phoenix Vale Wellness Column', type: 'Column', status: 'active', monthlyRate: 1000 },
  ],
};
