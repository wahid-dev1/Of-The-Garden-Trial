import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import type { Product } from "@/lib/domain/product";
import { getProductMedia } from "@/lib/domain/productMedia";
import { Price } from "@/components/Price";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getDictionary, getProductCopy } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/server";
import { getProductById } from "@/lib/server/products";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const product: Product | null = await getProductById(id);

  if (!product) {
    notFound();
  }

  const localizedProduct = getProductCopy(product, locale);
  const media = getProductMedia(product);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <Link href="/products" className="hover:text-foreground hover:underline">
          {dictionary.common.products}
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">{localizedProduct.name}</span>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-xl shadow-zinc-950/5 ring-1 ring-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-950 dark:ring-white/10">
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[420px_1fr]">
          <div className="relative min-h-[26rem] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-zinc-950/10">
            {media.imageUrl ? (
              <Image
                src={media.imageUrl}
                alt={localizedProduct.name}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className={`h-full w-full bg-gradient-to-br ${media.accent}`} />
            )}
            <div className={`absolute inset-0 bg-gradient-to-t ${media.accent} opacity-30 mix-blend-multiply`} />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-5 start-5 rounded-2xl bg-white/95 px-4 py-3 text-zinc-950 shadow-lg backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {dictionary.common.price}
              </div>
              <div className="mt-1 text-2xl font-bold">
                <Price cents={product.priceCents} currency={product.currency} locale={locale} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {dictionary.common.product}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {localizedProduct.name}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              {localizedProduct.description}
            </p>

            <div
              className={`mt-8 rounded-3xl bg-gradient-to-br ${media.accent} p-1 shadow-lg shadow-zinc-950/10`}
            >
              <div className="flex flex-col gap-4 rounded-[1.35rem] bg-white/92 p-4 backdrop-blur dark:bg-zinc-950/90 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {dictionary.common.price}
                  </div>
                  <div className="mt-1 text-2xl font-semibold">
                    <Price cents={product.priceCents} currency={product.currency} locale={locale} />
                  </div>
                </div>
                <AddToCartButton
                  label={dictionary.productDetails.addToCart}
                  product={{
                    id: product.id,
                    name: localizedProduct.name,
                    priceCents: product.priceCents,
                    currency: product.currency,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 px-6 py-5 dark:border-zinc-800 sm:px-8">
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            {dictionary.productDetails.addHint}
          </div>
        </div>
      </div>
    </div>
  );
}

