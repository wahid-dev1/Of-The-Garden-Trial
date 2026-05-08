import "../lib/db/ensure-database-url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seedProducts = [
    {
      id: "classic-white-tee",
      name: "Classic White Tee",
      description: "Soft cotton tee with a relaxed fit. Easy to wear, easy to wash.",
      priceCents: 1800,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "everyday-mug",
      name: "Everyday Mug",
      description: "Ceramic mug for coffee, tea, or anything else you call a morning.",
      priceCents: 1200,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "canvas-tote",
      name: "Canvas Tote",
      description: "Lightweight tote with reinforced handles. Holds more than it looks like.",
      priceCents: 2400,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "desk-notebook",
      name: "Desk Notebook",
      description: "Dot-grid notebook with thick pages that don’t bleed through.",
      priceCents: 1600,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "wireless-headphones",
      name: "Wireless Headphones",
      description: "Comfortable over-ear headphones with rich sound and all-day battery life.",
      priceCents: 8900,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "minimal-backpack",
      name: "Minimal Backpack",
      description: "A streamlined everyday backpack with padded storage for work and travel.",
      priceCents: 6400,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "stainless-bottle",
      name: "Stainless Bottle",
      description: "Insulated stainless steel bottle that keeps drinks cold or hot for hours.",
      priceCents: 2800,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "desk-lamp",
      name: "Desk Lamp",
      description: "Adjustable lamp with warm light for focused work and comfortable reading.",
      priceCents: 4200,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "ceramic-planter",
      name: "Ceramic Planter",
      description: "Modern ceramic planter that adds a clean natural accent to any desk.",
      priceCents: 2200,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "travel-pouch",
      name: "Travel Pouch",
      description: "Compact organizer pouch for cables, chargers, and small essentials.",
      priceCents: 1900,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "scented-candle",
      name: "Scented Candle",
      description: "Hand-poured candle with a soft amber scent and a clean glass vessel.",
      priceCents: 2600,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1602874801006-e26e1782fceb?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "linen-throw",
      name: "Linen Throw",
      description: "Lightweight woven throw for layering texture and warmth at home.",
      priceCents: 5200,
      currency: "USD",
      imageUrl:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    },
  ];

  for (const p of seedProducts) {
    await prisma.product.upsert({
      where: { id: p.id },
      create: p,
      update: {
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        currency: p.currency,
        imageUrl: p.imageUrl,
      },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

