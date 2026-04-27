export interface AdminStat { label: string; value: string | number; change?: number; }
export interface SeoReport { id: string; pageTitle: string; metaDescription: string; slug: string; targetKeyword: string; seoScore: number; warnings: string[]; }
export interface KeywordReport { id: string; keyword: string; cluster: string; usage: number; ranking?: number; suggestions: string[]; }
export interface NewsletterSubscriber { id: string; firstName: string; email: string; interests: string[]; signupSource: string; status: 'active' | 'unsubscribed' | 'bounced'; joinedAt: string; }
export interface ScheduleItem { id: string; title: string; contentType: string; platform?: string; scheduledAt: string; status: 'draft' | 'scheduled' | 'published'; author: string; }
