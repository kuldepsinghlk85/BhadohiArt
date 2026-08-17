import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export async function BestSellers() {
  let dbProducts = [];
  try {
    dbProducts = await prisma.product.findMany({
      where: { isBestSeller: true },
      include: {
        images: { where: { isMain: true } },
        collection: true
      }
    });
  } catch (error: any) {
    console.error("====== PRISMA EXACT ERROR START ======");
    console.error(error.message);
    console.error("DATABASE_URL is set:", !!process.env.DATABASE_URL);
    console.error("====== PRISMA EXACT ERROR END ======");
    throw error;
  }

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 relative">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans font-bold text-sm text-[var(--color-brand-muted)] uppercase tracking-widest mb-2">
            BEST SELLERS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)]">
            Our Most Loved Carpets
          </h2>
          <div className="flex justify-center mt-4">
             <div className="flex items-center">
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
                <div className="w-2 h-2 mx-2 rotate-45 bg-[var(--color-brand-burgundy)]"></div>
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
             </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-8 lg:px-12">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group border border-[var(--color-brand-border)] flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow">
                
                {/* Product Image */}
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-sans font-bold text-sm text-[var(--color-brand-dark)] mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < product.rating ? 'fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)]' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-[var(--color-brand-muted)] mb-1">{product.type}</p>
                  <p className="text-sm font-bold text-[var(--color-brand-dark)] mb-4">{product.price}</p>
                  
                  <div className="mt-auto">
                    <Link href={`/collections/products/${product.slug}`}>
                      <Button variant="outline" className="w-full text-xs h-8">
                        VIEW DETAILS
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="default">
            VIEW ALL COLLECTIONS
          </Button>
        </div>

      </div>
    </section>
  );
}
