import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { i18n } from "../../../i18n.config";
import { toOgLocale } from "@/i18n/locale-map";
import { HomeContent } from "@/components/HomeContent";

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
