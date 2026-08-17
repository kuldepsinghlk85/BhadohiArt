export const collections = [
  { id: '1', name: 'Hand-Knotted', slug: 'hand-knotted' },
  { id: '2', name: 'Hand-Tufted', slug: 'hand-tufted' },
  { id: '3', name: 'Hand-Loomed', slug: 'hand-loomed' },
  { id: '4', name: 'Flat-Weave', slug: 'flat-weave' },
  { id: '5', name: 'Modern Abstract', slug: 'modern-abstract' }
];

export const products = [
  // Hand-Knotted
  {
    id: "prod-hk-1",
    name: "Persian Royal Elegance",
    type: "Hand-Knotted",
    price: "₹85,000",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop",
    rating: 5,
    slug: "persian-royal-elegance",
    description: "An incredibly intricate hand-knotted carpet with traditional Persian motifs, crafted by master artisans over 6 months using premium New Zealand wool and pure silk highlights.",
    features: ["100% New Zealand Wool & Silk", "120 Knots per square inch", "Natural Vegetable Dyes"],
    sizes: ["5x8", "8x10", "9x12"],
    collection: { name: "Hand-Knotted", slug: "hand-knotted" },
    isBestSeller: true,
    images: [{ url: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },
  {
    id: "prod-hk-2",
    name: "Kashmiri Silk Jewel",
    type: "Hand-Knotted",
    price: "₹1,20,000",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800&auto=format&fit=crop",
    rating: 5,
    slug: "kashmiri-silk-jewel",
    description: "A dazzling 100% pure silk carpet from the valleys of Kashmir, featuring mesmerizing floral patterns that change shade depending on the viewing angle.",
    features: ["Pure Mulberry Silk", "Extremely dense knotting", "Heirloom Quality"],
    sizes: ["4x6", "6x9"],
    collection: { name: "Hand-Knotted", slug: "hand-knotted" },
    isBestSeller: false,
    images: [{ url: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },
  {
    id: "prod-hk-3",
    name: "Vintage Oushak",
    type: "Hand-Knotted",
    price: "₹65,000",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    slug: "vintage-oushak",
    description: "A beautiful Oushak design carpet with muted, pastel colors and a distressed vintage wash that blends perfectly into modern transitional interiors.",
    features: ["Hand-spun Wool", "Vintage Wash", "Transitional Design"],
    sizes: ["8x10", "9x12", "10x14"],
    collection: { name: "Hand-Knotted", slug: "hand-knotted" },
    isBestSeller: true,
    images: [{ url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },

  // Hand-Tufted
  {
    id: "prod-ht-1",
    name: "Arctic Pearl",
    type: "Hand-Tufted",
    price: "₹25,000",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516cb?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    slug: "arctic-pearl",
    description: "A plush, luxurious hand-tufted carpet featuring a carved pile effect with subtle geometric textures in pristine white and ivory tones.",
    features: ["Wool & Viscose Blend", "Carved Pile Texture", "Cotton Canvas Backing"],
    sizes: ["5x8", "8x10"],
    collection: { name: "Hand-Tufted", slug: "hand-tufted" },
    isBestSeller: true,
    images: [{ url: "https://images.unsplash.com/photo-1581539250439-c96689b516cb?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },
  {
    id: "prod-ht-2",
    name: "Midnight Bloom",
    type: "Hand-Tufted",
    price: "₹28,500",
    image: "https://images.unsplash.com/photo-1579208035174-a0774a815a51?q=80&w=800&auto=format&fit=crop",
    rating: 4,
    slug: "midnight-bloom",
    description: "Deep navy blue meets striking golden floral patterns in this contemporary tufted rug, designed to be the centerpiece of any living room.",
    features: ["100% Wool Pile", "Vibrant Colors", "High Durability"],
    sizes: ["6x9", "8x10"],
    collection: { name: "Hand-Tufted", slug: "hand-tufted" },
    isBestSeller: false,
    images: [{ url: "https://images.unsplash.com/photo-1579208035174-a0774a815a51?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },
  {
    id: "prod-ht-3",
    name: "Emerald Horizon",
    type: "Hand-Tufted",
    price: "₹22,000",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    slug: "emerald-horizon",
    description: "A beautiful gradient of emerald greens and teal, mimicking the ocean horizon. Very soft to the touch.",
    features: ["Soft Microfiber & Wool", "Shed-Resistant", "Latex Backed"],
    sizes: ["5x7", "8x10"],
    collection: { name: "Hand-Tufted", slug: "hand-tufted" },
    isBestSeller: false,
    images: [{ url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },

  // Hand-Loomed
  {
    id: "prod-hl-1",
    name: "Velvet Plum",
    type: "Hand-Loomed",
    price: "₹18,000",
    image: "https://images.unsplash.com/photo-1572295627236-4191d9d933cd?q=80&w=800&auto=format&fit=crop",
    rating: 5,
    slug: "velvet-plum",
    description: "A gorgeous hand-loomed carpet in a rich plum solid color with an incredibly soft, velvet-like finish.",
    features: ["Tencel & Wool", "Solid Color", "Silky Sheen"],
    sizes: ["5x8", "8x10", "9x12"],
    collection: { name: "Hand-Loomed", slug: "hand-loomed" },
    isBestSeller: true,
    images: [{ url: "https://images.unsplash.com/photo-1572295627236-4191d9d933cd?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },
  {
    id: "prod-hl-2",
    name: "Desert Sand Texture",
    type: "Hand-Loomed",
    price: "₹16,500",
    image: "https://images.unsplash.com/photo-1601083944641-69ab9c131dcf?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    slug: "desert-sand-texture",
    description: "A textured loop-pile loomed rug in neutral beige and sand tones. Excellent for minimalist and Scandinavian interiors.",
    features: ["Un-dyed Natural Wool", "Chunky Loop Texture", "Reversible"],
    sizes: ["6x9", "8x10"],
    collection: { name: "Hand-Loomed", slug: "hand-loomed" },
    isBestSeller: false,
    images: [{ url: "https://images.unsplash.com/photo-1601083944641-69ab9c131dcf?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },

  // Flat-Weave
  {
    id: "prod-fw-1",
    name: "Bohemian Kilim",
    type: "Flat-Weave",
    price: "₹12,000",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop", // Reusing for placeholder
    rating: 4.7,
    slug: "bohemian-kilim",
    description: "A vibrant, reversible flat-weave dhurrie with tribal geometric patterns in rust, ochre, and indigo.",
    features: ["100% Cotton", "Lightweight & Reversible", "Machine Washable"],
    sizes: ["4x6", "6x9"],
    collection: { name: "Flat-Weave", slug: "flat-weave" },
    isBestSeller: true,
    images: [{ url: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop", isMain: true }]
  },

  // Modern Abstract
  {
    id: "prod-ma-1",
    name: "Urban Canvas",
    type: "Modern Abstract",
    price: "₹35,000",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    slug: "urban-canvas",
    description: "Like a painting on your floor. This abstract rug blends splashes of grey, gold, and charcoal for an ultra-modern aesthetic.",
    features: ["High-Low Pile", "Art Silk Highlights", "Contemporary Art Design"],
    sizes: ["8x10", "9x12"],
    collection: { name: "Modern Abstract", slug: "modern-abstract" },
    isBestSeller: true,
    images: [{ url: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800&auto=format&fit=crop", isMain: true }]
  }
];
