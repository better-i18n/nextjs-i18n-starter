import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { i18n } from "../../../i18n.config";
import { toOgLocale } from "@/i18n/locale-map";
import { Server, Code, Languages, ArrowRight, BookOpen, LayoutDashboard, GithubIcon, Zap, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LocaleDropdown } from "@better-i18n/next/client";
import { CodeBlock } from "@/components/CodeBlock";
import { StatBar } from "@/components/StatBar";
import { PluralCounterDemo } from "@/components/demos/PluralCounterDemo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nextjs-i18n-starter.vercel.app";
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${baseUrl}/${locale}`,
      siteName: "better-i18n",
      locale: toOgLocale(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@betteri18n",
      creator: "@betteri18n",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function HomePage() {
  const locales = await i18n.getLocales();

  return <HomeContent locales={locales} />;
}

const npmCode = `npm install @better-i18n/next

# i18n.config.ts
import { createI18n } from "@better-i18n/next";

export const i18n = createI18n({
  project: "your-org/your-project",
  defaultLocale: "en",
});`;

const bunCode = `bun add @better-i18n/next

# i18n.config.ts
import { createI18n } from "@better-i18n/next";

export const i18n = createI18n({
  project: "your-org/your-project",
  defaultLocale: "en",
});`;

function HomeContent({ locales }: { locales: string[] }) {
  const t = useTranslations("home");
  const locale = useLocale();

  const features = [
    { key: "ssr" as const, icon: <Server className="h-6 w-6" />, hook: "getTranslations()" },
    { key: "typesafe" as const, icon: <Code className="h-6 w-6" />, hook: "useTranslations()" },
    { key: "switcher" as const, icon: <Languages className="h-6 w-6" />, hook: "useLocale()" },
  ];

  const whyReasons = [
    { key: "cdn" as const, href: "https://docs.better-i18n.com", icon: <Zap className="h-5 w-5" /> },
    { key: "frameworks" as const, href: "https://docs.better-i18n.com/frameworks/nextjs", icon: <Globe className="h-5 w-5" /> },
    { key: "dashboard" as const, href: "https://dash.better-i18n.com", icon: <LayoutDashboard className="h-5 w-5" /> },
    { key: "opensource" as const, href: "https://github.com/better-i18n", icon: <GithubIcon className="h-5 w-5" /> },
  ];

  return (
    <article>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        aria-label={t("aria.introduction")}
      >
        {/* Radial gradient blob background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-brand opacity-[0.07] blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center">
          {/* Eyebrow badge with shimmer */}
          <div className="mb-6 inline-flex">
            <style>{`
              @keyframes shimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }
              .animate-shimmer {
                background: linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(255,255,255,0.6) 50%,
                  transparent 100%
                );
                background-size: 200% 100%;
                animation: shimmer 2.5s linear infinite;
              }
            `}</style>
            <Badge
              variant="secondary"
              className="relative overflow-hidden px-4 py-1.5 text-sm"
            >
              <span className="animate-shimmer pointer-events-none absolute inset-0" />
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {t("badge")}
            </Badge>
          </div>

          <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.line1")}
            <br />
            <span className="relative">
              {t("hero.line2prefix")}{" "}
              <span className="decoration-brand relative inline-block bg-gradient-to-r from-brand to-blue-400 bg-clip-text text-transparent underline decoration-wavy underline-offset-4">
                {t("hero.works")}
              </span>
              {t("hero.line2suffix")}
            </span>
          </h1>

          {/* Embedded locale switcher */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{t("hero.readingIn")}</span>
            <LocaleDropdown config={i18n.config} locale={locale} />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-muted-foreground">
            {t("hero.subtitle")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("subtitle")}
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand text-white hover:bg-brand/90">
              <a href="https://docs.better-i18n.com/frameworks/nextjs" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                {t("cta.docs")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer">
                <LayoutDashboard className="h-4 w-4" />
                {t("cta.dashboard")}
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Link href={`/${locale}/features`} className="underline decoration-gray-300 underline-offset-4 transition hover:text-foreground hover:decoration-gray-500 dark:decoration-gray-600">
              {t("exploreFeatures")}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href={`/${locale}/about`} className="underline decoration-gray-300 underline-offset-4 transition hover:text-foreground hover:decoration-gray-500 dark:decoration-gray-600">
              {t("howItWorks")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <StatBar localeCount={locales.length} />
      </section>

      {/* Key Features Section */}
      <section className="mx-auto max-w-4xl px-6 py-24" aria-label={t("keyFeatures")}>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">{t("keyFeatures")}</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.key}
              className="group transition-all hover:border-t-2 hover:border-t-brand hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/20">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">
                  {t(`features.${feature.key}.title`)}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {t(`features.${feature.key}.description`)}
                </CardDescription>
                <div className="mt-3 flex items-center justify-between">
                  <code className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {feature.hook}
                  </code>
                  <Link
                    href={`/${locale}/demos`}
                    className="text-xs font-medium text-brand hover:underline"
                  >
                    &rarr; {t("features.seeDemo")}
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">{t("livePreview.title")}</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            {t("livePreview.description")}
          </p>
          <PluralCounterDemo compact />
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/demos`}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              {t("livePreview.cta")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("quickstart.title")}>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">{t("quickstart.title")}</h2>
        <CodeBlock
          showTabs={{ labels: ["npm", "bun"], codes: [npmCode, bunCode] }}
          filename="i18n.config.ts"
        />
      </section>

      {/* Why better-i18n Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("why.title")}>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">{t("why.title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {whyReasons.map((reason) => (
            <Card
              key={reason.key}
              className="group transition-all hover:border-brand hover:shadow-lg"
            >
              <a
                href={reason.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
                  {reason.icon}
                </div>

                {reason.key === "cdn" && (
                  <div className="font-mono text-xs text-muted-foreground tracking-wider">
                    Dashboard &rarr; CDN &rarr; App
                  </div>
                )}
                {reason.key === "frameworks" && (
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "Expo", "Remix", "Hono"].map((fw) => (
                      <span
                        key={fw}
                        className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                )}
                {reason.key === "dashboard" && (
                  <div className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                    <span className="text-brand">home.title</span>
                    {" → "}
                    <span className="text-emerald-500 dark:text-emerald-400">&quot;Welcome&quot;</span>
                  </div>
                )}
                {reason.key === "opensource" && (
                  <div className="flex items-center gap-1.5">
                    <GithubIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      MIT License
                    </span>
                  </div>
                )}

                <CardTitle className="group-hover:text-brand">
                  {t(`why.${reason.key}.title`)}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {t(`why.${reason.key}.description`)}
                </CardDescription>
                <span className="inline-flex items-center text-sm font-medium text-brand">
                  {t("learnMore")}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("aria.cta")}>
        <div
          className="relative overflow-hidden rounded-2xl px-8 py-16 text-center shadow-xl"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(0deg, transparent, transparent 30px, oklch(1 0 0 / 5%) 30px, oklch(1 0 0 / 5%) 31px)",
              "repeating-linear-gradient(90deg, transparent, transparent 30px, oklch(1 0 0 / 5%) 30px, oklch(1 0 0 / 5%) 31px)",
              "oklch(0.21 0.04 262.881)",
            ].join(", "),
          }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {t("bottomCta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            {t("bottomCta.description")}
          </p>

          {/* Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[t("chip.mit"), t("chip.typescript"), t("chip.vendor")].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-brand shadow-lg hover:bg-white/90 hover:shadow-xl">
              <a href="https://docs.better-i18n.com" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                {t("bottomCta.docs")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer">
                <LayoutDashboard className="h-4 w-4" />
                {t("bottomCta.dashboard")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <a href="https://github.com/better-i18n" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-4 w-4" />
                {t("bottomCta.github")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
