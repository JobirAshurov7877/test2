import { ExploreServices, WeGuarantee } from "@/components";
import FAQ from "@/components/FAQ";
import AboutUs from "@/widgets/home/AboutUs";
import DownloadOurApp from "@/widgets/home/DownloadOurApp";
import Header from "@/widgets/home/Header";
import OurServices from "@/widgets/home/OurServices";
import SubServiceAbout from "@/widgets/home/Partners";
import TopArticles from "@/widgets/home/TopArticles";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Home_meta_title"),
    description: t("home_meta_description"),
    keywords: "home, services, articles",
    openGraph: {
      title: t("Home_meta_title"),
      description: t("home_meta_description"),
      url: `https://varpet.com/${locale}/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Home_meta_title"),
      description: t("home_meta_description"),
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/`,
    },
  };
}

export default async function Home() {
  return (
    <>
      <Header />
      <OurServices />
      <DownloadOurApp />
      <AboutUs />
      <WeGuarantee />
      <SubServiceAbout />
      <TopArticles />
      <ExploreServices />
      <FAQ />
    </>
  );
}
