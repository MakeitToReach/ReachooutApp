// Analytics tracking utility functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track a basic page view event
 * @param eventName - Name of the event to track
 * @param eventData - Additional data to include with the event
 */
export const trackPageView = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventData);
  }
}; 