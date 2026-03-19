import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getTranslations } from "next-intl/server";
import { BetterI18nProvider } from "@better-i18n/next/client";
import { i18n } from "../../../i18n.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HreflangTags } from "@/components/HreflangTags";
import { WebsiteSchema } from "@/components/WebsiteSchema";
import { toOgLocale } from "@/i18n/locale-map";


export async function generateStaticParams() {
  const locales = await i18n.getLocales();
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const locales = await i18n.getLocales();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nextjs-i18n-starter.vercel.app";
  const t = await getTranslations({ locale, namespace: "site" });

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    title: {
      template: "%s | better-i18n",
      default: t("meta.defaultTitle"),
    },
    description: t("meta.description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: t("meta.defaultTitle"),
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
      title: t("meta.defaultTitle"),
      description: t("meta.description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "better-i18n", url: "https://better-i18n.com" }],
    creator: "better-i18n",
    publisher: "better-i18n",
    other: {
      "theme-color": "#2563eb",
    },
    icons: {
      icon: "/logo.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await i18n.getMessages(locale);
  const t = await getTranslations({ locale, namespace: "site" });

  return (
    <html lang={locale}>
      <head>
        <meta name="google-site-verification" content="mZC-3cXTXzjaW84bH0kXnrxiSeNmAFnkNmRDukfludA" />
        <link rel="preconnect" href="https://cdn.better-i18n.com" />
        <HreflangTags locale={locale} path="" />
        <WebsiteSchema locale={locale} name={t("schema.name")} description={t("schema.description")} />
      </head>
      <body className={`${GeistSans.className} min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100`} style={{ "--font-mono": GeistMono.style.fontFamily } as React.CSSProperties}>
        <BetterI18nProvider
          config={i18n.config}
          locale={locale}
          messages={messages}
          timeZone="UTC"
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </BetterI18nProvider>
      </body>
    </html>
  );
}
