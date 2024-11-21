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
      url: `https://varpet.com/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Services"),
      description: t("home_meta_description"),
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services`,
    },
  };
}

export default function Services() {
  return <ServicesClient />;
}
