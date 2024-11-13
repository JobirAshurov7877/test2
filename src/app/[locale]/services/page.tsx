import ServicesClient from "./page.Client";
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Services"),
    description: t("home_meta_description"),
    keywords: "services, solutions, support, Varpet, expertise",
    openGraph: {
      title: t("Services"),
      description: t("home_meta_description"),
      url: `https://new.varpet.com/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Services"),
      description: t("home_meta_description"),
    },
  };
}

export default function Services() {
  return <ServicesClient />;
}
