import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { toOgLocale } from "@/i18n/locale-map";
import { FeaturesContent } from "@/components/FeaturesContent";

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

export default function FeaturesPage() {
  return <FeaturesContent />;
}
