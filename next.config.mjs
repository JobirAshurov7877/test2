import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["api.varpet.com", "new.varpet.com", "varpet.com"],
  },
};

export default withNextIntl(nextConfig);
