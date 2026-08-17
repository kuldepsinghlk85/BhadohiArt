export const mockCollections = [
  { id: '1', name: 'Hand-Knotted', slug: 'hand-knotted' },
  { id: '2', name: 'Hand-Tufted', slug: 'hand-tufted' },
  { id: '3', name: 'Hand-Loomed', slug: 'hand-loomed' },
];

export const mockProducts = [
  {
    id: "mock1",
    name: "Emerald Meadow",
    type: "Hand-Knotted",
    price: "₹45,000",
    image: "/images/emerald-meadow.png",
    rating: 5,
    slug: "emerald-meadow",
    description: "A beautiful hand-knotted carpet.",
    features: ["100% Wool", "Handmade"],
    sizes: ["5x8", "8x10"],
    collection: { name: "Hand-Knotted", slug: "hand-knotted" },
    images: [{ url: "/images/emerald-meadow.png", isMain: true }]
  },
  {
    id: "mock2",
    name: "Arctic Pearl",
    type: "Hand-Tufted",
    price: "₹25,000",
    image: "/images/arctic-pearl.png",
    rating: 4,
    slug: "arctic-pearl",
    description: "A beautiful hand-tufted carpet.",
    features: ["Wool Blend", "Soft Texture"],
    sizes: ["5x8", "8x10"],
    collection: { name: "Hand-Tufted", slug: "hand-tufted" },
    images: [{ url: "/images/arctic-pearl.png", isMain: true }]
  },
  {
    id: "mock3",
    name: "Velvet Plum",
    type: "Hand-Loomed",
    price: "Request Quote",
    image: "/images/velvet-plum.png",
    rating: 5,
    slug: "velvet-plum",
    description: "A gorgeous hand-loomed carpet.",
    features: ["Silk & Wool", "Premium Quality"],
    sizes: ["5x8", "8x10", "9x12"],
    collection: { name: "Hand-Loomed", slug: "hand-loomed" },
    images: [{ url: "/images/velvet-plum.png", isMain: true }]
  }
];
