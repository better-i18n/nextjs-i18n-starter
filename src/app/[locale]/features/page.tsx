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

function TerminalCodeBlock() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
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
        {featureConfigs.map((feature) => (
          <div
            key={feature.key}
            className="flex flex-col gap-3 bg-card p-6"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground">
              <feature.icon className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold">{t(`${feature.key}.title`)}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t(`${feature.key}.description`)}
            </p>
            <a
              href={feature.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand"
            >
              {t(`${feature.key}.docLabel`)}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </section>

      {/* Integration Journey section */}
      <section className="mt-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("journey.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <p className="mb-8 text-muted-foreground">{t("journey.description")}</p>
        <div>
          <StepCard number={1} title={t("journey.step1.title")} description={t("journey.step1.description")} code={t("journey.step1.code")} />
          <StepCard number={2} title={t("journey.step2.title")} description={t("journey.step2.description")} code="export const i18n = createI18n({ ... })" />
          <StepCard number={3} title={t("journey.step3.title")} description={t("journey.step3.description")} code="<BetterI18nProvider>" />
          <StepCard number={4} title={t("journey.step4.title")} description={t("journey.step4.description")} code='const t = useTranslations("ns")' isLast />
        </div>
      </section>

      {/* Framework Compatibility Table */}
      <section className="mt-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("compat.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <p className="mb-8 text-muted-foreground">{t("compat.description")}</p>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="px-4">{t("compat.featureColumn")}</TableHead>
                <TableHead className="px-4 text-center">Next.js</TableHead>
                <TableHead className="px-4 text-center">Expo</TableHead>
                <TableHead className="px-4 text-center">Remix</TableHead>
                <TableHead className="px-4 text-center">Hono</TableHead>
                <TableHead className="px-4 text-center">TanStack</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { feature: t("compat.cdnFetch"), cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: t("compat.isrRevalidation"), cells: ["✓", "—", "✓", "—", "✓"] },
                { feature: "useSetLocale()", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: "useFormatter()", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: "LocaleDropdown", cells: ["✓", "✓", "✓", "✓", "✓"] },
                { feature: t("compat.ssrSupport"), cells: ["✓", "—", "✓", "✓", "✓"] },
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
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("quickIntegration")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <p className="mb-8 text-muted-foreground">
          {t("quickIntegrationDesc")}{" "}
          <a
            href="https://docs.better-i18n.com/frameworks/nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2"
          >
            {t("followGuide")}
          </a>
        </p>
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
