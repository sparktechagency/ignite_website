import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["di0kc6glg2cji.cloudfront.net", "10.10.20.9", "placehold.co", "api.ignitefoundation"],
  },
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json','.ttf','.mp4'],
  },
};

export default nextConfig;
