import { ExploreServices, WeGuarantee } from "@/components";
import FAQ from "@/components/FAQ";
import AboutUs from "@/widgets/home/AboutUs";
import DownloadOurApp from "@/widgets/home/DownloadOurApp";
import Header from "@/widgets/home/Header";
import OurServices from "@/widgets/home/OurServices";
import SubServiceAbout from "@/widgets/home/Partners";
import TopArticles from "@/widgets/home/TopArticles";
import { Metadata } from "next";
import Head from "next/head";

type Props = {
  params: Promise<{ locale: string }>;
};
type HomeProps = {
  params: { locale: string };
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
      url: `https://new.varpet.com/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Home_meta_title"),
      description: t("home_meta_description"),
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = params;
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`}
        />
      </Head>
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
