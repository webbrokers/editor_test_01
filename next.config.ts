import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Если проект не в корне репозитория, раскомментируйте и укажите путь:
  // basePath: '/editor_test_01',
  // trailingSlash: true,
};

export default nextConfig;
