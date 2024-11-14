import { Metadata } from "next";
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
      url: `https://new.varpet.com/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Blog"),
      description: t("home_meta_description"),
    },
  };
}

export default function Blog() {
  return <BlogClient />;
}
