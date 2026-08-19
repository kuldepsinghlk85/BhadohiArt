import React from 'react';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Format the category for display
  const title = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Collection';
  
  let displayProducts: any[] = [];
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        collection: { slug: category },
        isVisible: true
      },
      include: {
        images: true,
        collection: true
      }
    });

    if (dbProducts.length > 0) {
      displayProducts = dbProducts.map(p => ({
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
  } catch (e) {}

  if (displayProducts.length === 0) {
    const { mockProducts } = await import('@/lib/mockData');
    displayProducts = mockProducts.filter(p => p.collection?.slug === category || p.slug.includes(category));
  }

  // Include in-memory mock products (for localhost when DB is unreachable)
  const globalAny: any = global;
  if (globalAny.__mockNewProducts && globalAny.__mockNewProducts.length > 0) {
    const newMocks = globalAny.__mockNewProducts
      .filter((p: any) => p.collection?.slug === category || p.collectionId === category)
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.basePrice || "Request Quote",
        collection: p.collection || { name: 'Mock Collection', slug: category },
        image: p.images?.[0]?.url || '/images/emerald-meadow.png',
        images: p.images
      }));
    
    displayProducts = [...newMocks, ...displayProducts];
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-24 pb-20">
      <div className="bg-[var(--color-brand-burgundy)] text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{title}</h1>
          <p className="font-sans text-white/80 max-w-2xl mx-auto">
            Explore our curated {title.toLowerCase()} crafted to perfection for every space.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar / Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 border border-[var(--color-brand-border)] sticky top-24">
            <div className="mb-4">
               <Link href="/collections" className="text-sm font-bold text-[var(--color-brand-burgundy)] hover:underline flex items-center gap-2">
                 ← Back to All Collections
               </Link>
            </div>
            <h3 className="font-sans font-bold text-[var(--color-brand-dark)] uppercase tracking-widest text-sm mb-6 pb-2 border-b border-[var(--color-brand-border)]">
              Filters
            </h3>
            
            <div className="mb-6">
              <h4 className="font-bold text-xs text-[var(--color-brand-muted)] uppercase mb-3">Categories</h4>
              <ul className="space-y-2 text-sm text-[var(--color-brand-dark)]">
                <li className="flex items-center gap-2"><input type="checkbox" className="accent-[var(--color-brand-burgundy)]" defaultChecked={category === 'handloom'} /> Handloom</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="accent-[var(--color-brand-burgundy)]" defaultChecked={category === 'designer'} /> Designer</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="accent-[var(--color-brand-burgundy)]" defaultChecked={category === 'plush'} /> Plush</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="accent-[var(--color-brand-burgundy)]" defaultChecked={category === 'textured'} /> Textured</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-[var(--color-brand-muted)]">Showing {displayProducts.length} products</p>
            <select className="border border-[var(--color-brand-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-brand-burgundy)]">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
          
          <ProductGrid products={displayProducts} />
        </div>
      </div>
    </div>
  );
}
