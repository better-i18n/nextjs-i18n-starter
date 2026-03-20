"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";

// ─── Constants ──────────────────────────────────────────────────────

const SAMPLE_NUMBER = 1_234_567.89;
const SAMPLE_DATE = new Date("2026-03-19T14:30:00Z");

const SWAP_LOCALES = [
  "ja", "ar", "ko", "ru", "zh-hans", "hi", "pl", "pt", "it", "nl",
] as const;

const RTL_LOCALES = new Set(["ar", "he"]);

const LOCALE_LABELS: Record<string, string> = {
  en: "en-US", de: "de-DE", tr: "tr-TR", es: "es-ES", fr: "fr-FR",
  ja: "ja-JP", ar: "ar-SA", ko: "ko-KR", ru: "ru-RU", "zh-hans": "zh-CN",
  hi: "hi-IN", pl: "pl-PL", pt: "pt-BR", it: "it-IT", nl: "nl-NL",
};

const CURRENCY_MAP: Record<string, string> = {
  en: "USD", de: "EUR", tr: "TRY", es: "EUR", fr: "EUR",
  ja: "JPY", ar: "SAR", ko: "KRW", ru: "RUB", "zh-hans": "CNY",
  hi: "INR", pl: "PLN", pt: "BRL", it: "EUR", nl: "EUR",
};

// ─── Intl formatting (works for any locale without CDN fetch) ───────

function formatForLocale(locale: string) {
  const resolvedLocale = locale === "zh-hans" ? "zh-CN" : locale;
  const currency = CURRENCY_MAP[locale] ?? "USD";

  const number = new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
  }).format(SAMPLE_NUMBER);

  const date = new Intl.DateTimeFormat(resolvedLocale, {
    dateStyle: "medium",
  }).format(SAMPLE_DATE);

  const rtf = new Intl.RelativeTimeFormat(resolvedLocale, { numeric: "auto" });
  const relative = rtf.format(-7, "day");

  return { number, date, relative };
}

// ─── Component ──────────────────────────────────────────────────────

export function FormatBentoDemo() {
  const currentLocale = useLocale();

  // Fixed first two columns based on current locale
  const col1Locale: string = "en";
  const col2Locale: string = currentLocale === "en" ? "de" : currentLocale;

  // Third column is swappable
  const [col3Locale, setCol3Locale] = useState(() => {
    const defaults = ["ja", "ar", "ko"];
    return defaults.find((l) => l !== currentLocale && l !== col1Locale) ?? "ja";
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Format data for all three columns (sync — no CDN fetch needed)
  const col1 = formatForLocale(col1Locale);
  const col2 = formatForLocale(col2Locale);
  const col3 = formatForLocale(col3Locale);

  const isRtl = RTL_LOCALES.has(col3Locale);

  const handleSwap = useCallback((locale: string) => {
    setFadeIn(true);
    setCol3Locale(locale);
    setDropdownOpen(false);
    setTimeout(() => setFadeIn(false), 300);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-format-dropdown]")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const availableSwapLocales = SWAP_LOCALES.filter(
    (l) => l !== col2Locale,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Format Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/80">
              <th className="w-8 px-3 py-2.5 text-left font-normal text-gray-400" />
              <th className="px-3 py-2.5 text-left">
                <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-medium text-gray-600">
                  {LOCALE_LABELS[col1Locale] ?? col1Locale}
                </span>
              </th>
              <th className="px-3 py-2.5 text-left">
                <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-medium text-gray-600">
                  {LOCALE_LABELS[col2Locale] ?? col2Locale}
                </span>
              </th>
              <th className="px-3 py-2.5 text-left">
                <div className="relative inline-flex items-center gap-1.5" data-format-dropdown>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-mono text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                  >
                    {LOCALE_LABELS[col3Locale] ?? col3Locale}
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                    </svg>
                  </button>
                  {isRtl && (
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600">
                      RTL
                    </span>
                  )}
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-28 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      {availableSwapLocales.map((l) => (
                        <button
                          key={l}
                          onClick={() => handleSwap(l)}
                          className={`flex w-full items-center px-3 py-1.5 text-left font-mono text-xs transition hover:bg-gray-50 ${
                            l === col3Locale ? "bg-blue-50 text-blue-700" : "text-gray-600"
                          }`}
                        >
                          {LOCALE_LABELS[l] ?? l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr className="group">
              <td className="px-3 py-3 text-gray-300">$</td>
              <td className="px-3 py-3 font-medium tabular-nums text-gray-900">{col1.number}</td>
              <td className="px-3 py-3 font-medium tabular-nums text-gray-900">{col2.number}</td>
              <td className={`px-3 py-3 font-medium tabular-nums text-gray-900 transition-opacity duration-300 ${fadeIn ? "opacity-0" : "opacity-100"} ${isRtl ? "text-right" : ""}`}>
                {col3.number}
              </td>
            </tr>
            <tr className="group">
              <td className="px-3 py-3 text-gray-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </td>
              <td className="px-3 py-3 text-gray-700">{col1.date}</td>
              <td className="px-3 py-3 text-gray-700">{col2.date}</td>
              <td className={`px-3 py-3 text-gray-700 transition-opacity duration-300 ${fadeIn ? "opacity-0" : "opacity-100"} ${isRtl ? "text-right" : ""}`}>
                {col3.date}
              </td>
            </tr>
            <tr className="group">
              <td className="px-3 py-3 text-gray-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </td>
              <td className="px-3 py-3 text-gray-500 italic">{col1.relative}</td>
              <td className="px-3 py-3 text-gray-500 italic">{col2.relative}</td>
              <td className={`px-3 py-3 text-gray-500 italic transition-opacity duration-300 ${fadeIn ? "opacity-0" : "opacity-100"} ${isRtl ? "text-right" : ""}`}>
                {col3.relative}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Code hint */}
      {/* // i18n-ignore */}
      <div className="rounded-lg bg-gray-50 px-3 py-2">
        <code className="font-mono text-[11px] text-gray-500">
          {/* // i18n-ignore */}
          format.number(1234567.89, {"{"} style: &quot;currency&quot; {"}"})
        </code>
      </div>
    </div>
  );
}
