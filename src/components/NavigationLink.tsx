"use client";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps, useMemo } from "react";
import { Link } from "@/i18n/routing";

interface NavigationLinkProps extends ComponentProps<typeof Link> {
  href: string;
  prefetch?: boolean;
}

export default function NavigationLink({
  href,
  prefetch = true, // Default prefetch qiymatini qo'shdik
  className,
  ...rest
}: NavigationLinkProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();

  // pathname va isActive ni useMemo bilan optimize qilamiz
  const { pathname, isActive } = useMemo(() => {
    const currentPath = selectedLayoutSegment
      ? `/${selectedLayoutSegment}`
      : "/";
    return {
      pathname: currentPath,
      isActive: currentPath === href,
    };
  }, [selectedLayoutSegment, href]);

  // className ni ham useMemo bilan optimize qilamiz
  const linkClassName = useMemo(() => {
    return clsx(
      "inline-block px-2 py-3 transition-colors",
      isActive ? "text-white" : "text-gray-400 hover:text-gray-200",
      className
    );
  }, [isActive, className]);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={linkClassName}
      href={href}
      prefetch={prefetch}
      {...rest}
    />
  );
}
