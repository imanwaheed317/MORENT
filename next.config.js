/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity's image domain
  },
  experimental: {
    turbopack: false, // Disable Turbopack to avoid module resolution issues
  },
};

module.exports = nextConfig;
