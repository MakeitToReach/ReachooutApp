import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
        ]

    },
    // Allow cross-origin requests from subdomains in development
    allowedDevOrigins: [
        'localhost',
        '*.localhost',
        '*.localhost:3000',
        '*.reachoout.com',
        // Allow any subdomain pattern for localhost
        '*-*.localhost',
        '*-*.localhost:3000',
    ],
};

export default nextConfig;
