# Next.js i18n Starter

A production-ready Next.js 15 starter template with [better-i18n](https://better-i18n.com) for internationalization.

## Features

- **Next.js 15** — App Router with Server Components
- **better-i18n SDK** — Cloud-managed translations with CDN delivery
- **Instant locale switching** — Client-side re-render, no full page reload
- **Dynamic language discovery** — Languages auto-sync from your dashboard
- **SSR translations** — Pre-loaded server-side, no flash of untranslated content
- **Server APIs** — `getLocales()` and `getMessages()` for server components
- **Tailwind CSS 4** — Utility-first styling
- **TypeScript** — Full type safety

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/better-i18n/nextjs-i18n-starter.git
cd nextjs-i18n-starter
npm install
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

```
NEXT_PUBLIC_BETTER_I18N_PROJECT=your-org/your-project
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

## Project Structure

```
├── i18n.config.ts              # better-i18n configuration (createI18n)
├── middleware.ts                # Locale detection middleware (betterMiddleware)
├── src/
│   ├── i18n/
│   │   └── request.ts          # next-intl request handler (requestConfig)
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Tailwind imports
│   │   └── [locale]/
│   │       ├── layout.tsx      # BetterI18nProvider + getMessages()
│   │       ├── page.tsx        # Home — useTranslations + getLocales()
│   │       └── about/
│   │           └── page.tsx    # About — useTranslations + getLocales()
│   └── components/
│       ├── Header.tsx          # Navigation with language switcher
│       ├── LanguageSwitcher.tsx # useSetLocale + useManifestLanguages
│       └── Footer.tsx          # Footer with links
```

## SDK Features Showcased

| Feature | File | API |
|---------|------|-----|
| Config | `i18n.config.ts` | `createI18n()` |
| Middleware | `middleware.ts` | `i18n.betterMiddleware()` |
| Provider | `[locale]/layout.tsx` | `BetterI18nProvider config={i18n.config}` |
| Server messages | `[locale]/layout.tsx` | `i18n.getMessages(locale)` |
| Server locales | `[locale]/page.tsx` | `i18n.getLocales()` |
| Translations | `page.tsx`, `about/page.tsx` | `useTranslations("namespace")` |
| Locale switching | `LanguageSwitcher.tsx` | `useSetLocale()` |
| Language discovery | `LanguageSwitcher.tsx` | `useManifestLanguages(i18n.config)` |
| Request config | `src/i18n/request.ts` | `i18n.requestConfig` |

## Key Concepts

### Locale Routing (`localePrefix: "always"`)

All URLs include the locale prefix:

- `/en` — English home page
- `/en/about` — English about page
- `/tr/about` — Turkish about page

The middleware redirects `/` to `/en` automatically.

### Server-Side Messages

Translations are loaded server-side in `[locale]/layout.tsx`:

```tsx
const messages = await i18n.getMessages(locale);
```

### Client-Side Switching

The `LanguageSwitcher` uses `useSetLocale()` for instant locale changes:

```tsx
const setLocale = useSetLocale();
setLocale("tr"); // Instant switch, no page reload
```

### Dynamic Languages

Languages are fetched from the CDN manifest — add a language in the dashboard and it automatically appears in the switcher:

```tsx
const { languages, isLoading } = useManifestLanguages(i18n.config);
```

### Server-Side APIs

Server components can fetch available locales directly:

```tsx
const locales = await i18n.getLocales();
// ["en", "tr", "de", "es"]
```

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbetter-i18n%2Fnextjs-i18n-starter&env=NEXT_PUBLIC_BETTER_I18N_PROJECT&envDescription=Your%20better-i18n%20project%20identifier&envLink=https%3A%2F%2Fdash.better-i18n.com)

### Other Platforms

Set the `NEXT_PUBLIC_BETTER_I18N_PROJECT` environment variable and run:

```bash
npm run build
npm start
```

## Learn More

- [better-i18n Documentation](https://docs.better-i18n.com)
- [Next.js Integration Guide](https://docs.better-i18n.com/frameworks/nextjs)
- [Middleware Configuration](https://docs.better-i18n.com/frameworks/nextjs/middleware)
- [Client-Side Features](https://docs.better-i18n.com/frameworks/nextjs/client)
- [API Reference](https://docs.better-i18n.com/frameworks/nextjs/api-reference)

## License

MIT
