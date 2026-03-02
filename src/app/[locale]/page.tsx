import { useTranslations } from "next-intl";
import { i18n } from "../../../i18n.config";

export default async function HomePage() {
  const locales = await i18n.getLocales();

  return <HomeContent locales={locales} />;
}

function HomeContent({ locales }: { locales: string[] }) {
  const t = useTranslations("home");

  const features = [
    {
      key: "ssr" as const,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
        </svg>
      ),
    },
    {
      key: "typesafe" as const,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      ),
    },
    {
      key: "switcher" as const,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {t("badge")}
        </span>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {locales.map((locale) => (
            <span
              key={locale}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-mono text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {locale}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="https://docs.better-i18n.com/frameworks/nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t("cta.docs")}
          </a>
          <a
            href="https://dash.better-i18n.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            {t("cta.dashboard")}
          </a>
        </div>
      </div>

      <section className="mt-24 grid gap-8 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="rounded-xl border border-gray-200 p-6 transition hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold">
              {t(`features.${feature.key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t(`features.${feature.key}.description`)}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-20 rounded-xl border border-gray-200 p-8 dark:border-gray-800">
        <h2 className="text-lg font-semibold">{t("quickstart.title")}</h2>
        <div className="mt-4 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-100">
          <pre>
            <code>{`npm install @better-i18n/next

# i18n.config.ts
import { createI18n } from "@better-i18n/next";

export const i18n = createI18n({
  project: "your-org/your-project",
  defaultLocale: "en",
});`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
