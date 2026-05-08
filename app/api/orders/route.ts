import { NextResponse } from "next/server";

import { CreateOrderSchema } from "@/lib/domain/order";
import { BadRequestError, createOrder } from "@/lib/server/orders";

export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = CreateOrderSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const order = await createOrder(parsed.data);
    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = err instanceof BadRequestError ? err.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

