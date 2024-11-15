import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  bundlePagesRouterDependencies: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
