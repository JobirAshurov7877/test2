import React from "react";
import SubServiceClient from "./page.Client";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    locale: string;
    slug: string;
    "item-id": string;
    "service-id": string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    locale,
    slug,
    "item-id": itemId,
    "service-id": serviceId,
  } = await params;
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

  return {
    title: subServiceData?.title || t("Home_meta_title"),
    description: subServiceData?.metaDescription || t("home_meta_description"),
    keywords: subServiceData?.keywords || "home, services, articles",
    openGraph: {
      title: subServiceData?.title || t("Home_meta_title"),
      description:
        subServiceData?.metaDescription || t("home_meta_description"),
      url: `https://varpet.com/${locale}/services/${serviceId}/subservice/${itemId}/${subServiceData.slug}/`,
      type: "website",
      images: [{ url: subServiceData?.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: subServiceData?.title || t("Home_meta_title"),
      description:
        subServiceData?.metaDescription || t("home_meta_description"),
      images: [{ url: subServiceData?.image }],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/services/${serviceId}/subservice/${itemId}/${subServiceData.slug}/`,
    },
  };
}

const SubService: React.FC = () => {
  return <SubServiceClient />;
};

export default SubService;
