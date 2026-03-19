import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Upload, Globe, Server, Monitor, ArrowRight, ExternalLink, BookOpen, Github } from "lucide-react";
import { i18n } from "../../../../i18n.config";
import { toOgLocale } from "@/i18n/locale-map";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nextjs-i18n-starter.vercel.app";
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${baseUrl}/${locale}/about`,
      siteName: "better-i18n",
      locale: toOgLocale(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@betteri18n",
      creator: "@betteri18n",
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
    },
  };
}

export default async function AboutPage() {
  const locales = await i18n.getLocales();

  return <AboutContent locales={locales} />;
}

const FLAGS: Record<string, string> = {
  en: "🇺🇸", de: "🇩🇪", es: "🇪🇸", tr: "🇹🇷", fr: "🇫🇷", pt: "🇧🇷",
  ja: "🇯🇵", ko: "🇰🇷", "zh-hans": "🇨🇳", ar: "🇸🇦", ru: "🇷🇺",
  it: "🇮🇹", nl: "🇳🇱", hi: "🇮🇳", pl: "🇵🇱",
};

const NATIVE_NAMES: Record<string, string> = {
  en: "English", de: "Deutsch", es: "Español", tr: "Türkçe", fr: "Français",
  pt: "Português", ja: "日本語", ko: "한국어", "zh-hans": "简体中文", ar: "العربية",
  ru: "Русский", it: "Italiano", nl: "Nederlands", hi: "हिन्दी", pl: "Polski",
};

function getFlag(locale: string) { return FLAGS[locale] ?? "🌐"; }
function getNativeName(locale: string) { return NATIVE_NAMES[locale] ?? locale; }

function AboutContent({ locales }: { locales: string[] }) {
  const t = useTranslations("about");
  const nav = useTranslations("nav");
  const locale = useLocale();

  const stack = [
    { name: "Next.js 15", detailKey: "stack.appRouter" as const, color: "bg-black text-white dark:bg-white dark:text-black" },
    { name: "@better-i18n/next", detailKey: "stack.cdnTranslations" as const, color: "bg-blue-600 text-white" },
    { name: "next-intl", detailKey: "stack.typeSafeHooks" as const, color: "bg-violet-600 text-white" },
    { name: "Tailwind CSS 4", detailKey: "stack.utilityStyling" as const, color: "bg-cyan-500 text-white" },
    { name: "TypeScript 5", detailKey: "stack.fullTypeSafety" as const, color: "bg-blue-700 text-white" },
  ];

  const cdnSteps: { key: string; icon: LucideIcon }[] = [
    { key: "publish", icon: Upload },
    { key: "edge", icon: Globe },
    { key: "ssr", icon: Server },
    { key: "hydration", icon: Monitor },
  ];

  const apis = [
    { name: "createI18n()", type: "Config", purposeKey: "api.createI18n" as const },
    { name: "i18n.betterMiddleware()", type: "Server", purposeKey: "api.middleware" as const },
    { name: "i18n.getMessages(locale)", type: "Server", purposeKey: "api.getMessages" as const },
    { name: "i18n.getLocales()", type: "Server", purposeKey: "api.getLocales" as const },
    { name: "BetterI18nProvider", type: "Client", purposeKey: "api.provider" as const },
    { name: "useTranslations(ns)", type: "Client", purposeKey: "api.useTranslations" as const },
    { name: "useSetLocale()", type: "Client", purposeKey: "api.useSetLocale" as const },
    { name: "useManifestLanguages()", type: "Client", purposeKey: "api.useManifest" as const },
  ];

  const typeBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
    Config: "outline",
    Server: "default",
    Client: "secondary",
  };

  return (
    <article>
      <BreadcrumbSchema items={[
        { name: nav("home"), href: `/${locale}` },
        { name: nav("about"), href: `/${locale}/about` },
      ]} />

      {/* Hero Introduction */}
      <section aria-label={t("aria.introduction")}>
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 sm:pt-28">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="https://docs.better-i18n.com/frameworks/nextjs">
                <BookOpen />
                {t("readDocs")}
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/better-i18n">
                <Github />
                {t("viewOnGithub")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("stack.title")}>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("stack.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <div key={item.name} className="bg-card p-6">
              <div className="flex items-start gap-3">
                <span className={`inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-bold ${item.color}`}>
                  {item.name.split(" ")[0]}
                </span>
                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(item.detailKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CDN Architecture */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("cdnArchitecture")}>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("cdnArchitecture")}</h2>
          <span className="h-px flex-1 bg-border" />
          <Button variant="link" asChild className="gap-1 shrink-0">
            <Link href="https://docs.better-i18n.com/frameworks/nextjs">
              {t("learnMore")}
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t("cdnDescription")}
        </p>

        {/* Visual Flow Diagram */}
        <div className="flex flex-col gap-0">
          {cdnSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.key}
                className="flex items-stretch gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <IconComponent className="size-5" />
                  </div>
                  {index < cdnSteps.length - 1 && (
                    <div className="w-px grow border-l border-border my-1" />
                  )}
                </div>
                <div className="mb-6 flex-1 rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">
                    {t(`cdn.${step.key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`cdn.${step.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {t("cacheNote")}
        </p>
      </section>

      {/* SDK APIs */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("sdkApis")}>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("sdkApis")}</h2>
          <span className="h-px flex-1 bg-border" />
          <Button variant="link" asChild className="gap-1 shrink-0">
            <Link href="https://docs.better-i18n.com/frameworks/nextjs/api-reference">
              {t("fullApiRef")}
              <ExternalLink className="size-3" />
            </Link>
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="px-4">{t("apiTable.api")}</TableHead>
                <TableHead className="px-4">{t("apiTable.type")}</TableHead>
                <TableHead className="px-4">{t("apiTable.purpose")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apis.map((api) => (
                <TableRow key={api.name}>
                  <TableCell className="px-4">
                    <code className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {api.name}
                    </code>
                  </TableCell>
                  <TableCell className="px-4">
                    <Badge variant={typeBadgeVariant[api.type] ?? "default"}>
                      {api.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 text-muted-foreground">
                    {t(api.purposeKey)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("howItWorks.title")}>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("howItWorks.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-2xl border bg-card px-8 py-10">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t("howItWorks.description")}
          </p>
          <div className="mt-6">
            <Button variant="link" asChild className="gap-1 px-0">
              <Link href="https://docs.better-i18n.com/frameworks/nextjs">
                <BookOpen className="size-3" />
                {t("readGuide")}
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Supported Locales */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("locales.title")}>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("locales.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          {t("locales.description")}
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {locales.map((loc) => (
            <button
              key={loc}
              className={`flex items-center gap-2 rounded-lg border bg-card p-3 text-left text-sm transition hover:bg-muted ${
                loc === locale ? "border-foreground" : "border-border"
              }`}
            >
              <span className="text-base">{getFlag(loc)}</span>
              <div>
                <p className="font-medium">{getNativeName(loc)}</p>
                <p className="font-mono text-xs text-muted-foreground">{loc}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("manageLocales")}{" "}
          <Link
            href="https://dash.better-i18n.com"
            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition hover:text-blue-700 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300"
          >
            {t("dashboardLink")}
          </Link>
          .
        </p>
      </section>

      {/* Bottom Navigation */}
      <nav className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("aria.exploreMore")}>
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="flex items-center justify-center gap-6">
          <Button variant="link" asChild>
            <Link href={`/${locale}`}>
              &larr; {t("backToHome")}
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href={`/${locale}/features`}>
              {t("exploreFeatures")}
              <ArrowRight className="size-3" />
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href={`/${locale}/demos`}>
              {t("demos")}
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </nav>
    </article>
  );
}
