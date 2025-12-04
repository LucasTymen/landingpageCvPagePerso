/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Configuration pour servir les fichiers statiques depuis /public
  // Les fichiers HTML existants seront accessibles via les routes Next.js
  async headers() {
    return [
      {
        source: '/:path*.(css|js|png|jpg|jpeg|svg|webp|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/resources/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

