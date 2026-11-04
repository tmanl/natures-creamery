/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Canonical host is www.naturescreamery.com. Send the Vercel preview
    // alias and the bare apex there so there is one URL for the site.
    return ['natures-creamery1.vercel.app', 'naturescreamery.com'].map((host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: 'https://www.naturescreamery.com/:path*',
      permanent: true,
    }))
  },
}

module.exports = nextConfig
