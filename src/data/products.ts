export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  lifestyleImages: string[];
  video?: string;
  carat: number;
  shape: string;
  metal: string;
  metalOptions: string[];
  sizes?: string[];
  description: string;
  details: {
    material: string;
    stone: string;
    certification: string;
    setting: string;
  };
  shipping: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Celestial Solitaire Ring",
    slug: "celestial-solitaire-ring",
    category: "rings",
    price: 4850,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    ],
    carat: 1.5,
    shape: "round",
    metal: "white-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold", "platinum"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    description: "A timeless expression of love, the Celestial Solitaire features a brilliant round lab-grown diamond suspended in a delicate four-prong setting. The cathedral band elevates the center stone, allowing maximum light to pass through for exceptional sparkle.",
    details: {
      material: "18K White Gold",
      stone: "1.5ct Round Brilliant Lab-Grown Diamond, E Color, VVS1 Clarity",
      certification: "IGI Certified",
      setting: "Four-prong cathedral setting",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: "2",
    name: "Aurora Oval Halo Ring",
    slug: "aurora-oval-halo-ring",
    category: "rings",
    price: 6200,
    originalPrice: 7800,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
    carat: 2.0,
    shape: "oval",
    metal: "rose-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    description: "The Aurora Halo showcases a stunning oval diamond surrounded by a halo of micropavé diamonds. This romantic design elongates the finger while the warm rose gold adds a modern, feminine touch.",
    details: {
      material: "18K Rose Gold",
      stone: "2.0ct Oval Lab-Grown Diamond, D Color, VS1 Clarity",
      certification: "IGI Certified",
      setting: "Micropavé halo with split shank",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Étoile Diamond Studs",
    slug: "etoile-diamond-studs",
    category: "earrings",
    price: 2450,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    ],
    carat: 1.0,
    shape: "round",
    metal: "white-gold",
    metalOptions: ["white-gold", "yellow-gold", "platinum"],
    description: "Classic elegance reimagined. These brilliant round studs are secured with secure screw-back posts, ensuring confident wear from day to evening. Total carat weight of 1.0ct (0.5ct each).",
    details: {
      material: "18K White Gold",
      stone: "2x 0.5ct Round Brilliant Lab-Grown Diamonds, F Color, VS2 Clarity",
      certification: "IGI Certified",
      setting: "Four-prong martini setting",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 203,
  },
  {
    id: "4",
    name: "Cascade Drop Earrings",
    slug: "cascade-drop-earrings",
    category: "earrings",
    price: 3800,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
    ],
    carat: 1.5,
    shape: "pear",
    metal: "yellow-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold"],
    description: "A statement of refined luxury, these drop earrings feature pear-shaped diamonds suspended from delicate chains. Movement and light dance together as you move.",
    details: {
      material: "18K Yellow Gold",
      stone: "2x 0.75ct Pear Lab-Grown Diamonds, E Color, VS1 Clarity",
      certification: "IGI Certified",
      setting: "Bezel drop setting",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: "5",
    name: "Soleil Pendant Necklace",
    slug: "soleil-pendant-necklace",
    category: "necklaces",
    price: 3200,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    ],
    carat: 0.75,
    shape: "round",
    metal: "yellow-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold"],
    description: "The Soleil pendant captures light from every angle. A brilliant round diamond floats on an adjustable chain, sitting perfectly at the collarbone. The ultimate everyday luxury.",
    details: {
      material: "18K Yellow Gold",
      stone: "0.75ct Round Brilliant Lab-Grown Diamond, D Color, VVS2 Clarity",
      certification: "IGI Certified",
      setting: "Bezel setting, adjustable 16-18\" chain",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "6",
    name: "Rivière Diamond Necklace",
    slug: "riviere-diamond-necklace",
    category: "necklaces",
    price: 12500,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
    carat: 5.0,
    shape: "round",
    metal: "platinum",
    metalOptions: ["white-gold", "platinum"],
    description: "An heirloom in the making. This graduated rivière necklace features 45 perfectly matched round diamonds, each hand-selected for exceptional brilliance. A statement piece for milestone celebrations.",
    details: {
      material: "Platinum",
      stone: "45 Round Brilliant Lab-Grown Diamonds, 5.0ct Total, F-G Color, VS Clarity",
      certification: "IGI Certified",
      setting: "Four-prong graduated setting, 17\" length",
    },
    shipping: "Complimentary insured shipping with signature required. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 28,
  },
  {
    id: "7",
    name: "Eternity Tennis Bracelet",
    slug: "eternity-tennis-bracelet",
    category: "bracelets",
    price: 7800,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    ],
    carat: 4.0,
    shape: "round",
    metal: "white-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold", "platinum"],
    sizes: ["6.5", "7", "7.5"],
    description: "The quintessential tennis bracelet, elevated. A continuous line of 52 uniform round diamonds wraps elegantly around the wrist. Featuring our signature hidden clasp with safety latch.",
    details: {
      material: "18K White Gold",
      stone: "52 Round Brilliant Lab-Grown Diamonds, 4.0ct Total, E-F Color, VS Clarity",
      certification: "IGI Certified",
      setting: "Four-prong inline setting with hidden clasp",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 94,
  },
  {
    id: "8",
    name: "Luna Bangle",
    slug: "luna-bangle",
    category: "bracelets",
    price: 4200,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
    carat: 1.5,
    shape: "round",
    metal: "rose-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold"],
    sizes: ["small", "medium", "large"],
    description: "A modern interpretation of the classic bangle. Diamonds are channel-set across the top for a sleek profile, while the open-back design ensures a comfortable fit.",
    details: {
      material: "18K Rose Gold",
      stone: "1.5ct Total Round Brilliant Lab-Grown Diamonds, F Color, VS1 Clarity",
      certification: "IGI Certified",
      setting: "Channel setting with hinged clasp",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 36,
  },
  {
    id: "9",
    name: "Princess Three-Stone Ring",
    slug: "princess-three-stone-ring",
    category: "rings",
    price: 5600,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    ],
    carat: 2.5,
    shape: "princess",
    metal: "platinum",
    metalOptions: ["white-gold", "yellow-gold", "platinum"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    description: "Symbolizing your past, present, and future. Three princess-cut diamonds are set in platinum, with the center stone slightly larger to draw the eye. A meaningful choice for engagements and anniversaries.",
    details: {
      material: "Platinum",
      stone: "1.2ct Center + 2x 0.65ct Side Princess Cut Lab-Grown Diamonds, D-E Color, VVS2 Clarity",
      certification: "IGI Certified",
      setting: "Four-prong basket setting",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    rating: 4.7,
    reviewCount: 52,
  },
  {
    id: "10",
    name: "Emerald Cut Signature Ring",
    slug: "emerald-cut-signature-ring",
    category: "rings",
    price: 8900,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
    carat: 3.0,
    shape: "emerald",
    metal: "white-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold", "platinum"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    description: "For the discerning collector. The emerald cut reveals the diamond's exceptional clarity through its step-cut facets. This sophisticated art deco-inspired design features tapered baguette side stones.",
    details: {
      material: "18K White Gold",
      stone: "3.0ct Emerald Cut Lab-Grown Diamond, D Color, VVS1 Clarity",
      certification: "IGI Certified",
      setting: "Four-prong with tapered baguette sides",
    },
    shipping: "Complimentary insured shipping with signature required. Arrives in 5-7 business days.",
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 19,
  },
  {
    id: "11",
    name: "Cushion Halo Pendant",
    slug: "cushion-halo-pendant",
    category: "necklaces",
    price: 4500,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    ],
    carat: 1.2,
    shape: "cushion",
    metal: "rose-gold",
    metalOptions: ["white-gold", "yellow-gold", "rose-gold"],
    description: "A cushion-cut diamond surrounded by a delicate halo of micropavé diamonds. The soft edges and warm rose gold create a romantic, vintage-inspired aesthetic.",
    details: {
      material: "18K Rose Gold",
      stone: "1.0ct Cushion Cut + 0.2ct Halo Lab-Grown Diamonds, E Color, VS1 Clarity",
      certification: "IGI Certified",
      setting: "Micropavé halo, 16-18\" adjustable chain",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "12",
    name: "Marquise Cluster Earrings",
    slug: "marquise-cluster-earrings",
    category: "earrings",
    price: 5200,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    ],
    lifestyleImages: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
    ],
    carat: 2.0,
    shape: "marquise",
    metal: "white-gold",
    metalOptions: ["white-gold", "yellow-gold"],
    description: "A showstopping cluster design featuring marquise-cut diamonds arranged in a floral pattern. These statement earrings catch light from every angle.",
    details: {
      material: "18K White Gold",
      stone: "2.0ct Total Marquise Lab-Grown Diamonds, E-F Color, VS Clarity",
      certification: "IGI Certified",
      setting: "Prong cluster setting with secure lever backs",
    },
    shipping: "Complimentary insured shipping. Arrives in 5-7 business days.",
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 23,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.isNew);
};

export const getBestsellers = (): Product[] => {
  return products.filter((product) => product.isBestseller);
};

export const filterProducts = (
  productsToFilter: Product[],
  filters: {
    price?: string;
    carat?: string;
    shape?: string;
    metal?: string;
  }
): Product[] => {
  return productsToFilter.filter((product) => {
    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      if (product.price < min || product.price > max) return false;
    }
    if (filters.carat) {
      const [min, max] = filters.carat.split("-").map(Number);
      if (product.carat < min || product.carat > max) return false;
    }
    if (filters.shape && product.shape !== filters.shape) return false;
    if (filters.metal && product.metal !== filters.metal) return false;
    return true;
  });
};

export const sortProducts = (
  productsToSort: Product[],
  sortBy: string
): Product[] => {
  const sorted = [...productsToSort];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case "featured":
    default:
      return sorted.sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      );
  }
};
