import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Динамические маршруты (например, /editor/[id]) требуют серверной сборки, поэтому убираем static export.
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
