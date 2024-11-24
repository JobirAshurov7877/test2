import { Metadata } from "next";
import dynamic from "next/dynamic";
import BlogClient from "./page.Client";

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Blog"),
    description: t("home_meta_description"),
    keywords: "home, services, articles",
    openGraph: {
      title: t("Blog"),
      description: t("home_meta_description"),
      url: `https://varpet.com/${locale}/blog/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Blog"),
      description: t("home_meta_description"),
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/blog/`,
    },
  };
}

export default function Blog() {
  return <BlogClient />;
}
