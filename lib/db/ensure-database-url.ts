import fs from "node:fs";
import path from "node:path";

const SQLITE_FALLBACK = "file:./dev.db";

/** Avoid opening `dev.db` relative to a wrong cwd (e.g. dev server not started from repo root). */
function prismaProjectRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 24; i++) {
    if (fs.existsSync(path.join(dir, "prisma", "schema.prisma"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

const PROJECT_ROOT = prismaProjectRoot();

function normalizeSqliteUrl(url: string): string {
  if (!url.startsWith("file:")) {
    return url;
  }
  const filePath = url.slice("file:".length).trim();
  if (path.isAbsolute(filePath)) {
    return `file:${filePath}`;
  }
  return `file:${path.resolve(PROJECT_ROOT, filePath.replace(/^\.\//, ""))}`;
}

const rawFromEnv = process.env.DATABASE_URL?.trim();

/** Same default as `.env.example` so Prisma stops failing when Vercel only injects DATABASE_URL at build time. */
process.env.DATABASE_URL = normalizeSqliteUrl(
  rawFromEnv && rawFromEnv.length > 0 ? rawFromEnv : SQLITE_FALLBACK,
);
