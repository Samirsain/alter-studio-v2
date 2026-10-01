import type { NextConfig } from "next";

// Static export for GitHub Pages. The workflow sets NEXT_PUBLIC_BASE_PATH to "/<repo>" because
// project pages are served from https://<user>.github.io/<repo>/; it stays empty locally.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
