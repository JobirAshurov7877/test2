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
import ClientRootLayout from "@/components/ClientRootLayout";

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
    "Varpet - Where you can find the appropriate qualification specialists for each job",
  keywords: "home, services, articles",
  openGraph: {
    url: "https://varpet.com/",
    type: "website",
  },
  icons: {
    icon: "/BigLogo.svg",
  },
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  let messages = {};
  if (!routing?.locales?.includes(locale as any)) {
    notFound(); // Redirect to 404 if locale is invalid
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
    <ClientRootLayout messages={messages} locale={locale}>
      {children}
    </ClientRootLayout>
  );
}
