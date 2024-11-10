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
};

export default withNextIntl(nextConfig);
