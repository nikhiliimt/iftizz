import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/iftizz",
  assetPrefix: "/iftizz/",
};

export default nextConfig;