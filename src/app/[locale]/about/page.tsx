import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        {t("description")}
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("stack.title")}</h2>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>Next.js 15 — App Router</li>
          <li>React 19 — Server Components</li>
          <li>@better-i18n/next — Translations</li>
          <li>Tailwind CSS 4 — Styling</li>
          <li>TypeScript 5 — Type Safety</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("howItWorks.title")}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {t("howItWorks.description")}
        </p>
      </section>
    </div>
  );
}
