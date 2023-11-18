/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'books.google.com'
      },
      {
        protocol: 'https',
        hostname: 'google.com'
      },
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
