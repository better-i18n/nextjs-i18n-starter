"use client";

import { useLocale } from "next-intl";
import { useSetLocale, useManifestLanguages } from "@better-i18n/next/client";
import { i18n } from "../../i18n.config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const { languages, isLoading } = useManifestLanguages(i18n);

  if (isLoading) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    );
  }

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.nativeName || lang.code}
        </option>
      ))}
    </select>
  );
}
