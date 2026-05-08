import type { MetadataRoute } from "next";

import { SITE_BRAND, siteTitle } from "@/lib/branding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle(),
    short_name: SITE_BRAND.en,
    description: "A polished bilingual product ordering flow",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#18181b",
  };
}
