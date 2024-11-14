import AboutUsClient from "./page.Client";
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("About us"),
    description: t("home_meta_description"),
    keywords: "home, services, articles",
    openGraph: {
      title: t("About us"),
      description: t("home_meta_description"),
      url: `https://new.varpet.com/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("About us"),
      description: t("home_meta_description"),
    },
  };
}

const AboutUs = () => {
  return (
    <>
      <AboutUsClient />
    </>
  );
};

export default AboutUs;
