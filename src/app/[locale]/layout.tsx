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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale }; // Explicitly type 'locale' as one of the allowed values
}>) {
  const { locale } = params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  console.log(params);

  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }

  return (
    <ClientRootLayout messages={messages} locale={locale}>
      {children}
    </ClientRootLayout>
  );
}
