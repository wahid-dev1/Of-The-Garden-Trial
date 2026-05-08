"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

import type { CartItem, CartState } from "@/lib/cart/cartTypes";

type CartAction =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; item: CartItem }
  | { type: "remove"; productId: string }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "clear" };

const STORAGE_KEY = "product-ordering-trial:cart:v1";

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const existing = state.items.find((i) => i.product.id === action.item.product.id);
      if (!existing) {
        return { items: [...state.items, action.item] };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.item.product.id
            ? { ...i, quantity: i.quantity + action.item.quantity }
            : i,
        ),
      };
    }
    case "remove":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case "setQuantity": {
      const q = Math.max(1, Math.min(99, Math.floor(action.quantity)));
      return {
        items: state.items.map((i) => (i.product.id === action.productId ? { ...i, quantity: q } : i)),
      };
    }
    case "clear":
      return initialState;
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totals: {
    itemCount: number;
    subtotalCents: number;
    currency: "USD";
  };
};

const CartContext = createContext<CartContextValue | null>(null);

function safeParseCart(raw: string | null): CartState | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    const items = (parsed as { items?: unknown }).items;
    if (!Array.isArray(items)) return null;

    const normalized: CartItem[] = [];
    for (const it of items) {
      const item = it as Partial<CartItem>;
      const product = item.product as CartItem["product"] | undefined;
      const quantity = typeof item.quantity === "number" ? item.quantity : NaN;
      if (!product?.id || !product.name) continue;
      if (!Number.isFinite(quantity) || quantity <= 0) continue;

      normalized.push({
        product: {
          id: String(product.id),
          name: String(product.name),
          priceCents: Number(product.priceCents ?? 0),
          currency: "USD",
        },
        quantity: Math.max(1, Math.min(99, Math.floor(quantity))),
      });
    }

    return { items: normalized };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const hydrated = safeParseCart(localStorage.getItem(STORAGE_KEY));
    if (hydrated) dispatch({ type: "hydrate", state: hydrated });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totals = useMemo(() => {
    const subtotalCents = state.items.reduce(
      (sum, i) => sum + i.product.priceCents * i.quantity,
      0,
    );
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

    return { subtotalCents, itemCount, currency: "USD" as const };
  }, [state.items]);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      addItem: (item) => dispatch({ type: "add", item }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      setQuantity: (productId, quantity) => dispatch({ type: "setQuantity", productId, quantity }),
      clear: () => dispatch({ type: "clear" }),
      totals,
    }),
    [state, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

