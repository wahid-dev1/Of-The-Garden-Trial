import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { Price } from "@/components/Price";
import { getDictionary, getProductName } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/server";

type OrderResponse = {
  order: {
    id: string;
    customer: string;
    email: string;
    totalCents: number;
    currency: string;
    status: string;
    createdAt: string;
    items: Array<{
      id: string;
      quantity: number;
      unitPriceCents: number;
      product: { id: string; name: string };
    }>;
  };
};

async function getOrder(id: string): Promise<OrderResponse["order"] | null> {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  const url = host ? `${proto}://${host}/api/orders/${id}` : `/api/orders/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) return null;

  const data: unknown = await res.json();
  const order = (data as OrderResponse).order;
  return order ?? null;
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <Link href="/products" className="hover:text-foreground hover:underline">
          {dictionary.common.products}
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">{dictionary.common.order}</span>
      </div>

      <div className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-sm ring-1 ring-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-950/85 dark:ring-white/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">
              {dictionary.order.confirmed}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">{dictionary.order.confirmed}</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {dictionary.common.order}{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-100">#{order.id}</span>
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {dictionary.order.sentTo} <span className="font-medium">{order.email}</span>
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-start dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{dictionary.common.total}</div>
            <div className="mt-1 text-lg font-semibold">
              <Price cents={order.totalCents} currency={order.currency} locale={locale} />
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {dictionary.common.status}: {order.status}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div className="text-sm font-medium">{dictionary.common.items}</div>
          <div className="mt-3 space-y-2">
            {order.items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="min-w-0 truncate">
                  {getProductName(i.product, locale)}{" "}
                  <span className="text-zinc-500">× {i.quantity}</span>
                </div>
                <div className="shrink-0 tabular-nums">
                  <Price
                    cents={i.unitPriceCents * i.quantity}
                    currency={order.currency}
                    locale={locale}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100"
          >
            {dictionary.common.continueShopping}
          </Link>
          <Link
            href="/cart"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/60"
          >
            {dictionary.common.viewCart}
          </Link>
        </div>
      </div>
    </div>
  );
}

