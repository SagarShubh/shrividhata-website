import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images with query strings (e.g. /api/images/zoho?itemId=...)
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
      {
        pathname: '/api/images/zoho/**',
        search: '?itemId=*'
      }
    ]
  },
  /* config options here */
};

export default nextConfig;
