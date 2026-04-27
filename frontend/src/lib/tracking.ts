type TrackingEvent = {
  event: string; properties?: Record<string, unknown>; timestamp?: string;
};
const eventLog: TrackingEvent[] = [];
export function track(event: string, properties?: Record<string, unknown>) {
  const payload: TrackingEvent = { event, properties, timestamp: new Date().toISOString() };
  eventLog.push(payload);
  console.log('[DZIRE Track]', payload);
  // Future: fetch('/api/track/event', { method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'} });
}
export const EVENTS = {
  PAGE_VIEW:'page_view', CTA_CLICK:'cta_click', NEWSLETTER_SIGNUP:'newsletter_signup',
  AFFILIATE_CLICK:'affiliate_click', SPONSOR_CLICK:'sponsor_click', DOLL_PROFILE_VIEW:'doll_profile_view',
  DOLL_PROMO_CLICK:'doll_promo_click', POSITION_POPUP_OPEN:'position_popup_open',
  POSITION_FULL_GUIDE:'position_full_guide_click', REVIEW_OFFER_CLICK:'review_offer_click',
  SEARCH_QUERY:'search_query', FILTER_USED:'filter_used', VIP_CTA_CLICK:'vip_cta_click',
};
export function getEventLog() { return [...eventLog]; }
