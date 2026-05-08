"use client";

import { CartProvider } from "@/lib/cart/cartStore";
import { LanguageProvider } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme/client";
import type { Theme } from "@/lib/theme";

export function Providers({
  children,
  locale,
  theme,
}: {
  children: React.ReactNode;
  locale: Locale;
  theme: Theme;
}) {
  return (
    <ThemeProvider initialTheme={theme}>
      <LanguageProvider initialLocale={locale}>
        <CartProvider>{children}</CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

