import { BetterI18nProvider } from "@better-i18n/next/client";
import { i18n } from "../../../i18n.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await i18n.getMessages(locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <BetterI18nProvider
          config={i18n}
          locale={locale}
          messages={messages}
          timeZone="UTC"
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </BetterI18nProvider>
      </body>
    </html>
  );
}
