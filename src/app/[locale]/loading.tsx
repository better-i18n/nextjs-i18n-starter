"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const t = useTranslations("site");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{t("loading")}</p>
    </div>
  );
}
