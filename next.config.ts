import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/gallery/**" },
    ],
  },
};

export default nextConfig;
