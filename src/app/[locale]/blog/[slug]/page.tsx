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

  const article = await articleResponse.json();

  return {
    title: article?.title,
    description: article?.metaDescription,
    keywords: article?.keywords,
    openGraph: {
      title: article?.title,
      description: article?.metaDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
      type: "website",
      images: [{ url: article?.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.metaDescription,
      images: [{ url: article?.image }],
    },
    alternates: {
      canonical: `https://varpet.com/${locale}/blog/${slug}`,
    },
  };
}
const BlogSinglePage = ({ params }: any) => {
  return <BlogSinglePageClient />;
};

export default BlogSinglePage;
