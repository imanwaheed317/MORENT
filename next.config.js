/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity's image domain
  },
  experimental: {
    turbopack: true, // Enable Turbopack (if necessary for your project)
  },
};

module.exports = nextConfig;
