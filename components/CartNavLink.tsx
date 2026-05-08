"use client";

import Link from "next/link";

import { useCart } from "@/lib/cart/cartStore";
import { useLanguage } from "@/lib/i18n/client";

export function CartNavLink() {
  const cart = useCart();
  const { dictionary } = useLanguage();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-900"
    >
      <span>{dictionary.nav.cart}</span>
      {cart.totals.itemCount > 0 ? (
        <span className="grid min-w-5 place-items-center rounded-full bg-zinc-900 px-1.5 text-[11px] font-semibold leading-5 text-white dark:bg-white dark:text-black">
          {cart.totals.itemCount}
        </span>
      ) : null}
    </Link>
  );
}
