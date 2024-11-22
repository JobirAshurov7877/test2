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
  console.log(locale, slug, itemId);
  const articleResponse = await fetch(
    `https://new.varpet.com/api/service/${locale}/${itemId}`
  );
  if (!articleResponse.ok) {
    throw new Error("Maqola ma'lumotlari yuklanmadi");
  }
  const subServiceData = await articleResponse.json();

  return {
    title: subServiceData?.title,
    description: subServiceData?.metaDescription || "null",
    keywords: subServiceData?.keywords,
    openGraph: {
      title: subServiceData?.title,
      description: subServiceData?.metaDescription,
      url: `https://varpet.com/${locale}/services/${serviceId}/subservice/${itemId}/${subServiceData.slug}`,
      type: "website",
      images: [{ url: subServiceData?.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: subServiceData?.title,
      description: subServiceData?.metaDescription,
      images: [{ url: subServiceData?.image }],
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
