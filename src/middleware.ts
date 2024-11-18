import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default async function middleware(req: any) {
  // Vercel geolokatsiya xizmati orqali mamlakat kodini olish
  const countryCode = req.geo?.country || "unknown";
  console.log("Country code:", countryCode);

  const acceptLanguage = req.headers.get("accept-language") || "";
  const userLocale = acceptLanguage.split(",")[0].split("-")[0];
  const supportedLocales = routing.locales;

  const locale = supportedLocales.includes(userLocale)
    ? userLocale
    : routing.defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(en|ru|es|hy)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
