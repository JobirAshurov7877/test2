import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "api.varpet.com",
      "new.varpet.com",
      "varpet.com",
      "localhost:3000",
    ],
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
};

export default withNextIntl(nextConfig);
