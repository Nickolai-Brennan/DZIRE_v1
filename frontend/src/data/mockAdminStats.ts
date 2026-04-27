import type { AdminStats } from './types';

export const mockAdminStats: AdminStats = {
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

export const mockScheduleItems = [
  { id: 1, title: 'Magic Wand Deep Dive', type: 'Review', date: '2024-02-01', status: 'scheduled', platform: 'Site' },
  { id: 2, title: 'Top Beginner Positions', type: 'Guide', date: '2024-02-03', status: 'draft', platform: 'Site' },
  { id: 3, title: 'Luna Starr Interview', type: 'Feature', date: '2024-02-05', status: 'scheduled', platform: 'Site' },
  { id: 4, title: 'Newsletter: Feb Edition', type: 'Newsletter', date: '2024-02-07', status: 'draft', platform: 'Email' },
  { id: 5, title: 'Valentine\'s Gift Guide', type: 'Roundup', date: '2024-02-10', status: 'scheduled', platform: 'Site' },
  { id: 6, title: 'Instagram: New Position Drop', type: 'Social', date: '2024-02-12', status: 'draft', platform: 'Instagram' },
];

export const mockKeywordReports = [
  { keyword: 'best intimate positions', rank: 3, volume: 12400, change: 2 },
  { keyword: 'sex toy reviews 2024', rank: 7, volume: 9800, change: -1 },
  { keyword: 'beginner intimacy guide', rank: 5, volume: 7200, change: 3 },
  { keyword: 'luxury vibrator review', rank: 2, volume: 6100, change: 1 },
  { keyword: 'adult lifestyle publication', rank: 11, volume: 4500, change: -2 },
  { keyword: 'DZIRE magazine', rank: 1, volume: 3200, change: 0 },
];

export const mockNewsletterSubscribers = [
  { email: 'user1@example.com', status: 'active', tier: 'free', signedUp: '2024-01-05', opens: 14 },
  { email: 'user2@example.com', status: 'active', tier: 'vip', signedUp: '2024-01-08', opens: 22 },
  { email: 'user3@example.com', status: 'unsubscribed', tier: 'free', signedUp: '2023-12-20', opens: 3 },
  { email: 'user4@example.com', status: 'active', tier: 'free', signedUp: '2024-01-12', opens: 9 },
  { email: 'user5@example.com', status: 'active', tier: 'vip', signedUp: '2024-01-18', opens: 31 },
];

export const mockSeoReports = [
  { page: '/positions', impressions: 23450, clicks: 1234, ctr: 5.3, avgPosition: 4.2 },
  { page: '/reviews', impressions: 18200, clicks: 987, ctr: 5.4, avgPosition: 5.1 },
  { page: '/dictionary', impressions: 14300, clicks: 756, ctr: 5.3, avgPosition: 6.3 },
  { page: '/dzire-dolls', impressions: 9800, clicks: 432, ctr: 4.4, avgPosition: 7.8 },
  { page: '/stories', impressions: 7600, clicks: 345, ctr: 4.5, avgPosition: 8.2 },
  { page: '/', impressions: 31200, clicks: 2100, ctr: 6.7, avgPosition: 3.1 },
];
