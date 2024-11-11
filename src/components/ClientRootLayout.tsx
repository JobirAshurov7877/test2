"use client";

import { useState, useEffect } from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { Footer, Header } from "@/components";
import Onboarding from "./Onboarding";

interface ClientRootLayoutProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export default function ClientRootLayout({
  children,
  messages,
  locale,
}: ClientRootLayoutProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ReduxProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <html lang={locale}>
          <body>
            {loading ? (
              <Onboarding />
            ) : (
              <>
                <Header language={locale} />
                {children}
                <Footer />
              </>
            )}
          </body>
        </html>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
