import type { AffiliateLink, SponsorCampaign, AdPlacement } from '@/types/monetization';
export const mockAffiliateLinks: AffiliateLink[] = [
  { id:'1',name:'Luxe Vibrance Pro',url:'#',partner:'LoveHoney',clicks:4231,conversions:312,revenue:2184,status:'active'},
  { id:'2',name:'Velvet Duo Kit',url:'#',partner:'Adam & Eve',clicks:2987,conversions:198,revenue:1386,status:'active'},
  { id:'3',name:'Obsidian Luxury Wand',url:'#',partner:'LoveHoney',clicks:1842,conversions:89,revenue:890,status:'active'},
];
export const mockSponsorCampaigns: SponsorCampaign[] = [
  { id:'1',sponsorName:'LoveHoney',campaignName:'Winter Wellness Campaign',startDate:'2024-12-01',endDate:'2025-01-31',impressions:84200,clicks:3104,budget:5000,status:'active'},
  { id:'2',sponsorName:'LELO',campaignName:'Luxury New Year Collection',startDate:'2025-01-01',endDate:'2025-03-31',impressions:41000,clicks:1842,budget:8000,status:'active'},
];
export const mockAdPlacements: AdPlacement[] = [
  { id:'1',name:'Homepage Hero Banner',location:'Homepage / Hero',format:'1200x400',impressions:42300,clicks:2104,ctr:4.97,sponsor:'LoveHoney'},
  { id:'2',name:'Reviews Sidebar',location:'Reviews / Sidebar',format:'300x600',impressions:28100,clicks:892,ctr:3.17,sponsor:'LELO'},
];
