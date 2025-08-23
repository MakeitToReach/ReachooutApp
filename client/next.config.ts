import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "reachooutassets.s3.amazonaws.com",
      },
    ],
  },
  // Allow cross-origin requests from subdomains in development
  allowedDevOrigins: [
    "localhost",
    "*.localhost",
    "*.localhost:3000",
    "*.reachoout.com",
    "*-*.reachoout.com",
    // Allow any subdomain pattern for localhost
    "*-*.localhost",
    "*-*.localhost:3000",
  ],
};

export default nextConfig;
