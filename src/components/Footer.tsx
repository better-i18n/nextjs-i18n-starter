import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{t("powered")}</p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <a
            href="https://better-i18n.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gray-700 dark:hover:text-gray-200"
          >
            better-i18n.com
          </a>
          <a
            href="https://docs.better-i18n.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gray-700 dark:hover:text-gray-200"
          >
            {t("docs")}
          </a>
          <a
            href="https://github.com/better-i18n/nextjs-i18n-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gray-700 dark:hover:text-gray-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
