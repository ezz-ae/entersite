/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.externals.push('firebase-admin');
    }
    return config;
  },
};

module.exports = nextConfig;
