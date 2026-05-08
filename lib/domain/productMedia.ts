const productMedia = {
  "classic-white-tee": {
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    accent: "from-rose-500 via-orange-400 to-amber-300",
  },
  "everyday-mug": {
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    accent: "from-sky-500 via-cyan-400 to-emerald-300",
  },
  "canvas-tote": {
    imageUrl:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-400",
  },
  "desk-notebook": {
    imageUrl:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80",
    accent: "from-emerald-500 via-teal-400 to-lime-300",
  },
  "wireless-headphones": {
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    accent: "from-zinc-900 via-slate-700 to-sky-500",
  },
  "minimal-backpack": {
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-700 via-orange-500 to-yellow-300",
  },
  "stainless-bottle": {
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    accent: "from-cyan-600 via-blue-500 to-indigo-400",
  },
  "desk-lamp": {
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    accent: "from-yellow-500 via-orange-400 to-rose-400",
  },
  "ceramic-planter": {
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
    accent: "from-green-600 via-emerald-500 to-lime-300",
  },
  "travel-pouch": {
    imageUrl:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80",
    accent: "from-purple-600 via-fuchsia-500 to-pink-400",
  },
  "scented-candle": {
    imageUrl:
      "https://images.unsplash.com/photo-1602874801006-e26e1782fceb?auto=format&fit=crop&w=900&q=80",
    accent: "from-stone-700 via-orange-300 to-amber-200",
  },
  "linen-throw": {
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    accent: "from-pink-600 via-rose-400 to-orange-200",
  },
} as const;

type ProductMediaKey = keyof typeof productMedia;

export function getProductMedia(product: { id: string; imageUrl?: string }) {
  const media = productMedia[product.id as ProductMediaKey];

  return {
    imageUrl: product.imageUrl || media?.imageUrl,
    accent: media?.accent ?? "from-orange-500 via-pink-500 to-violet-500",
  };
}
