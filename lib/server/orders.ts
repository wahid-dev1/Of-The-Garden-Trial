import { prisma } from "@/lib/db/prisma";
import type { CreateOrderInput } from "@/lib/domain/order";

export class BadRequestError extends Error {
  status = 400;
}

export async function createOrder(input: CreateOrderInput) {
  const uniqueIds = Array.from(new Set(input.items.map((i) => i.productId)));
  const products = await prisma.product.findMany({
    where: { id: { in: uniqueIds } },
  });

  const byId = new Map(products.map((p) => [p.id, p]));

  const items = input.items.map((i) => {
    const p = byId.get(i.productId);
    if (!p) {
      throw new BadRequestError(`Unknown product: ${i.productId}`);
    }

    return {
      productId: p.id,
      quantity: i.quantity,
      unitPriceCents: p.priceCents,
    };
  });

  const totalCents = items.reduce((sum, i) => sum + i.unitPriceCents * i.quantity, 0);

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customer: input.customer,
        email: input.email,
        address1: input.address1,
        address2: input.address2 || null,
        city: input.city,
        country: input.country,
        postalCode: input.postalCode,
        totalCents,
        currency: "USD",
        status: "pending",
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

