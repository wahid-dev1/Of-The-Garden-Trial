import { defaultLocale, type Locale } from "@/lib/i18n";

export function Price({
  cents,
  currency = "USD",
  locale = defaultLocale,
}: {
  cents: number;
  currency?: string;
  locale?: Locale;
}) {
  const amount = (cents / 100).toLocaleString(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency,
  });

  return <span className="tabular-nums">{amount}</span>;
}

