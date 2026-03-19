import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Code,
  ExternalLink,
  Globe,
  Languages,
  LayoutDashboard,
  Server,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
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
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { StepCard } from "@/components/StepCard";
import { toOgLocale } from "@/i18n/locale-map";

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://nextjs-i18n-starter.vercel.app";
  const t = await getTranslations({ locale, namespace: "features" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${baseUrl}/${locale}/features`,
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

interface FeatureConfig {
  key: string;
  icon: LucideIcon;
  docUrl: string;
}

const featureConfigs: FeatureConfig[] = [
  { key: "cdn", icon: Globe, docUrl: "https://docs.better-i18n.com/frameworks/nextjs" },
  { key: "ssr", icon: Server, docUrl: "https://docs.better-i18n.com/frameworks/nextjs/api-reference" },
  { key: "switching", icon: Languages, docUrl: "https://docs.better-i18n.com/frameworks/nextjs/client" },
  { key: "discovery", icon: Zap, docUrl: "https://docs.better-i18n.com/frameworks/nextjs/client" },
  { key: "typesafe", icon: Code, docUrl: "https://docs.better-i18n.com/frameworks/nextjs/api-reference" },
  { key: "ai", icon: Sparkles, docUrl: "https://dash.better-i18n.com" },
  { key: "middleware", icon: Shield, docUrl: "https://docs.better-i18n.com/frameworks/nextjs/middleware" },
  { key: "dashboard", icon: LayoutDashboard, docUrl: "https://dash.better-i18n.com" },
];

const ACCENT_STYLES: Record<string, { iconBg: string; iconText: string; hoverBorder: string }> = {
  cdn: {
    iconBg: "from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20",
    iconText: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-200 dark:hover:border-emerald-900",
  },
  ssr: {
    iconBg: "from-violet-100 to-violet-50 dark:from-violet-900/40 dark:to-violet-800/20",
    iconText: "text-violet-600 dark:text-violet-400",
    hoverBorder: "hover:border-violet-200 dark:hover:border-violet-900",
  },
  switching: {
    iconBg: "from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20",
    iconText: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-200 dark:hover:border-amber-900",
  },
  discovery: {
    iconBg: "from-cyan-100 to-cyan-50 dark:from-cyan-900/40 dark:to-cyan-800/20",
    iconText: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-200 dark:hover:border-cyan-900",
  },
  typesafe: {
    iconBg: "from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20",
    iconText: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-200 dark:hover:border-blue-900",
  },
  ai: {
    iconBg: "from-pink-100 to-pink-50 dark:from-pink-900/40 dark:to-pink-800/20",
    iconText: "text-pink-600 dark:text-pink-400",
    hoverBorder: "hover:border-pink-200 dark:hover:border-pink-900",
  },
  middleware: {
    iconBg: "from-slate-200 to-slate-100 dark:from-slate-800/40 dark:to-slate-700/20",
    iconText: "text-slate-600 dark:text-slate-400",
    hoverBorder: "hover:border-slate-200 dark:hover:border-slate-900",
  },
  dashboard: {
    iconBg: "from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/20",
    iconText: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-200 dark:hover:border-orange-900",
  },
};

function TerminalCodeBlock() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-gray-800 bg-gray-950 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs text-gray-400">i18n.config.ts</span>
      </div>
      <div className="overflow-x-auto p-6 text-sm leading-relaxed text-gray-100">
        <pre><code>{`// i18n.config.ts
import { createI18n } from "@better-i18n/next";

export const i18n = createI18n({
  project: "your-org/your-project",
  defaultLocale: "en",
});

// middleware.ts
import { i18n } from "./i18n.config";
export default i18n.betterMiddleware();

// app/[locale]/layout.tsx
const messages = await i18n.getMessages(locale);
<BetterI18nProvider config={i18n.config} locale={locale} messages={messages}>
  {children}
</BetterI18nProvider>

// Any component
const t = useTranslations("namespace");
return <h1>{t("title")}</h1>;`}</code></pre>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  const t = useTranslations("features");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <BreadcrumbSchema items={[
        { name: nav("home"), href: `/${locale}` },
        { name: nav("features"), href: `/${locale}/features` },
      ]} />

      {/* Hero header */}
      <header>
        <Badge variant="outline" className="rounded-full text-xs font-medium">
          {t("badge")}
        </Badge>
        <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}{" "}
          <span className="text-brand">{t("titleHighlight")}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href="https://docs.better-i18n.com/frameworks/nextjs" target="_blank" rel="noopener noreferrer">
              {t("getStarted")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer">
              {t("openDashboard")}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      {/* Feature cards — gap-px border grid */}
      <section className="mt-20 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
        {featureConfigs.map((feature) => {
          const accent = ACCENT_STYLES[feature.key] ?? ACCENT_STYLES.typesafe;
          return (
            <div
              key={feature.key}
              className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${accent.iconText}`}>
                <feature.icon className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-base font-semibold">{t(`${feature.key}.title`)}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`${feature.key}.description`)}
              </p>
              <a
                href={feature.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:opacity-80"
              >
                {t(`${feature.key}.docLabel`)}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        })}
      </section>

      {/* Integration Journey section */}
      <section className="mt-24">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("journey.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("journey.description")}</p>
        <div className="mt-8">
          <StepCard number={1} title={t("journey.step1.title")} description={t("journey.step1.description")} code={t("journey.step1.code")} />
          <StepCard number={2} title={t("journey.step2.title")} description={t("journey.step2.description")} code="export const i18n = createI18n({ ... })" />
          <StepCard number={3} title={t("journey.step3.title")} description={t("journey.step3.description")} code="<BetterI18nProvider>" />
          <StepCard number={4} title={t("journey.step4.title")} description={t("journey.step4.description")} code='const t = useTranslations("ns")' isLast />
        </div>
      </section>

      {/* Framework Compatibility Table */}
      <section className="mt-24">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("compat.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("compat.description")}</p>
        <div className="mt-8 overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="px-4">Feature</TableHead>
                <TableHead className="px-4 text-center">Next.js</TableHead>
                <TableHead className="px-4 text-center">Expo</TableHead>
                <TableHead className="px-4 text-center">Remix</TableHead>
                <TableHead className="px-4 text-center">Hono</TableHead>
                <TableHead className="px-4 text-center">TanStack</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { feature: "CDN Fetch", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: "ISR / Revalidation", cells: ["✓", "—", "✓", "—", "✓"] },
                { feature: "useSetLocale()", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: "useFormatter()", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: "LocaleDropdown", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: "SSR Support", cells: ["✓", "—", "✓", "✓", "✓"] },
              ].map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="px-4 font-medium">{row.feature}</TableCell>
                  {row.cells.map((cell, i) => (
                    <TableCell
                      key={i}
                      className={`px-4 text-center ${cell === "✓" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Code integration section */}
      <section className="mt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("quickIntegration")}</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {t("quickIntegrationDesc")}{" "}
            <a
              href="https://docs.better-i18n.com/frameworks/nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:decoration-blue-400"
            >
              {t("followGuide")}
            </a>
          </p>
        </div>
        <TerminalCodeBlock />
      </section>

      {/* CTA — inverted card */}
      <section className="mt-24 overflow-hidden rounded-2xl border bg-foreground p-10 text-center text-background sm:p-14">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-4 max-w-lg opacity-70">
          {t("ctaDescription")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button asChild className="w-full bg-background text-foreground hover:bg-background/90 sm:w-auto">
            <a href="https://docs.better-i18n.com/frameworks/nextjs" target="_blank" rel="noopener noreferrer">
              {t("ctaDocs")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild className="w-full border-current/20 bg-transparent text-background hover:bg-background/10 sm:w-auto">
            <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer">
              {t("ctaDashboard")}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Bottom navigation */}
      <nav className="mt-16 flex items-center justify-center gap-6 border-t pt-8" aria-label={t("aria.exploreMore")}>
        <Link href={`/${locale}`} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
          &larr; {t("backToHome")}
        </Link>
        <Link href={`/${locale}/about`} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
          {t("howItWorks")} &rarr;
        </Link>
      </nav>
    </div>
  );
}
