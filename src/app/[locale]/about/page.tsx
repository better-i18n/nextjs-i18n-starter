import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Upload, Globe, Server, Monitor, ArrowRight, ExternalLink, BookOpen, Github } from "lucide-react";
import { i18n } from "../../../../i18n.config";
import { toOgLocale } from "@/i18n/locale-map";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

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

  const cdnSteps: { key: string; color: string; icon: LucideIcon }[] = [
    { key: "publish", color: "from-violet-500 to-purple-600", icon: Upload },
    { key: "edge", color: "from-blue-500 to-cyan-500", icon: Globe },
    { key: "ssr", color: "from-emerald-500 to-teal-500", icon: Server },
    { key: "hydration", color: "from-amber-500 to-orange-500", icon: Monitor },
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
    <article className="mx-auto max-w-4xl px-6 py-20">
      <BreadcrumbSchema items={[
        { name: nav("home"), href: `/${locale}` },
        { name: nav("about"), href: `/${locale}/about` },
      ]} />

      {/* Hero Introduction */}
      <section
        aria-label={t("aria.introduction")}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 px-8 py-12 dark:from-blue-950/40 dark:via-violet-950/40 dark:to-purple-950/40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
      <section className="mt-20" aria-label={t("stack.title")}>
        <h2 className="text-2xl font-semibold">{t("stack.title")}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <Card key={item.name} className="group transition hover:shadow-md dark:hover:border-gray-700">
              <CardContent className="flex items-start gap-3">
                <span className={`inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-bold ${item.color}`}>
                  {item.name.split(" ")[0]}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t(item.detailKey)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CDN Architecture */}
      <section
        className="mt-20 rounded-2xl bg-gradient-to-br from-gray-50 to-slate-100 px-8 py-10 dark:from-gray-900/60 dark:to-slate-900/60"
        aria-label={t("cdnArchitecture")}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{t("cdnArchitecture")}</h2>
          <Button variant="link" asChild className="gap-1">
            <Link href="https://docs.better-i18n.com/frameworks/nextjs">
              {t("learnMore")}
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          {t("cdnDescription")}
        </p>

        {/* Visual Flow Diagram */}
        <div className="mt-8 flex flex-col gap-0">
          {cdnSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.key}
                className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both flex items-stretch gap-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                    <IconComponent className="size-5" />
                  </div>
                  {index < cdnSteps.length - 1 && (
                    <div className="w-0.5 grow overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <div className="h-full w-full animate-pulse bg-gradient-to-b from-brand via-brand/50 to-transparent" />
                    </div>
                  )}
                </div>
                <Card className="mb-6 flex-1 shadow-sm transition hover:shadow-md">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {t(`cdn.${step.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {t(`cdn.${step.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {t("cacheNote")}
        </p>
      </section>

      {/* SDK APIs */}
      <section className="mt-20" aria-label={t("sdkApis")}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{t("sdkApis")}</h2>
          <Button variant="link" asChild className="gap-1">
            <Link href="https://docs.better-i18n.com/frameworks/nextjs/api-reference">
              {t("fullApiRef")}
              <ExternalLink className="size-3" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800/50">
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
                  <TableCell className="px-4 text-gray-600 dark:text-gray-400">
                    {t(api.purposeKey)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Separator className="mt-20" />

      {/* How It Works */}
      <section
        className="mt-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 px-8 py-10 dark:from-emerald-950/30 dark:to-teal-950/30"
        aria-label={t("howItWorks.title")}
      >
        <h2 className="text-2xl font-semibold">{t("howItWorks.title")}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-400">
          {t("howItWorks.description")}
        </p>
        <div className="mt-6">
          <Button variant="link" asChild className="gap-1 px-0 text-emerald-700 dark:text-emerald-400">
            <Link href="https://docs.better-i18n.com/frameworks/nextjs">
              <BookOpen className="size-3" />
              {t("readGuide")}
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Supported Locales */}
      <section className="mt-20" aria-label={t("locales.title")}>
        <h2 className="text-2xl font-semibold">{t("locales.title")}</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t("locales.description")}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {locales.map((loc) => (
            <button
              key={loc}
              className={`flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition hover:bg-muted ${
                loc === locale ? "border-brand ring-2 ring-brand/20" : "border-border"
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
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
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
      <nav className="mt-20 flex items-center justify-center gap-6 border-t border-gray-200 pt-8 dark:border-gray-800" aria-label={t("aria.exploreMore")}>
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
      </nav>
    </article>
  );
}
