import type { NextConfig } from "next";

const isGitHubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    unoptimized: true, // important for next/image to work with static export
  },
  // basePath: isGitHubPages ? "/portfolio-minh" : "",
  // assetPrefix: isGitHubPages ? "/portfolio-minh/" : "",
  // ignoreBuildErrors: true,
};

export default nextConfig;
