import { cookies } from "next/headers";

import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n";

export async function getRequestLocale() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(locale) ? locale : defaultLocale;
}
