/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'images.unsplash.com', 'basrocketry.com'],
    unoptimized: true
  },
  env: {
    NODE_PUBLIC_MAILGUN_SMTP_PASSWORD: process.env.NODE_PUBLIC_MAILGUN_SMTP_PASSWORD,
  }
}

module.exports = nextConfig