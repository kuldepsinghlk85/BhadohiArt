import React from 'react';
import prisma from '@/lib/prisma';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { FilterSidebar } from './FilterSidebar';
import { mockCollections, mockProducts } from '@/lib/mockData';

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const categories = params.category ? (Array.isArray(params.category) ? params.category : [params.category]) : [];
  
  let collections = mockCollections;
  let products: any[] = mockProducts;

  try {
    const dbCollections = await prisma.collection.findMany({ orderBy: { name: 'asc' } });
    if (dbCollections.length > 0) collections = dbCollections;

    const dbProducts = await prisma.product.findMany({
      where: categories.length > 0 ? {
        collection: { slug: { in: categories } },
        isVisible: true
      } : { isVisible: true },
      include: {
        images: true,
        collection: true
      }
    });

    if (dbProducts.length > 0) {
      // Map dbProducts to match the mock format
      products = dbProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.basePrice || "Request Quote",
        collection: p.collection,
        image: p.images?.find((img: any) => img.isMain)?.url || p.images?.[0]?.url || '/images/emerald-meadow.png',
        images: p.images
      }));
    }
  } catch (e) {
    // Fallback to mock
    if (categories.length > 0) {
      products = products.filter(p => categories.includes(p.collection?.slug));
    }
  }

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
