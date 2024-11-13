import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default async function middleware(req: any) {
  // Vercel geolokatsiya xizmati orqali mamlakat kodini olish
  const countryCode = req.geo?.country || "unknown";
  console.log("Country Code:", countryCode);

  const acceptLanguage = req.headers.get("accept-language") || "";
  const userLocale = acceptLanguage.split(",")[0].split("-")[0];
  const supportedLocales = routing.locales;

  // Mamlakat kodi asosida tilni aniqlash (ba'zi davlatlarda mos til tanlanadi)
  const locale = supportedLocales.includes(userLocale)
    ? userLocale
    : routing.defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(ru|en|es|hy)/:path*"],
};
