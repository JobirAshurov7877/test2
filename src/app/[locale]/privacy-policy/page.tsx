import { Metadata } from "next";
import PrivacyPolicyClient from "./page.Client";
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Privacy_policy"),
    description: t("home_meta_description"),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/privacy-policy`,
    },
  };
}

const PrivacyPolicy = () => {
  return <PrivacyPolicyClient />;
};

export default PrivacyPolicy;

// Styled Components
