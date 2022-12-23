/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_HOST}`, process.env.NEXT_PUBLIC_IMAGE_HOST]
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
    NEXT_PUBLIC_AL_APPID: process.env.NEXT_PUBLIC_AL_APPID,
    NEXT_PUBLIC_AL_SEARCH: process.env.NEXT_PUBLIC_AL_SEARCH
  }
}

module.exports = nextConfig
