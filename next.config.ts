import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TypeScript errors ko ignore karo Vercel pe
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint errors ko ignore karo
  //eslint: {
   // ignoreDuringBuilds: true,
 // },
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;