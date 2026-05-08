"use client";

import { useRouter } from "next/navigation";

import { type Locale } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n/client";

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale, dictionary, setLocale } = useLanguage();
  const nextLocale: Locale = locale === "ar" ? "en" : "ar";

  function switchLanguage() {
    setLocale(nextLocale);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 px-3 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-100 dark:hover:bg-zinc-900"
      aria-label={dictionary.nav.language}
    >
      {locale === "ar" ? dictionary.nav.switchToEnglish : dictionary.nav.switchToArabic}
    </button>
  );
}
