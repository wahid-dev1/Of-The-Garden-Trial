import { cookies } from "next/headers";

import { defaultTheme, isTheme, THEME_COOKIE } from "@/lib/theme";

export async function getRequestTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE)?.value;
  return isTheme(theme) ? theme : defaultTheme;
}
