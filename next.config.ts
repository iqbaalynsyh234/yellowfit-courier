import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    // Skip ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript errors during build (optional)
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://api.yellowfitkitchen.com/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
