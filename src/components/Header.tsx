"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function navigate(path: string) {
    const localePath = locale === "en" ? path : `/${locale}${path}`;
    router.push(localePath);
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-bold"
          >
            better-i18n
          </button>
          <nav className="hidden gap-6 sm:flex">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {t("home")}
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {t("about")}
            </button>
          </nav>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
