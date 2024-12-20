import { Metadata } from "next";
import ServicesClient from "./page.Client";
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Services"),
    description: t("home_meta_description"),
    keywords: "services, solutions, support, Varpet, expertise",
    openGraph: {
      title: t("Services"),
      description: t("home_meta_description"),
      url: `https://varpet.com/${locale}/services`,
      type: "website",
      images: [{ url: "https://varpet.com/BigLogo.svg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("Services"),
      description: t("home_meta_description"),
      images: [{ url: "https://varpet.com/BigLogo.svg" }],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/services`,
    },
  };
}

export default function Services() {
  return <ServicesClient />;
}
