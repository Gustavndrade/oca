import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@oca/types", "@oca/utils"],
  experimental: {
    // Enables typed routes
    typedRoutes: true,
  },
};

export default nextConfig;
