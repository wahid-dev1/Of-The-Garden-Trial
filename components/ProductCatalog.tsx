"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/domain/product";
import { getDictionary, getProductCopy, type Locale } from "@/lib/i18n";

export function ProductCatalog({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLocaleLowerCase(locale === "ar" ? "ar" : "en");
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((product) => {
      const localizedProduct = getProductCopy(product, locale);
      const searchable = `${localizedProduct.name} ${localizedProduct.description}`.toLocaleLowerCase(
        locale === "ar" ? "ar" : "en",
      );

      return searchable.includes(normalizedQuery);
    });
  }, [locale, normalizedQuery, products]);

  if (products.length === 0) {
    return (
      <div className="rounded-[2rem] border border-zinc-200 bg-white/90 p-8 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-300">
        {dictionary.productsPage.empty}
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-xl shadow-zinc-950/5 ring-1 ring-zinc-950/[0.03] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:ring-white/10 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-300">
            {dictionary.productsPage.featured}
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {dictionary.productsPage.catalogTitle}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {dictionary.productsPage.catalogDescription}
          </p>
        </div>

        <div className="w-full max-w-md">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200" htmlFor="product-search">
            {dictionary.productsPage.searchLabel}
          </label>
          <div className="mt-2 flex rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900">
            <input
              id="product-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.productsPage.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-xl bg-zinc-100 px-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {dictionary.productsPage.clearSearch}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-zinc-200 py-4 text-sm dark:border-zinc-800">
        <div className="font-medium text-zinc-700 dark:text-zinc-300">
          {dictionary.productsPage.showing}{" "}
          <span className="font-bold text-zinc-950 dark:text-white">{filteredProducts.length}</span>{" "}
          {dictionary.productsPage.of}{" "}
          <span className="font-bold text-zinc-950 dark:text-white">{products.length}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-950/50 dark:text-orange-200">
            {dictionary.productsPage.fastDelivery}
          </span>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950/50 dark:text-violet-200">
            {dictionary.productsPage.secureCheckout}
          </span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
          {dictionary.productsPage.noMatches}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
