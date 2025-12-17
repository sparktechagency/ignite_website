import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1m86avknwgx1f.cloudfront.net",
      },
      {
        protocol: "http",
        hostname: "d1m86avknwgx1f.cloudfront.net",
      }
    ],
    domains: [
      "di0kc6glg2cji.cloudfront.net",
      "10.10.20.9",
      "placehold.co",
      "api.ignitefoundation",
    ],
  },
  productionBrowserSourceMaps: false,
  turbopack: {
    resolveExtensions: [
      '.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.ttf', '.mp4'
    ],
  },
};

export default nextConfig;
