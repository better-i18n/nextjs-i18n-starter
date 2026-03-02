import { createI18n } from "@better-i18n/next";

export const i18n = createI18n({
  project:
    process.env.NEXT_PUBLIC_BETTER_I18N_PROJECT || "better-i18n/demo",
  defaultLocale: "en",
  localePrefix: "always",
  messagesRevalidateSeconds: 30,
  manifestRevalidateSeconds: 3600,
  timeZone: "UTC",
});
