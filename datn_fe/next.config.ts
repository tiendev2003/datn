import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  // Add configuration for allowed development origins
  
  allowedDevOrigins:[
    'http://localhost:3000',
    'https://localhost:3000',
    'http://192.168.1.15'
  ]
};

export default nextConfig;
