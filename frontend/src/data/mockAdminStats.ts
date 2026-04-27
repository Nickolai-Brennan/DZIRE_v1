import type { AdminStat, SeoReport, KeywordReport, NewsletterSubscriber, ScheduleItem } from '@/types/admin';
export const mockAdminStats: AdminStat[] = [
  { label:'Total Page Views',value:'124,832',change:12.4 },
  { label:'Active Users',value:'8,241',change:8.1 },
  { label:'Newsletter Signups',value:'3,109',change:24.3 },
  { label:'VIP Members',value:'412',change:5.2 },
  { label:'Affiliate Clicks',value:'9,847',change:18.7 },
  { label:'Sponsor Clicks',value:'4,213',change:-2.1 },
  { label:'Ad Impressions',value:'287,400',change:6.8 },
  { label:'Doll Profile Views',value:'18,320',change:44.5 },
];
export const mockSeoReports: SeoReport[] = [
  { id:'1',pageTitle:'Classic Connection — Position Guide',metaDescription:'Learn the Classic Connection intimate position.',slug:'/positions/classic-connection',targetKeyword:'intimate positions guide',seoScore:87,warnings:['Meta description slightly long']},
  { id:'2',pageTitle:'Luxe Vibrance Pro Review',metaDescription:'Read our in-depth review of the Luxe Vibrance Pro.',slug:'/reviews/luxe-vibrance-pro',targetKeyword:'luxury vibrator review',seoScore:72,warnings:['Missing alt text','Short meta description']},
  { id:'3',pageTitle:'DZIRE Dolls — Creator Discovery',metaDescription:"Discover DZIRE's curated creator spotlight.",slug:'/dzire-dolls',targetKeyword:'adult lifestyle creators',seoScore:91,warnings:[]},
];
export const mockKeywordReports: KeywordReport[] = [
  { id:'1',keyword:'intimate positions',cluster:'Positions',usage:47,ranking:12,suggestions:['beginner intimate positions','couples positions guide']},
  { id:'2',keyword:'luxury vibrator',cluster:'Reviews',usage:23,ranking:8,suggestions:['best luxury vibrators 2025']},
  { id:'3',keyword:'intimacy definition',cluster:'Dictionary',usage:38,ranking:5,suggestions:['what is intimacy','types of intimacy']},
];
export const mockNewsletterSubscribers: NewsletterSubscriber[] = [
  { id:'1',firstName:'Alex',email:'alex@example.com',interests:['Positions','Reviews'],signupSource:'Homepage Hero',status:'active',joinedAt:'2024-11-01'},
  { id:'2',firstName:'Jordan',email:'jordan@example.com',interests:['Stories','DZIRE Dolls'],signupSource:'Newsletter Page',status:'active',joinedAt:'2024-11-15'},
  { id:'3',firstName:'Riley',email:'riley@example.com',interests:['VIP','Reviews'],signupSource:'Review Page CTA',status:'active',joinedAt:'2024-12-01'},
  { id:'4',firstName:'Morgan',email:'morgan@example.com',interests:['Dictionary'],signupSource:'Homepage Hero',status:'unsubscribed',joinedAt:'2024-10-20'},
];
export const mockScheduleItems: ScheduleItem[] = [
  { id:'1',title:'Gravity Shift Position Guide',contentType:'position guide',scheduledAt:'2025-01-15T10:00:00Z',status:'scheduled',author:'DZIRE Editorial'},
  { id:'2',title:'Obsidian Wand Review Update',contentType:'review',scheduledAt:'2025-01-18T14:00:00Z',status:'scheduled',author:'DZIRE Editorial'},
  { id:'3',title:'Aria Luxe January Feature',contentType:'dzire doll spotlight',scheduledAt:'2025-01-20T09:00:00Z',status:'draft',author:'Admin'},
  { id:'4',title:'January Newsletter',contentType:'newsletter',scheduledAt:'2025-01-22T08:00:00Z',status:'scheduled',author:'Admin'},
];
