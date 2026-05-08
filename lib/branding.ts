/** Single source of truth for product name (UI + metadata + manifest). */
export const SITE_BRAND = {
  en: "Of The Garden Trial",
  ar: "تجربة الحديقة",
} as const;

export function siteTitle(): string {
  return `${SITE_BRAND.en} | ${SITE_BRAND.ar}`;
}
