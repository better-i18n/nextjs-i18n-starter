import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { i18n } from "../../../i18n.config";
import { toOgLocale } from "@/i18n/locale-map";
import { ArrowRight, BookOpen, LayoutDashboard, GithubIcon, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CodeBlock } from "@/components/CodeBlock";
import { PluralCounterDemo } from "@/components/demos/PluralCounterDemo";
import { FormatBentoDemo } from "@/components/demos/FormatBentoDemo";

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
  project: "my-org/my-app",
  defaultLocale: "en",
});

# middleware.ts
import { i18n } from "./i18n.config";
export default i18n.betterMiddleware();
export const config = {
  matcher: ["/((?!api|_next|.*\\\\..*).*)"],
};`;

const bunCode = `bun add @better-i18n/next

# i18n.config.ts
import { createI18n } from "@better-i18n/next";
export const i18n = createI18n({
  project: "my-org/my-app",
  defaultLocale: "en",
});

# middleware.ts
import { i18n } from "./i18n.config";
export default i18n.betterMiddleware();
export const config = {
  matcher: ["/((?!api|_next|.*\\\\..*).*)"],
};`;

function HomeContent({ locales }: { locales: string[] }) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <article>
      {/* ── Hero ── */}
      <section className="relative" aria-label={t("aria.introduction")}>
        {/* Noise texture overlay for depth */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" aria-hidden="true" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 sm:pt-28">
          {/* Headline — left-aligned, editorial */}
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="https://docs.better-i18n.com/frameworks/nextjs" target="_blank" rel="noopener noreferrer">
                {t("cta.docs")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer">
                {t("cta.dashboard")}
              </a>
            </Button>
          </div>

          {/* Proof strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">{t("stats.locales", { count: locales.length })}</span>
            <span className="hidden text-border sm:inline">|</span>
            <span>{t("stats.fallback")}</span>
            <span className="hidden text-border sm:inline">|</span>
            <span>{t("stats.isr")}</span>
            <span className="hidden text-border sm:inline">|</span>
            <span>{t("stats.switch")}</span>
          </div>
        </div>
      </section>

      {/* ── Bento grid: Features + Live demo ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-5">
          {/* Feature: SSR */}
          <div className="overflow-hidden rounded-2xl border bg-card p-6 sm:col-span-3">
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">getTranslations()</code>
            <h3 className="mt-4 text-lg font-semibold">{t("features.ssr.title")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("features.ssr.description")}</p>
            <Link href={`/${locale}/demos`} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand">
              {t("features.seeDemo")} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Feature: Type-safe */}
          <div className="overflow-hidden rounded-2xl border bg-card p-6 sm:col-span-2">
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">useTranslations()</code>
            <h3 className="mt-4 text-lg font-semibold">{t("features.typesafe.title")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("features.typesafe.description")}</p>
            <Link href={`/${locale}/demos`} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand">
              {t("features.seeDemo")} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Live demo — full width */}
          <div className="overflow-hidden rounded-2xl border bg-card sm:col-span-3">
            <div className="border-b px-6 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{t("livePreview.title")}</h3>
                <Link href={`/${locale}/demos`} className="text-xs font-medium text-brand hover:underline">
                  {t("livePreview.cta")} <ArrowRight className="ml-0.5 inline h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="px-6 py-6">
              <FormatBentoDemo />
            </div>
          </div>

          {/* Feature: i18n Doctor CLI */}
          <div className="overflow-hidden rounded-2xl border bg-card sm:col-span-2">
            <div className="p-6 pb-3">
              <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">npx better-i18n doctor</code>
              <h3 className="mt-4 text-lg font-semibold">i18n Doctor</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                CI/CD&apos;de çalıştır, Dashboard&apos;da analiz et. Eksik key, hardcoded string ve orphan çevirileri tek komutla yakala.
              </p>
            </div>
            {/* Mini terminal output — light theme */}
            <div className="mx-4 mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-[11px] leading-relaxed">
              <div className="text-gray-400">$ better-i18n doctor</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-green-500">████████████████</span>
                <span className="text-gray-300">░░░░</span>
                <span className="font-bold text-gray-900">82/100</span>
                <span className="rounded bg-green-100 px-1.5 text-[10px] font-semibold text-green-700">A</span>
              </div>
              <div className="mt-2 space-y-0.5 text-gray-500">
                <div><span className="text-green-500">✓</span> Coverage <span className="float-right text-gray-400">95</span></div>
                <div><span className="text-green-500">✓</span> Quality <span className="float-right text-gray-400">88</span></div>
                <div><span className="text-amber-500">!</span> Code <span className="float-right text-gray-400">72</span></div>
                <div><span className="text-green-500">✓</span> Structure <span className="float-right text-gray-400">100</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("quickstart.title")}>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("quickstart.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <CodeBlock
          showTabs={{ labels: ["npm", "bun"], codes: [npmCode, bunCode] }}
          filename="i18n.config.ts"
        />
      </section>

      {/* ── Why better-i18n ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("why.title")}>
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{t("why.title")}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
          {/* CDN */}
          <a href="https://docs.better-i18n.com" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Dashboard &rarr; CDN &rarr; App
            </span>
            <h3 className="text-base font-semibold group-hover:text-brand transition-colors">{t("why.cdn.title")}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("why.cdn.description")}</p>
          </a>

          {/* Frameworks */}
          <a href="https://docs.better-i18n.com/frameworks/nextjs" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50">
            <div className="flex gap-1.5">
              {["Next.js", "Expo", "Remix", "Hono", "TanStack"].map((fw) => (
                <span key={fw} className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">{fw}</span>
              ))}
            </div>
            <h3 className="text-base font-semibold group-hover:text-brand transition-colors">{t("why.frameworks.title")}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("why.frameworks.description")}</p>
          </a>

          {/* Dashboard */}
          <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50">
            <div className="w-fit rounded-md border bg-muted px-3 py-1.5 font-mono text-xs">
              <span className="text-brand">home.title</span> <span className="text-muted-foreground">&rarr;</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;Welcome&quot;</span>
            </div>
            <h3 className="text-base font-semibold group-hover:text-brand transition-colors">{t("why.dashboard.title")}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("why.dashboard.description")}</p>
          </a>

          {/* Open Source */}
          <a href="https://github.com/better-i18n" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <GithubIcon className="h-4 w-4 text-muted-foreground" />
              <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">MIT</span>
            </div>
            <h3 className="text-base font-semibold group-hover:text-brand transition-colors">{t("why.opensource.title")}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("why.opensource.description")}</p>
          </a>

          {/* Help Center */}
          <a href={`https://help.better-i18n.com/${locale}`} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50 sm:col-span-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">TanStack Start + CF Workers</span>
            </div>
            <h3 className="text-base font-semibold group-hover:text-brand transition-colors">{t("why.helpcenter.title")}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("why.helpcenter.description")}</p>
          </a>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24" aria-label={t("aria.cta")}>
        <div className="relative overflow-hidden rounded-2xl border bg-foreground px-8 py-16 text-center text-background">
          {/* Subtle dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />

          <h2 className="relative text-3xl font-bold tracking-tight">
            {t("bottomCta.title")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg opacity-70">
            {t("bottomCta.description")}
          </p>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2">
            {[t("chip.mit"), t("chip.typescript"), t("chip.vendor")].map((chip) => (
              <span key={chip} className="rounded-full border border-current/20 px-3 py-1 text-xs opacity-60">
                {chip}
              </span>
            ))}
          </div>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <a href="https://docs.better-i18n.com" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                {t("bottomCta.docs")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-current/20 bg-transparent text-background hover:bg-background/10">
              <a href="https://dash.better-i18n.com" target="_blank" rel="noopener noreferrer">
                <LayoutDashboard className="h-4 w-4" />
                {t("bottomCta.dashboard")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-current/20 bg-transparent text-background hover:bg-background/10">
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
