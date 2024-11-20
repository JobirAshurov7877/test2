import FAQ from "@/components/FAQ";
import SubServiceSummary from "@/widgets/press/About";
import AppDownload from "@/widgets/press/AppDownload";
import SubServicesHeader from "@/widgets/press/Header";
import MediaResources from "@/widgets/press/MediaResources";
import { Metadata } from "next";
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Press"),
    description: t("home_meta_description"),
    keywords: "home, services, articles",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/press`,
    },
  };
}

const Press = () => {
  return (
    <>
      <SubServicesHeader />
      <MediaResources />
      <AppDownload />
      <SubServiceSummary />
      <FAQ />
    </>
  );
};

export default Press;
