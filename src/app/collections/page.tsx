import React from 'react';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { FilterSidebar } from './FilterSidebar';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const categories = params.category ? (Array.isArray(params.category) ? params.category : [params.category]) : [];
  const price = params.price as string | undefined;

  // Build the Prisma where clause based on filters
  const where: Prisma.ProductWhereInput = {};
  
  if (categories.length > 0) {
    where.collection = {
      slug: { in: categories }
    };
  }

  if (price) {
    if (price === 'under-10k') {
      where.basePrice = { lt: 10000 };
    } else if (price === '10k-25k') {
      where.basePrice = { gte: 10000, lte: 25000 };
    } else if (price === 'above-25k') {
      where.basePrice = { gt: 25000 };
    }
  }

  const collections = await prisma.collection.findMany();

  const dbProducts = await prisma.product.findMany({
    where,
    include: {
      images: {
        where: { isMain: true }
      },
      collection: true
    }
  });

  const products = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    type: p.collection.name,
    price: p.priceMode === 'ENQUIRE' ? 'Request Quote' : (p.basePrice ? `₹${p.basePrice}` : 'Request Quote'),
    image: p.images[0]?.url || '/images/emerald-meadow.png',
    rating: p.rating || 5,
    slug: p.slug
  }));

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-24 pb-20">
      
      {/* Page Banner */}
      <div className="bg-[var(--color-brand-burgundy)] text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">All Collections</h1>
          <p className="font-sans text-white/80 max-w-2xl mx-auto">
            Explore our extensive range of premium handmade, handloom, and machine-made carpets, crafted to perfection for every space.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Filters */}
        <FilterSidebar collections={collections} />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-[var(--color-brand-muted)]">Showing {products.length} products</p>
            <select className="border border-[var(--color-brand-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-brand-burgundy)]">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
          
          <ProductGrid products={products} />
        </div>

      </div>
    </div>
  );
}
