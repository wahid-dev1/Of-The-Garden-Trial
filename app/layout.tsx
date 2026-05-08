import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "@/app/providers";
import { CartNavLink } from "@/components/CartNavLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getDirection, getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/server";
import { getRequestTheme } from "@/lib/theme/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Of The Garden Trial | تجربة الحديقة",
  description: "A polished bilingual product ordering flow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const theme = await getRequestTheme();
  const direction = getDirection(locale);
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${theme === "dark" ? "dark " : ""}${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: theme }}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers locale={locale} theme={theme}>
          <div className="sticky top-0 z-20 border-b border-white/70 bg-background/75 backdrop-blur-xl dark:border-zinc-800/70">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
              <Link href="/products" className="group flex items-center gap-3 font-semibold tracking-tight">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-950 text-sm text-white shadow-sm transition group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                  G
                </span>
                <span>{dictionary.brand}</span>
              </Link>
              <nav className="flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Link
                  href="/products"
                  className="rounded-full px-3 py-2 hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-900"
                >
                  {dictionary.nav.products}
                </Link>
                <CartNavLink />
                <ThemeToggle />
                <LanguageSwitcher />
              </nav>
            </div>
          </div>
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
            {children}
          </main>
          <footer className="mx-auto w-full max-w-6xl px-4 pb-8 text-xs text-zinc-500 dark:text-zinc-400">
            {dictionary.brand} · {dictionary.productsPage.statSupport}
          </footer>
        </Providers>
      </body>
    </html>
  );
}
