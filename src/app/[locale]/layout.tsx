import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.scss";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { ReactNode } from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { Footer, Header } from "@/components";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Varpet - When everything is ok",
  description:
    "Varpet connects you with qualified specialists for all your home service needs. Find trusted professionals for repairs, maintenance, and improvements.",
  keywords: "Varpet",
  openGraph: {
    title: "Varpet - When everything is ok",
    description:
      "Varpet - Where you can find the appropriate qualification specialists for each job",
    url: "https://varpet.com",
    siteName: "Varpet",
    type: "website",
    images: ["https://varpet.com/BigLogo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varpet - Professional Home Services",
    description:
      "Varpet - Where you can find the appropriate qualification specialists for each job",
    images: ["https://varpet.com/BigLogo.svg"],
  },
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  let messages = {};
  if (!routing?.locales?.includes(locale as any)) {
    notFound();
  }
  try {
    setRequestLocale(locale);
  } catch (error) {
    notFound();
  }
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }

  return (
    <ReduxProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <html lang={locale}>
          <body>
            <Header language={locale} />
            {children}
            <Footer />
          </body>
        </html>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
