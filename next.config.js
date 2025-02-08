/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity's image domain
  },
};

module.exports = nextConfig;
