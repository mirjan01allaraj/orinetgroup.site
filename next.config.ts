import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site friendly defaults
  images: {
    unoptimized: true,
  },

  // ✅ Prevent ESLint warnings from failing production build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
