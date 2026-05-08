import Link from "next/link";
import Image from "next/image";

import type { Product } from "@/lib/domain/product";
import { getProductMedia } from "@/lib/domain/productMedia";
import { getDictionary, getProductCopy, type Locale } from "@/lib/i18n";
import { Price } from "@/components/Price";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const dictionary = getDictionary(locale);
  const localizedProduct = getProductCopy(product, locale);
  const media = getProductMedia(product);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-lg shadow-zinc-950/5 ring-1 ring-zinc-950/[0.03] transition duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-white/10"
    >
      <div className="relative h-56 overflow-hidden">
        {media.imageUrl ? (
          <Image
            src={media.imageUrl}
            alt={localizedProduct.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${media.accent}`} />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${media.accent} opacity-35 mix-blend-multiply`} />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute start-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur dark:bg-zinc-950/85 dark:text-zinc-200">
          {dictionary.common.product}
        </div>
        <div className="absolute bottom-5 start-5 end-5 flex items-end justify-between gap-4 text-white">
          <h3 className="text-xl font-semibold tracking-tight drop-shadow">
            {localizedProduct.name}
          </h3>
          <div className="shrink-0 rounded-2xl bg-white/95 px-3 py-2 text-start text-zinc-950 shadow-lg">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              {dictionary.common.price}
            </div>
            <div className="mt-1 text-sm font-bold">
              <Price cents={product.priceCents} currency={product.currency} locale={locale} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {localizedProduct.description}
        </p>
        <div className="mt-auto pt-5">
          <div className="inline-flex items-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition group-hover:bg-orange-600 dark:bg-white dark:text-zinc-950 dark:group-hover:bg-orange-200">
            {dictionary.productsPage.details}
            <span className="ms-2 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

