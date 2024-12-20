import { Metadata } from "next";
import BlogSinglePageClient from "./page.Client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = await import(`../../../../../messages/${locale}.json`);
  const t = (key: string) => messages[key];
  const articleResponse = await fetch(
    `https://new.varpet.com/api/blog/article/${locale}/${slug}`
  );

  if (!articleResponse.ok) {
    throw new Error("Maqola ma'lumotlari yuklanmadi");
  }
  const article = await articleResponse?.json();
  console.log(article);
  return {
    title: article?.title || t("Home_meta_title"),
    description: article?.metaDescription || t("home_meta_description"),
    keywords: article?.keywords || "Varpet, blog",
    openGraph: {
      title: article?.title || t("Home_meta_title"),
      description: article?.metaDescription || t("home_meta_description"),
      url: `https://varpet.com/${locale}/blog/${slug}`,
      type: "website",
      images: [{ url: article?.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title || t("Home_meta_title"),
      description: article?.metaDescription || t("home_meta_description"),
      images: [{ url: article?.image }],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/blog/${slug}`,
    },
  };
}
const BlogSinglePage = () => {
  return <BlogSinglePageClient />;
};

export default BlogSinglePage;
