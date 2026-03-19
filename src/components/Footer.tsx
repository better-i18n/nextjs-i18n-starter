import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, BookOpen, ExternalLink, ArrowUpRight, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function FooterLink({
  href,
  children,
  icon,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {external && (
        <ArrowUpRight className="ml-0.5 h-3 w-3 flex-shrink-0 opacity-50" />
      )}
    </a>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/logo.svg"
                alt="better-i18n"
                width={20}
                height={20}
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                better-i18n
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {t("powered")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/better-i18n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
                aria-label={t("github")}
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product column */}
          <FooterColumn title={t("product")}>
            <FooterLink
              href="https://better-i18n.com"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              better-i18n.com
            </FooterLink>
            <FooterLink
              href="https://dash.better-i18n.com"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              {t("dashboard")}
            </FooterLink>
            <FooterLink
              href="https://better-i18n.com/#pricing"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              {t("pricing")}
            </FooterLink>
            <Link
              href="/demos"
              className="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t("demos")}
            </Link>
          </FooterColumn>

          {/* Developers column */}
          <FooterColumn title={t("developers")}>
            <FooterLink
              href="https://docs.better-i18n.com"
              icon={<BookOpen className="h-3.5 w-3.5" />}
            >
              {t("docs")}
            </FooterLink>
            <FooterLink
              href="https://docs.better-i18n.com/frameworks/nextjs"
              icon={<BookOpen className="h-3.5 w-3.5" />}
            >
              {t("nextjsGuide")}
            </FooterLink>
            <FooterLink
              href="https://docs.better-i18n.com/frameworks/nextjs/api-reference"
              icon={<BookOpen className="h-3.5 w-3.5" />}
            >
              {t("apiReference")}
            </FooterLink>
            <FooterLink
              href="https://github.com/better-i18n"
              icon={<Github className="h-3.5 w-3.5" />}
            >
              {t("github")}
            </FooterLink>
          </FooterColumn>

          {/* Resources column */}
          <FooterColumn title={t("resources")}>
            <FooterLink
              href="https://better-i18n.com/blog"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              {t("blog")}
            </FooterLink>
            <FooterLink
              href="https://better-i18n.com/changelog"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              {t("changelog")}
            </FooterLink>
            <FooterLink
              href="https://help.better-i18n.com"
              icon={<BookOpen className="h-3.5 w-3.5" />}
            >
              {t("helpCenter")}
            </FooterLink>
          </FooterColumn>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <Globe className="h-3 w-3" />
              {t("languages", { count: 15 })}
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <Image
                src="/brand/logo.svg"
                alt="better-i18n"
                width={14}
                height={14}
              />
              {t("builtWith")}
            </div>
            <span className="text-xs text-gray-400">{t("version")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
