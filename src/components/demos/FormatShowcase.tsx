"use client";

import { useTranslations, useLocale, useFormatter } from "next-intl";
import { Badge } from "@/components/ui/badge";

export function FormatShowcase() {
  const t = useTranslations("demos");
  const locale = useLocale();
  const format = useFormatter();

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const formattedCurrency = format.number(1234567.89, {
    style: "currency",
    currency: "USD",
  });

  const formattedDate = format.dateTime(now, {
    dateStyle: "full",
  });

  const formattedRelative = format.relativeTime(oneWeekAgo);

  const columns = [
    {
      label: t("format.number"),
      value: formattedCurrency,
      code: 'format.number(1234567.89, { style: "currency", currency: "USD" })',
    },
    {
      label: t("format.date"),
      value: formattedDate,
      code: 'format.dateTime(now, { dateStyle: "full" })',
    },
    {
      label: t("format.relative"),
      value: formattedRelative,
      code: "format.relativeTime(oneWeekAgo)",
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-8">
      <h3 className="text-xl font-semibold">{t("format.title")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("format.description")}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.label} className="rounded-xl bg-muted p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {col.label}
            </p>
            <p className="mt-2 text-xl font-bold">{col.value}</p>
            <Badge variant="secondary" className="mt-3 font-mono text-[10px]">
              {col.code}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Badge variant="outline" className="font-mono text-xs">{locale}</Badge>
        <span className="text-xs text-muted-foreground">
          {t("interpolation.localeHint")}
        </span>
      </div>
    </div>
  );
}
