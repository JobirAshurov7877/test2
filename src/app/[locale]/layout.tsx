// layout.tsx
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
// Yangi client component
import "./globals.scss";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import ClientRootLayout from "@/components/ClientRootLayout";

export const metadata: Metadata = {
  title: "Varpet - When everything is ok",
  description:
    "Varpet - Where you can find the appropriate qualification specialists for each job",
  keywords: "home, services, articles",
  openGraph: {
    title: "Varpet - When everything is ok",
    url: "https://varpet.com/",
    type: "website",
  },
  icons: {
    icon: "./BigLogo.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  try {
    await getMessages();
  } catch (error) {
    notFound();
  }

  return (
    <ClientRootLayout messages={messages} locale={locale}>
      {children}
    </ClientRootLayout>
  );
}
