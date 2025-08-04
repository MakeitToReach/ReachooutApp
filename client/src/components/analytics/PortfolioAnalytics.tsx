"use client";

import { GoogleAnalytics } from "./GoogleAnalytics";

interface PortfolioAnalyticsProps {
  projectId?: string;
  projectName?: string;
  subdomain?: string;
  customDomain?: string;
  googleTrackingId?: string;
}

export const PortfolioAnalytics = ({
  projectId,
  projectName,
  subdomain,
  customDomain,
  googleTrackingId,
}: PortfolioAnalyticsProps) => {

  return (
    <>
      {googleTrackingId && (
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