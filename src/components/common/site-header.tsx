"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

const NAV_LINKS = [
  { href: "/" as const, key: "home" },
  { href: "/books" as const, key: "books" },
  { href: "/stats" as const, key: "stats" },
  { href: "/quotes" as const, key: "quotes" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-5 w-5" />
          <span>북 리뷰</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
