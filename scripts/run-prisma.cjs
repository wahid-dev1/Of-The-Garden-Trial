#!/usr/bin/env node
/**
 * Run Prisma CLI with the same DATABASE_URL resolution as lib/db/ensure-database-url.ts
 * so `migrate deploy` and the Next.js server always target the same SQLite file.
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function prismaProjectRoot() {
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
const SQLITE_FALLBACK = "file:./dev.db";

function normalizeSqliteUrl(url) {
  if (!url.startsWith("file:")) return url;
  const filePath = url.slice("file:".length).trim();
  if (path.isAbsolute(filePath)) {
    return `file:${filePath}`;
  }
  return `file:${path.resolve(PROJECT_ROOT, filePath.replace(/^\.\//, ""))}`;
}

const raw = process.env.DATABASE_URL?.trim();
process.env.DATABASE_URL = normalizeSqliteUrl(
  raw && raw.length > 0 ? raw : SQLITE_FALLBACK,
);

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: node scripts/run-prisma.cjs <prisma subcommand> [args...]");
  process.exit(1);
}

const result = spawnSync("npx", ["prisma", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
  cwd: PROJECT_ROOT,
});

process.exit(result.status ?? 1);
