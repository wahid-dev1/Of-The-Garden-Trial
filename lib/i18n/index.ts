import { SITE_BRAND } from "@/lib/branding";

export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "product-ordering-trial:locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const dictionaries = {
  en: {
    brand: SITE_BRAND.en,
    nav: {
      products: "Products",
      cart: "Cart",
      items: "items",
      language: "Language",
      switchToArabic: "العربية",
      switchToEnglish: "English",
    },
    common: {
      product: "Product",
      products: "Products",
      price: "Price",
      total: "Total",
      subtotal: "Subtotal",
      summary: "Summary",
      items: "Items",
      remove: "Remove",
      checkout: "Checkout",
      clearCart: "Clear cart",
      browseProducts: "Browse products",
      continueShopping: "Continue shopping",
      viewCart: "View cart",
      backToCart: "Back to cart",
      order: "Order",
      status: "Status",
    },
    productsPage: {
      eyebrow: "Curated essentials",
      title: "Shop everyday products with confidence.",
      description:
        "A polished ordering flow with clear pricing, quick cart management, and a focused checkout experience.",
      catalogTitle: "Featured products",
      catalogDescription: "Search the collection and choose the items that fit your day.",
      empty: "No products found.",
      noMatches: "No products match your search.",
      searchLabel: "Search products",
      searchPlaceholder: "Search by product name or description...",
      clearSearch: "Clear search",
      showing: "Showing",
      of: "of",
      featured: "Featured",
      fastDelivery: "Fast delivery",
      secureCheckout: "Secure checkout",
      details: "View details",
      statProducts: "Products",
      statCheckout: "Checkout flow",
      statSupport: "Bilingual UI",
    },
    productDetails: {
      addHint: "Add the item to your cart, then check out when you are ready.",
      addToCart: "Add to cart",
    },
    cart: {
      title: "Your cart",
      description: "Review quantities, remove items, or continue to checkout.",
      empty: "Your cart is empty.",
      each: "each",
      taxes: "Taxes and shipping are calculated at checkout.",
      decreaseQuantity: "Decrease quantity",
      increaseQuantity: "Increase quantity",
    },
    checkout: {
      title: "Secure checkout",
      description: "Enter your delivery details and place the order.",
      emptyTitle: "Checkout",
      empty: "Your cart is empty.",
      name: "Name",
      email: "Email",
      address1: "Address line 1",
      address2: "Address line 2 (optional)",
      city: "City",
      country: "Country",
      postalCode: "Postal code",
      placingOrder: "Placing order...",
      placeOrder: "Place order",
      failure: "Could not place order. Please try again.",
      missingOrderId: "Order created, but no order id returned.",
      unknownError: "Something went wrong.",
      demo: "This is a demo checkout with no payment step.",
    },
    order: {
      confirmed: "Order confirmed",
      sentTo: "Confirmation sent to",
    },
    products: {
      "classic-white-tee": {
        name: "Classic White Tee",
        description: "Soft cotton tee with a relaxed fit. Easy to wear, easy to wash.",
      },
      "everyday-mug": {
        name: "Everyday Mug",
        description: "Ceramic mug for coffee, tea, or anything else you call a morning.",
      },
      "canvas-tote": {
        name: "Canvas Tote",
        description: "Lightweight tote with reinforced handles. Holds more than it looks like.",
      },
      "desk-notebook": {
        name: "Desk Notebook",
        description: "Dot-grid notebook with thick pages that do not bleed through.",
      },
      "wireless-headphones": {
        name: "Wireless Headphones",
        description: "Comfortable over-ear headphones with rich sound and all-day battery life.",
      },
      "minimal-backpack": {
        name: "Minimal Backpack",
        description: "A streamlined everyday backpack with padded storage for work and travel.",
      },
      "stainless-bottle": {
        name: "Stainless Bottle",
        description: "Insulated stainless steel bottle that keeps drinks cold or hot for hours.",
      },
      "desk-lamp": {
        name: "Desk Lamp",
        description: "Adjustable lamp with warm light for focused work and comfortable reading.",
      },
      "ceramic-planter": {
        name: "Ceramic Planter",
        description: "Modern ceramic planter that adds a clean natural accent to any desk.",
      },
      "travel-pouch": {
        name: "Travel Pouch",
        description: "Compact organizer pouch for cables, chargers, and small essentials.",
      },
      "scented-candle": {
        name: "Scented Candle",
        description: "Hand-poured candle with a soft amber scent and a clean glass vessel.",
      },
      "linen-throw": {
        name: "Linen Throw",
        description: "Lightweight woven throw for layering texture and warmth at home.",
      },
    },
  },
  ar: {
    brand: SITE_BRAND.ar,
    nav: {
      products: "المنتجات",
      cart: "السلة",
      items: "عناصر",
      language: "اللغة",
      switchToArabic: "العربية",
      switchToEnglish: "English",
    },
    common: {
      product: "منتج",
      products: "المنتجات",
      price: "السعر",
      total: "الإجمالي",
      subtotal: "المجموع الفرعي",
      summary: "الملخص",
      items: "العناصر",
      remove: "إزالة",
      checkout: "إتمام الطلب",
      clearCart: "تفريغ السلة",
      browseProducts: "تصفح المنتجات",
      continueShopping: "متابعة التسوق",
      viewCart: "عرض السلة",
      backToCart: "العودة إلى السلة",
      order: "الطلب",
      status: "الحالة",
    },
    productsPage: {
      eyebrow: "اختيارات يومية مميزة",
      title: "تسوق منتجاتك اليومية بثقة.",
      description:
        "تجربة طلب أنيقة مع أسعار واضحة، وإدارة سريعة للسلة، وخطوات دفع مركزة.",
      catalogTitle: "منتجات مميزة",
      catalogDescription: "ابحث في المجموعة واختر المنتجات المناسبة ليومك.",
      empty: "لا توجد منتجات.",
      noMatches: "لا توجد منتجات تطابق البحث.",
      searchLabel: "البحث عن المنتجات",
      searchPlaceholder: "ابحث باسم المنتج أو الوصف...",
      clearSearch: "مسح البحث",
      showing: "عرض",
      of: "من",
      featured: "مميز",
      fastDelivery: "توصيل سريع",
      secureCheckout: "دفع آمن",
      details: "عرض التفاصيل",
      statProducts: "منتجات",
      statCheckout: "مسار طلب",
      statSupport: "واجهة ثنائية اللغة",
    },
    productDetails: {
      addHint: "أضف المنتج إلى السلة، ثم أتمم الطلب عندما تكون جاهزا.",
      addToCart: "أضف إلى السلة",
    },
    cart: {
      title: "سلة التسوق",
      description: "راجع الكميات، أو احذف المنتجات، أو تابع لإتمام الطلب.",
      empty: "سلة التسوق فارغة.",
      each: "للوحدة",
      taxes: "يتم احتساب الضرائب والشحن عند إتمام الطلب.",
      decreaseQuantity: "تقليل الكمية",
      increaseQuantity: "زيادة الكمية",
    },
    checkout: {
      title: "إتمام الطلب بأمان",
      description: "أدخل تفاصيل التوصيل ثم أكد الطلب.",
      emptyTitle: "إتمام الطلب",
      empty: "سلة التسوق فارغة.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      address1: "العنوان الأول",
      address2: "العنوان الثاني (اختياري)",
      city: "المدينة",
      country: "الدولة",
      postalCode: "الرمز البريدي",
      placingOrder: "جار إرسال الطلب...",
      placeOrder: "تأكيد الطلب",
      failure: "تعذر إرسال الطلب. حاول مرة أخرى.",
      missingOrderId: "تم إنشاء الطلب، لكن لم يتم إرجاع رقم الطلب.",
      unknownError: "حدث خطأ ما.",
      demo: "هذه تجربة طلب تجريبية بدون خطوة دفع.",
    },
    order: {
      confirmed: "تم تأكيد الطلب",
      sentTo: "تم إرسال التأكيد إلى",
    },
    products: {
      "classic-white-tee": {
        name: "تي شيرت أبيض كلاسيكي",
        description: "تي شيرت قطني ناعم بقصة مريحة، سهل الارتداء والغسل.",
      },
      "everyday-mug": {
        name: "كوب يومي",
        description: "كوب سيراميك للقهوة أو الشاي أو أي بداية صباحية تفضلها.",
      },
      "canvas-tote": {
        name: "حقيبة كانفاس",
        description: "حقيبة خفيفة بمقابض معززة وتتسع لأكثر مما تتوقع.",
      },
      "desk-notebook": {
        name: "دفتر مكتبي",
        description: "دفتر بنقاط شبكية وصفحات سميكة لا يتسرب الحبر من خلالها.",
      },
      "wireless-headphones": {
        name: "سماعات لاسلكية",
        description: "سماعات مريحة فوق الأذن بصوت غني وبطارية تدوم طوال اليوم.",
      },
      "minimal-backpack": {
        name: "حقيبة ظهر بسيطة",
        description: "حقيبة يومية أنيقة مع مساحة مبطنة للعمل والسفر.",
      },
      "stainless-bottle": {
        name: "قارورة ستانلس",
        description: "قارورة معزولة تحافظ على المشروبات باردة أو ساخنة لساعات.",
      },
      "desk-lamp": {
        name: "مصباح مكتبي",
        description: "مصباح قابل للتعديل بإضاءة دافئة للعمل والقراءة براحة.",
      },
      "ceramic-planter": {
        name: "وعاء نبات سيراميك",
        description: "وعاء سيراميك عصري يضيف لمسة طبيعية نظيفة لأي مكتب.",
      },
      "travel-pouch": {
        name: "حقيبة تنظيم للسفر",
        description: "حقيبة صغيرة لتنظيم الكابلات والشواحن والاحتياجات اليومية.",
      },
      "scented-candle": {
        name: "شمعة عطرية",
        description: "شمعة مصبوبة يدويا برائحة كهرمان ناعمة ووعاء زجاجي أنيق.",
      },
      "linen-throw": {
        name: "غطاء كتان",
        description: "غطاء منسوج خفيف يضيف ملمسا ودفئا للمساحات المنزلية.",
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getProductCopy<T extends { id: string; name: string; description: string }>(
  product: T,
  locale: Locale,
): T {
  const localized = dictionaries[locale].products[product.id as keyof typeof dictionaries.en.products];
  if (!localized) return product;
  return { ...product, name: localized.name, description: localized.description };
}

export function getProductName(product: { id: string; name: string }, locale: Locale) {
  const localized = dictionaries[locale].products[product.id as keyof typeof dictionaries.en.products];
  return localized?.name ?? product.name;
}
