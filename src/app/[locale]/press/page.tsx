import FAQ from "@/components/FAQ";
import SubServiceSummary from "@/widgets/press/About";
import AppDownload from "@/widgets/press/AppDownload";
import SubServicesHeader from "@/widgets/press/Header";
import MediaResources from "@/widgets/press/MediaResources";
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Press"),
    description: t("home_meta_description"),
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
