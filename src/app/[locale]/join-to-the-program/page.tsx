import { Metadata } from "next";
import JoinTheProgramClient from "./page.Client";
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Join_the_program"),
    description: t("home_meta_description"),
    keywords: "Varpet, footer, services",
    alternates: {
      canonical: `https://varpet.com/${locale}/join-to-the-program/`,
    },
  };
}

const JoinTheProgram = () => {
  return <JoinTheProgramClient />;
};

export default JoinTheProgram;
