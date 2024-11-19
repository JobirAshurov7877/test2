import { ReduxProvider } from "@/components/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { Footer, Header } from "@/components";
import { getMessages } from "next-intl/server";

interface ClientRootLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default async function ClientRootLayout({
  children,
  locale,
}: ClientRootLayoutProps) {
  const messages = await getMessages();

  return (
    <ReduxProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <html lang={locale}>
          <body>
            <>
              <Header language={locale} />
              {children}
              <Footer />
            </>
          </body>
        </html>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
