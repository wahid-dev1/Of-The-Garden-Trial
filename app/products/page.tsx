import Image from "next/image";

import { getProductMedia } from "@/lib/domain/productMedia";
import { ProductCatalog } from "@/components/ProductCatalog";
import { getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/server";
import { listProducts } from "@/lib/server/products";

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const products = await listProducts();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-pink-500 to-violet-600 p-1 shadow-2xl shadow-pink-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(255_255_255/0.35),transparent_24rem)]" />
        <div className="relative grid gap-8 rounded-[1.8rem] bg-white/88 p-6 backdrop-blur-xl dark:bg-zinc-950/82 sm:p-8 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <div className="inline-flex rounded-full bg-gradient-to-r from-orange-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              {dictionary.productsPage.eyebrow}
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-balance text-zinc-950 dark:text-white sm:text-6xl">
              {dictionary.productsPage.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              {dictionary.productsPage.description}
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((product, index) => {
                const media = getProductMedia(product);

                return (
                  <div
                    key={product.id}
                    className={`relative overflow-hidden rounded-3xl shadow-xl ${
                      index === 0 ? "col-span-2 h-44" : "h-28"
                    }`}
                  >
                    {media.imageUrl ? (
                      <Image
                        src={media.imageUrl}
                        alt={product.name}
                        fill
                        sizes={index === 0 ? "380px" : "180px"}
                        className="object-cover"
                      />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${media.accent}`} />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${media.accent} opacity-35 mix-blend-multiply`} />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 start-3 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-zinc-950 shadow-sm">
                      {product.name}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold text-white">
              <div className="rounded-2xl bg-orange-500 p-3 shadow-lg">
                {products.length} {dictionary.productsPage.statProducts}
              </div>
              <div className="rounded-2xl bg-pink-500 p-3 shadow-lg">
                {dictionary.productsPage.statCheckout}
              </div>
              <div className="rounded-2xl bg-violet-600 p-3 shadow-lg">
                {dictionary.productsPage.statSupport}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog products={products} locale={locale} />
    </div>
  );
}

