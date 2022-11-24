/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_HOST}`, process.env.NEXT_PUBLIC_IMAGE_HOST]
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER
  }
}

module.exports = nextConfig
