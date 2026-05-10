"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-semibold"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            N
          </div>
          <span>StarterKit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href={`/${locale}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href={`/${locale}/dashboard`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("dashboard")}
          </Link>
          <Link
            href={`/${locale}/dashboard/components`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("components")}
          </Link>
          <Link
            href={`/${locale}/quotes`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("quotes")}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2">
            <Link href={`/${locale}/dashboard`}>{t("dashboard")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
