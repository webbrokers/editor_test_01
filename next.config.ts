import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/editor_test_01',
  trailingSlash: true,
};

export default nextConfig;
