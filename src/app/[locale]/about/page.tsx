import { useTranslations } from "next-intl";
import { i18n } from "../../../../i18n.config";

export default async function AboutPage() {
  const locales = await i18n.getLocales();

  return <AboutContent locales={locales} />;
}

function AboutContent({ locales }: { locales: string[] }) {
  const t = useTranslations("about");

  const stack = [
    { name: "Next.js 15", detail: "App Router + Server Components" },
    { name: "@better-i18n/next", detail: "CDN-powered translations" },
    { name: "next-intl", detail: "Type-safe translation hooks" },
    { name: "Tailwind CSS 4", detail: "Utility-first styling" },
    { name: "TypeScript 5", detail: "Full type safety" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        {t("description")}
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("stack.title")}</h2>
        <div className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {stack.map((item) => (
            <div key={item.name} className="flex items-center justify-between px-4 py-3">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("howItWorks.title")}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {t("howItWorks.description")}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("locales.title")}</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t("locales.description")}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {locales.map((locale) => (
            <span
              key={locale}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium dark:border-gray-800"
            >
              {locale}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
