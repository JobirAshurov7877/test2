import { ExploreServices, WeGuarantee } from "@/components";
import FAQ from "@/components/FAQ";
import AboutUs from "@/widgets/home/AboutUs";
import DownloadOurApp from "@/widgets/home/DownloadOurApp";
import Header from "@/widgets/home/Header";
import OurServices from "@/widgets/home/OurServices";
import SubServiceAbout from "@/widgets/home/Partners";
import TopArticles from "@/widgets/home/TopArticles";
import type { Metadata } from "next";

export const metadata = async ({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  console.log(params);
  const messages = await import(`../../../messages/${"en"}.json`);
  const t = (key: string) => messages[key];

  return {
    title: t("Varpet - When everything is ok"),
    description: t(
      "Varpet - Where you can find the appropriate qualification specialists for each job"
    ),
    keywords: "home, services, articles",
    openGraph: {
      title: t("Varpet - When everything is ok"),
      description: t(
        "Varpet - Where you can find the appropriate qualification specialists for each job"
      ),
      url: `https://new.varpet.com/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Varpet - When everything is ok"),
      description: t(
        "Varpet - Where you can find the appropriate qualification specialists for each job"
      ),
    },
  };
};

export default function Home() {
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
