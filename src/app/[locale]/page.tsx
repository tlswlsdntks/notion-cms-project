import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { LandingHeader } from "@/components/layout/landing-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  Shield,
  Layers,
  Moon,
  Globe,
  LayoutDashboard,
  GitFork,
  ArrowRight,
} from "lucide-react";

const featureList = [
  { key: "nextjs", Icon: Zap },
  { key: "typescript", Icon: Shield },
  { key: "shadcn", Icon: Layers },
  { key: "darkmode", Icon: Moon },
  { key: "i18n", Icon: Globe },
  { key: "dashboard", Icon: LayoutDashboard },
] as const;

const techStack = [
  { name: "Next.js 16", color: "bg-black text-white dark:bg-white dark:text-black" },
  { name: "TypeScript", color: "bg-blue-600 text-white" },
  { name: "Tailwind CSS v4", color: "bg-cyan-500 text-white" },
  { name: "shadcn/ui", color: "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black" },
  { name: "next-intl", color: "bg-purple-600 text-white" },
  { name: "next-themes", color: "bg-orange-500 text-white" },
];

export default async function LandingPage() {
  const t = await getTranslations("landing");
  const locale = await getLocale();

  const features = featureList.map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`features.items.${key}.title`),
    description: t(`features.items.${key}.description`),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-4 py-24 text-center">
          <Badge variant="secondary" className="mb-6">
            {t("hero.badge")}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.title")}{" "}
            <span className="text-primary underline underline-offset-4 decoration-wavy">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/dashboard`}>
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://github.com/tlswlsdntks/nextjs-shadcn-starter" target="_blank" rel="noopener noreferrer">
                <GitFork className="h-4 w-4" />
                {t("hero.ctaSecondary")}
              </a>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Tech Stack */}
        <section className="container mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            {t("stack.title")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        <Separator />

        {/* Features */}
        <section className="container mx-auto max-w-6xl px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("features.title")}</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              {t("features.description")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ key, Icon, title, description }) => (
              <Card key={key} className="border-border/50 hover:border-border transition-colors">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          Built with Next.js 16, Tailwind CSS, shadcn/ui — Open source starter kit
        </div>
      </footer>
    </div>
  );
}
