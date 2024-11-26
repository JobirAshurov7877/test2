import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: [
      "api.varpet.com",
      "new.varpet.com",
      "varpet.com",
      "localhost:3000",
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  poweredByHeader: false, // Security improvement
  compress: true, // Enable compression
  generateEtags: true,
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
