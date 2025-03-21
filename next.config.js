/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@mastra/*"],

  // Configure rewrites to proxy requests to Mastra server
  async rewrites() {
    return [
      // Proxy all other API requests to the Mastra server
      {
        source: '/:path*',
        // Proxy to Mastra server
        destination: process.env.MASTRA_APP_DOMAIN || 'http://localhost:4111/:path*',
      },
    ]
  },
};

export default nextConfig;