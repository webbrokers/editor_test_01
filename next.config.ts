import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт только для продакшена (при сборке)
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  basePath: '/editor_test_01',
  trailingSlash: true,
};

export default nextConfig;
