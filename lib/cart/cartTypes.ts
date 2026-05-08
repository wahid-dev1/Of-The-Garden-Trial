import type { Product } from "@/lib/domain/product";

export type CartItem = {
  product: Pick<Product, "id" | "name" | "priceCents" | "currency">;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

