import { createI18n } from "@better-i18n/next";

export const i18n = createI18n({
  project:
    process.env.NEXT_PUBLIC_BETTER_I18N_PROJECT || "better-i18n/demo",
  defaultLocale: "en",
  localePrefix: "always",
  timeZone: "UTC",
});

// Exported separately so the CLI can read lint config without executing createI18n
export const i18nConfig = {
  project:
    process.env.NEXT_PUBLIC_BETTER_I18N_PROJECT || "better-i18n/demo",
  defaultLocale: "en",

  lint: {
    exclude: ["**/opengraph-image.tsx"],
    ignoreStrings: [
      // Brand names
      "better-i18n",
      "Better I18N",
      "Better i18n",
      "Next.js i18n Starter",
      "better-i18n.com",
      // Code identifiers shown in code blocks / terminal UI
      "i18n.config.ts",
      "middleware.ts",
      "useTranslations()",
      "getTranslations()",
      "useSetLocale()",
      "useFormatter()",
      "LocaleDropdown",
      "BetterI18nProvider",
      "createI18n()",
      "betterMiddleware()",
      // Framework names (proper nouns in table headers)
      "Next.js",
      "Expo",
      "Remix",
      "Hono",
      "TanStack",
      // Accessibility labels for demo components
      "Decrease",
      "Increase",
      // Decorative terminal UI / code preview strings
      "████████████████",
      "░░░░",
      "82/100",
      "home.title",
      "TanStack Start + CF Workers",
      "Dashboard → CDN → App",
      "MIT",
    ],
    ignorePatterns: [
      /^@better-i18n\//, // package names
      /^https?:\/\//, // URLs
      /^npx\s/, // CLI commands
      /^bun\s/, // CLI commands
      /^npm\s/, // CLI commands
      /^\$\s/, // terminal prompts
      /^#\s/, // config file comments in code blocks
    ],
  },
};
