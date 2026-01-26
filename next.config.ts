import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Allow Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allow Unsplash (if using mocks)
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', // Allow Avatars
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Allow Google Profile Pics
      },
    ],
  },
};

export default nextConfig;