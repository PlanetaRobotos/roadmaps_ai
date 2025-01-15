/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'levenue-minicourses.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/thumbnails/**'
      },
      {
        protocol: 'https',
        hostname: 'levenue-minicourses.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/categories/thumbnails/**'
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;
