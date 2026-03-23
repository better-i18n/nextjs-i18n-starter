"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("site");
  const locale = useLocale();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl font-semibold">{t("notFound.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("notFound.description")}
        </p>
      </div>
      <Button asChild>
        <Link href={`/${locale}`}>{t("notFound.goHome")}</Link>
      </Button>
    </div>
  );
}
