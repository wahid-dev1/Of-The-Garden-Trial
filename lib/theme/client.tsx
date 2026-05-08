"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import { defaultTheme, isTheme, THEME_COOKIE, type Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

export function ThemeProvider({
  children,
  initialTheme = defaultTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(isTheme(initialTheme) ? initialTheme : defaultTheme);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      setTheme: (nextTheme) => {
        applyTheme(nextTheme);
        setThemeState(nextTheme);
      },
      toggleTheme: () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        setThemeState(nextTheme);
      },
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
