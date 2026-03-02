import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");

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
        {(["ssr", "typesafe", "switcher"] as const).map((feature) => (
          <div
            key={feature}
            className="rounded-xl border border-gray-200 p-6 dark:border-gray-800"
          >
            <h3 className="text-lg font-semibold">{t(`features.${feature}.title`)}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t(`features.${feature}.description`)}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
