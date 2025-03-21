/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@mastra/*"],

  // Configure rewrites to proxy requests to Mastra server
  async rewrites() {
    const mastraDomain = (process.env.MASTRA_APP_DOMAIN || 'http://localhost:4111').replace(/\/$/, '');
    return [
      {
        source: '/:path*', // Match everything
        destination: `${mastraDomain}/:path*`, // Proxy to Heroku backend
      },
    ]
  },
};

export default nextConfig;