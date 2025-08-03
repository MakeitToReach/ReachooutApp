"use client";

import { useEffect } from "react";

interface GoogleAnalyticsProps {
  trackingId?: string;
  projectId?: string;
  projectName?: string;
  subdomain?: string;
  customDomain?: string;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    scrollTracked?: boolean;
  }
}

export const GoogleAnalytics = ({
  trackingId,
  projectId,
  projectName,
  subdomain,
  customDomain,
}: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Only initialize if we have a tracking ID
    if (!trackingId) return;

    // Initialize Google Analytics
    const loadGoogleAnalytics = () => {
      // Create script element
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args) {
        window.dataLayer!.push(args);
      };

      window.gtag("js", new Date());
      window.gtag("config", trackingId, {
        page_title: projectName || "Portfolio",
        page_location: window.location.href,
        custom_map: {
          project_id: "project_id",
          project_name: "project_name",
          subdomain: "subdomain",
          custom_domain: "custom_domain",
        },
      });
    };

    // Track page view with project data
    const trackPageView = () => {
      if (window.gtag) {
        window.gtag("event", "page_view", {
          project_id: projectId,
          project_name: projectName,
          subdomain: subdomain,
          custom_domain: customDomain,
          page_url: window.location.href,
          page_title: projectName || "Portfolio",
        });
      }
    };

    // Track custom events for portfolio interactions
    const trackPortfolioEvent = (eventName: string, additionalData?: Record<string, any>) => {
      if (window.gtag) {
        window.gtag("event", eventName, {
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

    // Load GA and track initial page view
    loadGoogleAnalytics();
    trackPageView();

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
  }, [trackingId, projectId, projectName, subdomain, customDomain]);

  return null; // This component doesn't render anything
}; 