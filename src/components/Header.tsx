"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="text-lg font-bold">
            better-i18n
          </Link>
          <nav className="hidden gap-6 sm:flex">
            <Link
              href={`/${locale}`}
              className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {t("about")}
            </Link>
          </nav>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
