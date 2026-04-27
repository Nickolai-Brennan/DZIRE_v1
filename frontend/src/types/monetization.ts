export interface AffiliateLink { id: string; name: string; url: string; partner: string; clicks: number; conversions: number; revenue: number; status: 'active' | 'inactive'; }
export interface SponsorCampaign { id: string; sponsorName: string; campaignName: string; startDate: string; endDate: string; impressions: number; clicks: number; budget: number; status: 'active' | 'paused' | 'ended'; }
export interface AdPlacement { id: string; name: string; location: string; format: string; impressions: number; clicks: number; ctr: number; sponsor?: string; }
