import type { Product } from "@/lib/domain/product";
import { prisma } from "@/lib/db/prisma";

export async function listProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return rows.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    priceCents: p.priceCents,
    currency: "USD",
    imageUrl: p.imageUrl ?? undefined,
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return null;

  return {
    id: p.id,
    name: p.name,
    description: p.description,
    priceCents: p.priceCents,
    currency: "USD",
    imageUrl: p.imageUrl ?? undefined,
  };
}

