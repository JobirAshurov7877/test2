import JoinTheProgramClient from "./page.Client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await import(`../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  return {
    title: t("Join_the_program"),
    description: t("home_meta_description"),
  };
}

const JoinTheProgram = () => {
  return <JoinTheProgramClient />;
};

export default JoinTheProgram;
