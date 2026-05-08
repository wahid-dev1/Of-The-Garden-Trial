"use client";

import Link from "next/link";

import type { CartItem } from "@/lib/cart/cartTypes";
import { useCart } from "@/lib/cart/cartStore";
import { Price } from "@/components/Price";
import { getProductName } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n/client";

export function CartItemRow({ item }: { item: CartItem }) {
  const cart = useCart();
  const { dictionary, locale } = useLanguage();
  const productName = getProductName(item.product, locale);

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/80 bg-white/85 p-4 shadow-sm ring-1 ring-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-950/85 dark:ring-white/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <Link
          href={`/products/${item.product.id}`}
          className="font-medium tracking-tight hover:underline"
        >
          {productName}
        </Link>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          <Price cents={item.product.priceCents} currency={item.product.currency} locale={locale} />{" "}
          {dictionary.cart.each}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900/40">
          <button
            type="button"
            onClick={() => cart.setQuantity(item.product.id, item.quantity - 1)}
            className="h-9 w-9 rounded-lg text-zinc-700 hover:bg-white dark:text-zinc-200 dark:hover:bg-zinc-900"
            aria-label={dictionary.cart.decreaseQuantity}
          >
            −
          </button>
          <div className="w-10 text-center text-sm font-medium tabular-nums">{item.quantity}</div>
          <button
            type="button"
            onClick={() => cart.setQuantity(item.product.id, item.quantity + 1)}
            className="h-9 w-9 rounded-lg text-zinc-700 hover:bg-white dark:text-zinc-200 dark:hover:bg-zinc-900"
            aria-label={dictionary.cart.increaseQuantity}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => cart.removeItem(item.product.id)}
          className="h-11 rounded-xl px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          {dictionary.common.remove}
        </button>
      </div>
    </div>
  );
}

