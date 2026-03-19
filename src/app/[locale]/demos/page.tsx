import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { toOgLocale } from "@/i18n/locale-map";
import { DemosContent } from "./demos-content";

interface DemosPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: DemosPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nextjs-i18n-starter.vercel.app";
  const t = await getTranslations({ locale, namespace: "demos" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${baseUrl}/${locale}/demos`,
      siteName: "better-i18n",
      locale: toOgLocale(locale),
      type: "website",
    },
  };
}

export default function DemosPage() {
  return <DemosContent />;
}
