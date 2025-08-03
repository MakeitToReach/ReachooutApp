"use client";

import { useEffect } from "react";

interface UmamiAnalyticsProps {
  websiteId?: string;
  projectId?: string;
  projectName?: string;
  subdomain?: string;
  customDomain?: string;
}

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export const UmamiAnalytics = ({
  websiteId,
  projectId,
  projectName,
  subdomain,
  customDomain,
}: UmamiAnalyticsProps) => {
  useEffect(() => {
    // Only track if we have a website ID
    if (!websiteId) return;

    // Track page view with project data
    if (window.umami) {
      window.umami.track("page_view", {
        project_id: projectId,
        project_name: projectName,
        subdomain: subdomain,
        custom_domain: customDomain,
        page_url: window.location.href,
        page_title: projectName || "Portfolio",
      });
    }

    // Track custom events for portfolio interactions
    const trackPortfolioEvent = (eventName: string, additionalData?: Record<string, any>) => {
      if (window.umami) {
        window.umami.track(eventName, {
          project_id: projectId,
          project_name: projectName,
          subdomain: subdomain,
          custom_domain: customDomain,
          ...additionalData,
        });
      }
    };

    // Expose tracking function globally for portfolio components
    (window as any).trackPortfolioEvent = trackPortfolioEvent;

    // Track when user scrolls to different sections
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercentage > 50 && !window.scrollTracked) {
        trackPortfolioEvent("scroll_50_percent");
        window.scrollTracked = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      delete (window as any).trackPortfolioEvent;
    };
  }, [websiteId, projectId, projectName, subdomain, customDomain]);

  return null; // This component doesn't render anything
}; 