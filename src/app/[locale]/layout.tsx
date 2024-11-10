import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.scss";
import { Footer, Header } from "@/components";
import { ReduxProvider } from "@/components/ReduxProvider";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

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
    icon: "/src/assets/BigLogo.svg",
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
    <ReduxProvider>
      <NextIntlClientProvider messages={messages}>
        <html lang={locale}>
          <head></head>
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
