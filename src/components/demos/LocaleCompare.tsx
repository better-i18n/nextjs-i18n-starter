"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";

const CDN_BASE = "https://cdn.better-i18n.com/better-i18n/demo";

// Simple TtlCache for fetched translations
const cache = new Map<string, { data: Record<string, string>; expires: number }>();

async function fetchTranslations(locale: string): Promise<Record<string, string>> {
  const cacheKey = locale;
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return cached.data;

  const res = await fetch(`${CDN_BASE}/${locale}/home.json`);
  if (!res.ok) throw new Error(`Failed to fetch ${locale}`);
  const data = await res.json();
  cache.set(cacheKey, { data, expires: Date.now() + 5 * 60 * 1000 });
  return data;
}

const LOCALES = ["en", "tr", "de", "es", "fr", "ja", "ko", "ar", "ru", "pt", "it", "nl", "hi", "pl", "zh-hans"];

export function LocaleCompare() {
  const t = useTranslations("demos");
  const currentLocale = useLocale();

  const [leftLocale, setLeftLocale] = useState("en");
  const [rightLocale, setRightLocale] = useState(currentLocale === "en" ? "tr" : currentLocale);
  const [leftData, setLeftData] = useState<Record<string, string> | null>(null);
  const [rightData, setRightData] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchTranslations(leftLocale), fetchTranslations(rightLocale)])
      .then(([left, right]) => {
        setLeftData(left);
        setRightData(right);
      })
      .finally(() => setLoading(false));
  }, [leftLocale, rightLocale]);

  const keys = leftData ? Object.keys(leftData).slice(0, 8) : [];

  return (
    <div className="rounded-2xl border bg-card p-8">
      <h3 className="text-xl font-semibold">{t("compare.title")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("compare.description")}</p>

      <div className="mt-6 flex gap-4">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {t("compare.left")}
          </label>
          <select
            value={leftLocale}
            onChange={(e) => setLeftLocale(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {t("compare.right")}
          </label>
          <select
            value={rightLocale}
            onChange={(e) => setRightLocale(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">{t("compare.key")}</th>
                <th className="px-4 py-2.5 text-left font-medium">
                  <Badge variant="outline" className="font-mono text-xs">{leftLocale}</Badge>
                </th>
                <th className="px-4 py-2.5 text-left font-medium">
                  <Badge variant="outline" className="font-mono text-xs">{rightLocale}</Badge>
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr key={key} className="border-b last:border-0">
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{key}</td>
                  <td className="px-4 py-2.5">{leftData?.[key]}</td>
                  <td className="px-4 py-2.5">{rightData?.[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
