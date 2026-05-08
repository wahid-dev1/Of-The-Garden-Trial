import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle Prisma engines + SQLite for every route. `/*` does not match `/api/products`,
  // so include `/**` — otherwise API lambdas omit `dev.db` and listProducts via fetch stays empty on Vercel.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/.prisma/client/**/*", "./dev.db"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
