"use client";

import Link from "next/link";

import { CartItemRow } from "@/components/CartItemRow";
import { Price } from "@/components/Price";
import { useCart } from "@/lib/cart/cartStore";
import { useLanguage } from "@/lib/i18n/client";

function CartClient() {
  const cart = useCart();
  const { dictionary, locale } = useLanguage();

  if (cart.state.items.length === 0) {
    return (
      <div className="rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/85 dark:text-zinc-300">
        {dictionary.cart.empty}{" "}
        <Link href="/products" className="font-medium text-foreground underline">
          {dictionary.common.browseProducts}
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        {cart.state.items.map((item) => (
          <CartItemRow key={item.product.id} item={item} />
        ))}
      </div>

      <div className="h-fit rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm ring-1 ring-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-950/85 dark:ring-white/10">
        <div className="flex items-baseline justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            {dictionary.common.subtotal}
          </div>
          <div className="text-lg font-semibold">
            <Price cents={cart.totals.subtotalCents} currency={cart.totals.currency} locale={locale} />
          </div>
        </div>
        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {dictionary.cart.taxes}
        </div>

        <div className="mt-4 space-y-2">
          <Link
            href="/checkout"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100"
          >
            {dictionary.common.checkout}
          </Link>
          <button
            type="button"
            onClick={() => cart.clear()}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/60"
          >
            {dictionary.common.clearCart}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { dictionary } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{dictionary.cart.title}</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {dictionary.cart.description}
        </p>
      </div>
      <CartClient />
    </div>
  );
}

