"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import {
  defaultLocale,
  getDictionary,
  getDirection,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  direction: "ltr" | "rtl";
  dictionary: ReturnType<typeof getDictionary>;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(isLocale(initialLocale) ? initialLocale : defaultLocale);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      locale,
      direction: getDirection(locale),
      dictionary: getDictionary(locale),
      setLocale: (nextLocale) => {
        document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = nextLocale;
        document.documentElement.dir = getDirection(nextLocale);
        setLocaleState(nextLocale);
      },
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
