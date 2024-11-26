import { Metadata } from "next";
import CategoriesClient from "./page.Client";
import { imagesAPI } from "../../../../../../../env";
type Props = {
  params: Promise<{ locale: string; slug: string; "item-id": string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, "item-id": itemId } = await params;
  const messages = await import(`../../../../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  const articleResponse = await fetch(
    `https://new.varpet.com/api/service-with-subs/${locale}/${itemId}`
  );

  if (!articleResponse.ok) {
    throw new Error("Maqola ma'lumotlari yuklanmadi");
  }
  const rootWithServicesSlice = await articleResponse?.json();
  console.log(rootWithServicesSlice);
  return {
    title: rootWithServicesSlice?.title || t("Home_meta_title"),
    description:
      rootWithServicesSlice?.description || t("home_meta_description"),
    keywords: rootWithServicesSlice?.keywords || "home, services, subservices",
    openGraph: {
      title: rootWithServicesSlice?.title || t("Home_meta_title"),
      description:
        rootWithServicesSlice?.description || t("home_meta_description"),
      url: `https://varpet.com/${locale}/services/${itemId}/${slug}`,
      type: "website",
      images: [{ url: imagesAPI + rootWithServicesSlice?.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: rootWithServicesSlice?.title || t("Home_meta_title"),
      description:
        rootWithServicesSlice?.description || t("home_meta_description"),
      images: [{ url: imagesAPI + rootWithServicesSlice?.image }],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/services/${itemId}/${slug}`,
    },
  };
}

const Categories = () => {
  return <CategoriesClient />;
};

export default Categories;
