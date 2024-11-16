import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.scss";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import ClientRootLayout from "@/components/ClientRootLayout";

// Define the possible locales explicitly
type Locale = "en" | "ru" | "es" | "hy";

export const metadata: Metadata = {
  title: "Varpet - When everything is ok",
  description:
    "Varpet - Where you can find the appropriate qualification specialists for each job",
  keywords: "home, services, articles",
  openGraph: {
    url: "https://varpet.com/",
    type: "website",
  },
  icons: {
    icon: "./BigLogo.svg",
  },
};

async function fetchLocaleData(locale: Locale) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  try {
    const messages = await getMessages({ locale });
    return { locale, messages };
  } catch (error) {
    console.error("Failed to load messages:", error);
    notFound();
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const localeData = await fetchLocaleData(params.locale);

  if (!localeData) {
    return notFound();
  }
  return (
    <ClientRootLayout messages={localeData.messages} locale={localeData.locale}>
      {children}
    </ClientRootLayout>
  );
}
