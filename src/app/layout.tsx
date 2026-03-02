import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js i18n Starter | better-i18n",
  description:
    "A production-ready Next.js starter with better-i18n for internationalization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
