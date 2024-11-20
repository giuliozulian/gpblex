/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10094',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
