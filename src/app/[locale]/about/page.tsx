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
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: t("About us"),
    description: t("home_meta_description"),
    keywords: "home, services, articles",
    openGraph: {
      title: t("About us"),
      description: t("home_meta_description"),
      url: `https://new.varpet.com/`,
      type: "website",
      images: previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: t("About us"),
      description: t("home_meta_description"),
    },
  };
}

const AboutUs = () => {
  return <AboutUsClient />;
};

export default AboutUs;
