import React from "react";
import SubServiceClient from "./page.Client";
import { Metadata } from "next";
import { imagesAPI } from "../../../../../../../../env";
type Props = {
  params: Promise<{
    locale: string;
    "item-id": string;
    "service-id": string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, "item-id": itemId, "service-id": serviceId } = await params;
  const messages = await import(
    `../../../../../../../../messages/${locale}.json`
  );
  const t = (key: string) => messages[key];
  const articleResponse = await fetch(
    `https://new.varpet.com/api/service/${locale}/${itemId}`
  );
  if (!articleResponse.ok) {
    throw new Error("Maqola ma'lumotlari yuklanmadi");
  }
  const subServiceData = await articleResponse.json();
  console.log(subServiceData);

  return {
    title: subServiceData?.metaTitle || t("Home_meta_title"),
    description: subServiceData?.metaDescription || t("home_meta_description"),
    keywords: subServiceData?.keywords || "home, services, articles",
    openGraph: {
      title: subServiceData?.metaTitle || t("Home_meta_title"),
      description:
        subServiceData?.metaDescription || t("home_meta_description"),
      url: `https://varpet.com/${locale}/services/${serviceId}/subservice/${itemId}/${subServiceData.slug}`,
      type: "website",
      images: [{ url: imagesAPI + subServiceData?.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: subServiceData?.metaTitle || t("Home_meta_title"),
      description:
        subServiceData?.metaDescription || t("home_meta_description"),
      images: [{ url: imagesAPI + subServiceData?.image }],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/services/${serviceId}/subservice/${itemId}/${subServiceData.slug}`,
    },
  };
}

const SubService: React.FC = () => {
  return <SubServiceClient />;
};

export default SubService;
