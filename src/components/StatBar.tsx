import { useTranslations } from "next-intl";

interface StatBarProps {
  localeCount: number;
}

export function StatBar({ localeCount }: StatBarProps) {
  const t = useTranslations("home");

  const stats = [
    { value: String(localeCount), label: t("stats.locales", { count: localeCount }) },
    { value: "5", label: t("stats.fallback") },
    { value: "30s", label: t("stats.isr") },
    { value: "<1ms", label: t("stats.switch") },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border bg-card p-4 text-center">
          <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
