/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://retrievalprime.com/public/authorly/public/api/:path*', // Proxy to the API
        },
      ];
    },
  };

  export default  nextConfig;