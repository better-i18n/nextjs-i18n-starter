# Next.js i18n Starter

A production-ready Next.js 15 starter template with [better-i18n](https://better-i18n.com) for internationalization.

## Features

- **Next.js 15** — App Router with Server Components
- **better-i18n SDK** — Cloud-managed translations with CDN delivery
- **Instant locale switching** — Client-side re-render, no full page reload
- **Dynamic language discovery** — Languages auto-sync from your dashboard
- **SSR translations** — Pre-loaded server-side, no flash of untranslated content
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

### 4. Add translations

In your better-i18n dashboard, add translation keys matching the namespaces used in the app:

**`home` namespace:**
| Key | English |
|-----|---------|
| `home.badge` | Next.js i18n Starter |
| `home.title` | Build multilingual apps with ease |
| `home.description` | A production-ready starter template with better-i18n for Next.js App Router. |
| `home.cta.docs` | Read the Docs |
| `home.cta.dashboard` | Open Dashboard |
| `home.features.ssr.title` | Server-Side Rendering |
| `home.features.ssr.description` | Translations are loaded server-side for instant page loads with no flash of untranslated content. |
| `home.features.typesafe.title` | Type-Safe Keys |
| `home.features.typesafe.description` | TypeScript types for your translation keys catch errors at build time, not runtime. |
| `home.features.switcher.title` | Instant Switching |
| `home.features.switcher.description` | Switch languages client-side without a full page reload using the better-i18n provider. |

**`nav` namespace:**
| Key | English |
|-----|---------|
| `nav.home` | Home |
| `nav.about` | About |

**`about` namespace:**
| Key | English |
|-----|---------|
| `about.title` | About This Starter |
| `about.description` | This is a starter template demonstrating how to use better-i18n with Next.js App Router for building multilingual applications. |
| `about.stack.title` | Tech Stack |
| `about.howItWorks.title` | How It Works |
| `about.howItWorks.description` | Translations are managed in the better-i18n dashboard and delivered via CDN. The middleware detects the user's locale from the URL, cookie, or browser language. Messages are loaded server-side and passed to the BetterI18nProvider for client components. |

**`footer` namespace:**
| Key | English |
|-----|---------|
| `footer.powered` | Powered by better-i18n |
| `footer.docs` | Documentation |

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── i18n.config.ts              # better-i18n configuration
├── middleware.ts                # Locale detection middleware
├── src/
│   ├── i18n/
│   │   └── request.ts          # next-intl request handler
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Tailwind imports
│   │   └── [locale]/
│   │       ├── layout.tsx      # Locale layout with BetterI18nProvider
│   │       ├── page.tsx        # Home page
│   │       └── about/
│   │           └── page.tsx    # About page
│   └── components/
│       ├── Header.tsx          # Navigation with language switcher
│       ├── LanguageSwitcher.tsx # Dynamic language picker
│       └── Footer.tsx          # Footer with links
```

## Key Concepts

### Locale Routing

The middleware handles locale detection with this priority:

1. URL path (`/tr/about` → Turkish)
2. Locale cookie
3. `Accept-Language` header
4. Default locale (`en`)

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

Languages are fetched from the CDN manifest — add a language in the dashboard and it automatically appears in the switcher.

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
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)

## License

MIT
