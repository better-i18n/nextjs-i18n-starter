# Next.js i18n Starter

A production-ready Next.js 15 starter template with [Better I18N](https://better-i18n.com) for internationalization.

**Live demo:** [nextjs-i18n-starter.vercel.app](https://nextjs-i18n-starter.vercel.app)

## Features

- **Next.js 15** — App Router with Server Components
- **Better I18N SDK** (`@better-i18n/next@0.7.0`) — Cloud-managed translations with CDN delivery
- **Instant locale switching** — Client-side URL navigation + message fetch, no full page reload
- **Dynamic language discovery** — Languages auto-sync from your dashboard
- **SSR translations** — Pre-loaded server-side, no flash of untranslated content
- **Webhook revalidation** — Auto-revalidate ISR cache when translations are published
- **i18n Doctor CLI** — Health score, coverage audit, and CI/CD integration
- **15 locales** — EN, TR, DE, ES, FR, JA, KO, AR, RU, PT, IT, NL, HI, PL, ZH
- **Tailwind CSS 4** — Utility-first styling, light theme
- **TypeScript** — Full type safety

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/better-i18n/nextjs-i18n-starter.git
cd nextjs-i18n-starter
bun install
```

### 2. Set up your project

1. Create a free account at [dash.better-i18n.com](https://dash.better-i18n.com)
2. Create a new project and add your languages
3. Copy your project identifier (e.g. `your-org/your-project`)

### 3. Configure

```bash
cp .env.example .env
```

Edit `.env`:

```bash
NEXT_PUBLIC_BETTER_I18N_PROJECT=your-org/your-project
BETTER_I18N_WEBHOOK_SECRET=whsec_...  # Optional: for webhook revalidation
```

### 4. Run

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

## Project Structure

```
├── i18n.config.ts                  # Better I18N configuration (createI18n)
├── middleware.ts                    # Locale detection middleware (betterMiddleware)
├── src/
│   ├── i18n/
│   │   └── request.ts             # next-intl request handler
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Tailwind imports
│   │   ├── api/i18n/revalidate/
│   │   │   └── route.ts          # Webhook endpoint for ISR revalidation
│   │   └── [locale]/
│   │       ├── layout.tsx         # BetterI18nProvider + getMessages()
│   │       ├── page.tsx           # Home — format demos, CLI showcase
│   │       ├── about/page.tsx     # About — CDN architecture, SDK APIs
│   │       ├── features/page.tsx  # Features — full feature breakdown
│   │       └── demos/page.tsx     # Demos — plurals, interpolation, RTL
│   └── components/
│       ├── Header.tsx             # Navigation with LocaleDropdown
│       ├── Footer.tsx             # Footer with locale-aware links
│       ├── CodeBlock.tsx          # Syntax-highlighted code blocks
│       └── demos/
│           ├── FormatBentoDemo.tsx # Currency/date/relative time across locales
│           ├── PluralCounterDemo.tsx
│           ├── FormatShowcase.tsx
│           └── LocaleCompare.tsx
```

## SDK Features Showcased

| Feature | File | API |
|---------|------|-----|
| Config | `i18n.config.ts` | `createI18n()` |
| Middleware | `middleware.ts` | `i18n.betterMiddleware()` |
| Provider | `[locale]/layout.tsx` | `BetterI18nProvider` |
| Server messages | `[locale]/layout.tsx` | `i18n.getMessages(locale)` |
| Server locales | `[locale]/page.tsx` | `i18n.getLocales()` |
| Translations | Components | `useTranslations("namespace")` |
| Locale switching | `LocaleDropdown` | `useSetLocale()` + `router.replace()` |
| Language discovery | `LocaleDropdown` | `useManifestLanguages()` |
| Webhook revalidation | `api/i18n/revalidate/route.ts` | `createRevalidateHandler()` |
| Request config | `src/i18n/request.ts` | `i18n.requestConfig` |

## Webhook Revalidation

When translations are published in the dashboard, a webhook triggers ISR cache revalidation so your production site shows fresh translations instantly.

### Setup

1. Go to your project in the Better I18N dashboard → **Integrations** → **Webhooks**
2. Add endpoint: `https://your-domain.com/api/i18n/revalidate`
3. Select **Published** event
4. Copy the webhook secret to your environment:

```bash
BETTER_I18N_WEBHOOK_SECRET=whsec_your_secret_here
```

The handler verifies HMAC-SHA256 signatures and calls `revalidatePath("/", "layout")` + `revalidateTag("i18n-messages")`.

```ts
// app/api/i18n/revalidate/route.ts
import { createRevalidateHandler } from "@better-i18n/next/revalidate";

export const POST = createRevalidateHandler({
  secret: process.env.BETTER_I18N_WEBHOOK_SECRET!,
});
```

## i18n Doctor CLI

Run a full health check on your i18n setup — detect hardcoded strings, missing translations, and orphan keys:

```bash
npx @better-i18n/cli doctor
```

```
████████████████░░░░ 82/100  A

✓ Coverage     95
✓ Quality      88
! Code         72
✓ Structure   100
```

Use `--ci` to enforce a minimum score in your CI/CD pipeline. Results can be uploaded to the dashboard with `--report`.

## Key Concepts

### Locale Routing (`localePrefix: "always"`)

All URLs include the locale prefix:

- `/en` — English
- `/tr` — Turkish
- `/de/about` — German about page

The middleware redirects `/` to `/{defaultLocale}` automatically.

### Server-Side Messages

Translations are loaded server-side in `[locale]/layout.tsx`:

```tsx
const messages = await i18n.getMessages(locale);
```

### Client-Side Switching

The `LocaleDropdown` uses `useSetLocale()` for instant locale changes with URL navigation:

```tsx
const setLocale = useSetLocale();
setLocale("tr"); // Updates cookie + messages + URL (/en → /tr)
```

### Dynamic Languages

Languages are fetched from the CDN manifest — add a language in the dashboard and it automatically appears in the switcher:

```tsx
const { languages, isLoading } = useManifestLanguages(i18n.config);
```

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbetter-i18n%2Fnextjs-i18n-starter&env=NEXT_PUBLIC_BETTER_I18N_PROJECT,BETTER_I18N_WEBHOOK_SECRET&envDescription=Your%20better-i18n%20project%20identifier%20and%20webhook%20secret&envLink=https%3A%2F%2Fdash.better-i18n.com)

### Other Platforms

Set environment variables and run:

```bash
bun run build
bun start
```

## Learn More

- [Better I18N Documentation](https://docs.better-i18n.com)
- [Next.js Integration Guide](https://docs.better-i18n.com/frameworks/nextjs)
- [CLI Documentation](https://docs.better-i18n.com/cli)
- [Help Center](https://help.better-i18n.com)

## License

MIT
