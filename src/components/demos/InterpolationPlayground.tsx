"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";

export function InterpolationPlayground() {
  const t = useTranslations("demos");
  const locale = useLocale();
  const [name, setName] = useState("World");

  return (
    <div className="rounded-2xl border bg-card p-8">
      <h3 className="text-xl font-semibold">{t("interpolation.title")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("interpolation.description")}</p>

      <div className="mt-8 space-y-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("interpolation.placeholder")}
          className="w-full rounded-lg border bg-background px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand"
        />

        <div className="rounded-xl bg-muted p-6">
          <p className="text-2xl font-semibold">
            {t("interpolation.greeting", { name: name || "..." })}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">{locale}</Badge>
            <span className="text-xs text-muted-foreground">{t("interpolation.localeHint")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
