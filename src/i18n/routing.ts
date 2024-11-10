import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ru", "es", "hy"],
  defaultLocale: "es",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
