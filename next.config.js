/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'cdn.shopify.com',
      'natures-creamery.myshopify.com',
    ],
  },
}

module.exports = nextConfig
