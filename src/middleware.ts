// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default async function middleware(req: any) {
  // Foydalanuvchi brauzerining tilini olish
  const acceptLanguage = req.headers.get("accept-language") || "";
  const userLocale = acceptLanguage.split(",")[0].split("-")[0];
  const supportedLocales = routing.locales;

  // Foydalanuvchi tili qo‘llab-quvvatlanayotgan tillar ichida bor-yo‘qligini tekshirish
  const locale = supportedLocales.includes(userLocale)
    ? userLocale
    : routing.defaultLocale;

  // URL yo'nalishini yangilash
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;

  return createMiddleware(routing)(req); // Standart routingni davom ettiradi
}

export const config = {
  matcher: ["/", "/(ru|en|es|hy)/:path*"],
};
