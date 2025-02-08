/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity's image domain
  },
  experimental: {
  },
};

module.exports = nextConfig;
