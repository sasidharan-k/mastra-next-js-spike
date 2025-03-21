import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    console.log("Next.js config loading rewrites!");
    return [
      {
        source: '/:path*',
        // Proxy to Mastra server
        destination: process.env.MASTRA_APP_DOMAIN || 'http://localhost:4111/:path*',
      },
    ]
  },
  // Update experimental options to match Next.js 15
  serverExternalPackages: []
};

export default nextConfig;