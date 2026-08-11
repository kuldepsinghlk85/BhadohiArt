import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ProductType {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  rating: number;
  slug: string;
}

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="group relative border border-[var(--color-brand-border)] flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow">
      
      {/* Product Image */}
      <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#FAF7F0]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/collections/products/${product.slug}`} className="hover:text-[var(--color-brand-burgundy)] transition-colors after:absolute after:inset-0 z-10">
          <h3 className="font-sans font-bold text-sm text-[var(--color-brand-dark)] mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
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
        
        <div className="mt-auto relative z-0">
          <Button variant="outline" className="w-full text-xs h-8 pointer-events-none group-hover:bg-[#FAF7F0] transition-colors">
            VIEW DETAILS
          </Button>
        </div>
      </div>
    </div>
  );
}
