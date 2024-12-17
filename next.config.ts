import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/chatbot/:slug*',
        destination : 'http://113.198.229.158:4444/generate/:slug*'
      },
      {
        source: '/api/:slug*',
        destination : 'http://3.34.225.212:8080/api/:slug*'
      },
    ]
  }
};

export default nextConfig;
