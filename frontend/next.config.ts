import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    console.log("Next.js config loading rewrites!");
    return [
      // Don't rewrite requests to our custom API endpoints
      {
        source: '/api/upload',
        destination: '/api/upload',
      },
      {
        source: '/api/health',
        destination: '/api/health',
      },
      {
        source: '/api/processInspection',
        destination: '/api/processInspection',
      },
      // Explicitly preserve NextAuth routes
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      // Proxy all other API requests to the Mastra server
      {
        source: '/:path*',
        // Proxy to Mastra server
        destination: process.env.MASTRA_ROUTE || 'http://localhost:4111/:path*',
      },
    ]
  },
  // Update experimental options to match Next.js 15
  serverExternalPackages: []
};

export default nextConfig;