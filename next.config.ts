import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination : 'http://3.34.225.212:8080/api/:slug*'
      }
    ]
  }
};

export default nextConfig;
