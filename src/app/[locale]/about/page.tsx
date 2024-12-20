import { Metadata, ResolvingMetadata } from "next";
import AboutUsClient from "./page.Client";

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];

  return {
    title: t("About us"),
    description: t("home_meta_description"),
    keywords: "Varpet, about us",
    openGraph: {
      title: t("About us"),
      description: t("home_meta_description"),
      type: "website",
      images: ["https://varpet.com/BigLogo.svg"],
      url: `https://varpet.com/${locale}/about`,
      siteName: "Varpet",
    },
    twitter: {
      card: "summary_large_image",
      title: t("About us"),
      description: t("home_meta_description"),
      images: ["https://varpet.com/BigLogo.svg"],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/about`,
    },
  };
}

const AboutUs = () => {
  return <AboutUsClient />;
};

export default AboutUs;
