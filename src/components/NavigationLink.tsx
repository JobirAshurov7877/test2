"use client";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link } from "@/i18n/routing";

interface NavigationLinkProps extends ComponentProps<typeof Link> {
  href: string;
  prefetch?: boolean;
  activeClassName?: string;
}

export default function NavigationLink({
  href,
  prefetch = false,
  className,
  activeClassName = "text-primary",
  children,
  ...rest
}: NavigationLinkProps) {
  const segment = useSelectedLayoutSegment();
  const currentPath = segment ? `/${segment}` : "/";
  const isActive = currentPath === href;

  return (
    <Link
      href={`https://varpet.com${href}`}
      prefetch={prefetch}
      className={clsx(
        "transition-colors duration-200",
        className,
        isActive && activeClassName
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
