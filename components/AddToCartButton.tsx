"use client";

import type { Product } from "@/lib/domain/product";
import { useCart } from "@/lib/cart/cartStore";

export function AddToCartButton({
  product,
  quantity = 1,
  label = "Add to cart",
}: {
  product: Pick<Product, "id" | "name" | "priceCents" | "currency">;
  quantity?: number;
  label?: string;
}) {
  const cart = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        cart.addItem({
          product,
          quantity,
        })
      }
      className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100"
    >
      {label}
    </button>
  );
}

