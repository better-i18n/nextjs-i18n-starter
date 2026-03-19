"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleDropdown } from "@better-i18n/next/client";
import { i18n } from "../../i18n.config";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/features`, label: t("features") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/demos`, label: t("demos") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 transition-[border-color] ${scrolled ? "border-b border-gray-200 dark:border-gray-800" : "border-b border-transparent"}`}>
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-lg font-bold"
          >
            <Image
              src="/brand/logo.svg"
              alt="better-i18n"
              width={24}
              height={24}
            />
            Better I18N
          </Link>
          <nav className="hidden gap-6 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition hover:underline hover:underline-offset-4 ${
                  isActive(link.href)
                    ? "font-medium text-gray-900 dark:text-gray-100"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleDropdown config={i18n.config} locale={locale} />
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex h-8 px-3 text-xs bg-brand text-white hover:bg-brand/90">
            <a href="https://docs.better-i18n.com/frameworks/nextjs" target="_blank" rel="noopener noreferrer">
              {t("getStarted")}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-gray-200 px-6 py-4 sm:hidden dark:border-gray-800">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition hover:underline hover:underline-offset-4 ${
                  isActive(link.href)
                    ? "font-medium text-gray-900 dark:text-gray-100"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
            <LocaleDropdown config={i18n.config} locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
