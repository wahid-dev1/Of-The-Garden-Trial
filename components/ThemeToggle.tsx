"use client";

import { useLanguage } from "@/lib/i18n/client";
import { useTheme } from "@/lib/theme/client";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLanguage();
  const isDark = theme === "dark";
  const label =
    locale === "ar"
      ? isDark
        ? "تفعيل الوضع الفاتح"
        : "تفعيل الوضع الداكن"
      : isDark
        ? "Switch to light theme"
        : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-200/80 bg-white/85 px-3 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:bg-zinc-950/85 dark:text-zinc-100 dark:hover:border-orange-500 dark:hover:bg-zinc-900"
      aria-label={label}
      title={label}
    >
      <span>{isDark ? (locale === "ar" ? "فاتح" : "Light") : locale === "ar" ? "داكن" : "Dark"}</span>
    </button>
  );
}
