"use client";

import { UmamiAnalytics } from "./UmamiAnalytics";
import { GoogleAnalytics } from "./GoogleAnalytics";

interface PortfolioAnalyticsProps {
  // Project data
  projectId?: string;
  projectName?: string;
  subdomain?: string;
  customDomain?: string;
  
  // Analytics configuration
  umamiWebsiteId?: string;
  googleTrackingId?: string;
  
  // Analytics type preference
  analyticsType?: "umami" | "google" | "both";
}

export const PortfolioAnalytics = ({
  projectId,
  projectName,
  subdomain,
  customDomain,
  umamiWebsiteId,
  googleTrackingId,
  analyticsType = "umami", // Default to Umami since it's already configured
}: PortfolioAnalyticsProps) => {
  const shouldUseUmami = (analyticsType === "umami" || analyticsType === "both") && umamiWebsiteId;
  const shouldUseGoogle = (analyticsType === "google" || analyticsType === "both") && googleTrackingId;

  return (
    <>
      {shouldUseUmami && (
        <UmamiAnalytics
          websiteId={umamiWebsiteId}
          projectId={projectId}
          projectName={projectName}
          subdomain={subdomain}
          customDomain={customDomain}
        />
      )}
      
      {shouldUseGoogle && (
        <GoogleAnalytics
          trackingId={googleTrackingId}
          projectId={projectId}
          projectName={projectName}
          subdomain={subdomain}
          customDomain={customDomain}
        />
      )}
    </>
  );
}; 