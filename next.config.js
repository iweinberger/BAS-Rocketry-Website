/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'images.unsplash.com', 'basrocketry.com'],
    unoptimized: true
  },
  env: {
    NODE_PUBLIC_MAILGUN_SMTP_PASSWORD: process.env.NODE_PUBLIC_MAILGUN_SMTP_PASSWORD,
    PORT: process.env.NODE_ENV === 'development' ? '3001' : '3000'
  },
  experimental: {
    appDir: true,
  },
  // Handle 404s through not-found.tsx instead of redirects
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/not-found'
        }
      ]
    }
  }
}

module.exports = nextConfig