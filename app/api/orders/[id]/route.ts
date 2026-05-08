import { NextResponse } from "next/server";

import { getOrderById } from "@/lib/server/orders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    order: {
      id: order.id,
      customer: order.customer,
      email: order.email,
      totalCents: order.totalCents,
      currency: order.currency,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        unitPriceCents: i.unitPriceCents,
        product: {
          id: i.product.id,
          name: i.product.name,
        },
      })),
    },
  });
}

