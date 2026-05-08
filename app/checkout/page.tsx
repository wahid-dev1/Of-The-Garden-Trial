"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useCart } from "@/lib/cart/cartStore";
import { Price } from "@/components/Price";
import { getProductName } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n/client";

type CheckoutForm = {
  customer: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  postalCode: string;
};

const initialForm: CheckoutForm = {
  customer: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  country: "United States",
  postalCode: "",
};

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const { dictionary, locale } = useLanguage();

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (cart.state.items.length === 0) return false;
    if (!form.customer.trim()) return false;
    if (!form.email.trim()) return false;
    if (!form.address1.trim()) return false;
    if (!form.city.trim()) return false;
    if (!form.country.trim()) return false;
    if (!form.postalCode.trim()) return false;
    return true;
  }, [cart.state.items.length, form]);

  async function submit() {
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart.state.items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          typeof (data as { error?: unknown })?.error === "string"
            ? (data as { error: string }).error
            : dictionary.checkout.failure;
        throw new Error(msg);
      }

      const orderId = (data as { orderId?: unknown }).orderId;
      if (typeof orderId !== "string" || !orderId) {
        throw new Error(dictionary.checkout.missingOrderId);
      }

      cart.clear();
      router.push(`/orders/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : dictionary.checkout.unknownError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (cart.state.items.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{dictionary.checkout.emptyTitle}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {dictionary.checkout.empty}{" "}
          <Link href="/products" className="font-medium underline text-foreground">
            {dictionary.common.browseProducts}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{dictionary.checkout.title}</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {dictionary.checkout.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-sm ring-1 ring-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-950/85 dark:ring-white/10">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={dictionary.checkout.name}
              value={form.customer}
              onChange={(v) => setForm((f) => ({ ...f, customer: v }))}
              autoComplete="name"
            />
            <Field
              label={dictionary.checkout.email}
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              autoComplete="email"
            />
            <div className="sm:col-span-2">
              <Field
                label={dictionary.checkout.address1}
                value={form.address1}
                onChange={(v) => setForm((f) => ({ ...f, address1: v }))}
                autoComplete="address-line1"
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label={dictionary.checkout.address2}
                value={form.address2}
                onChange={(v) => setForm((f) => ({ ...f, address2: v }))}
                autoComplete="address-line2"
              />
            </div>
            <Field
              label={dictionary.checkout.city}
              value={form.city}
              onChange={(v) => setForm((f) => ({ ...f, city: v }))}
              autoComplete="address-level2"
            />
            <Field
              label={dictionary.checkout.country}
              value={form.country}
              onChange={(v) => setForm((f) => ({ ...f, country: v }))}
              autoComplete="country-name"
            />
            <Field
              label={dictionary.checkout.postalCode}
              value={form.postalCode}
              onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))}
              autoComplete="postal-code"
            />
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/cart"
              className="h-11 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/60"
            >
              {dictionary.common.backToCart}
            </Link>
            <button
              type="button"
              disabled={!canSubmit || isSubmitting}
              onClick={submit}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
            >
              {isSubmitting ? dictionary.checkout.placingOrder : dictionary.checkout.placeOrder}
            </button>
          </div>
        </div>

        <div className="h-fit rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm ring-1 ring-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-950/85 dark:ring-white/10">
          <div className="text-sm font-medium">{dictionary.common.summary}</div>
          <div className="mt-3 space-y-2 text-sm">
            {cart.state.items.map((i) => (
              <div key={i.product.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0 truncate">
                  {getProductName(i.product, locale)}{" "}
                  <span className="text-zinc-500">× {i.quantity}</span>
                </div>
                <div className="shrink-0 tabular-nums">
                  <Price
                    cents={i.product.priceCents * i.quantity}
                    currency={i.product.currency}
                    locale={locale}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <div className="flex items-baseline justify-between">
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {dictionary.common.total}
              </div>
              <div className="text-lg font-semibold">
                <Price cents={cart.totals.subtotalCents} currency={cart.totals.currency} locale={locale} />
              </div>
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {dictionary.checkout.demo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
      />
    </label>
  );
}

