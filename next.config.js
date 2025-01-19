/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://cead-195-113-242-129.ngrok-free.app'],
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
        pathname: '/**'
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;
