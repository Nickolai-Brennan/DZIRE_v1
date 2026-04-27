import { useEffect } from 'react';
import { track, EVENTS } from '@/lib/tracking';
export function usePageTracking(pageName: string) {
  useEffect(() => { track(EVENTS.PAGE_VIEW, { page: pageName }); }, [pageName]);
}
