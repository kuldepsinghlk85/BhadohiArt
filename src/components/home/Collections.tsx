import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Collections() {
  const collections = [
    {
      name: 'HANDLOOM',
      slug: 'handloom',
      image: '/images/emerald-meadow.png',
    },
    {
      name: 'DESIGNER',
      slug: 'designer',
      image: '/images/royal-amethyst.png',
    },
    {
      name: 'PLUSH',
      slug: 'plush',
      image: '/images/ivory-cloud.png',
    },
    {
      name: 'TEXTURED',
      slug: 'textured',
      image: '/images/cinnamon-earth.png',
    },
    {
      name: 'MODERN',
      slug: 'modern',
      image: '/images/mocha-linea.png',
    },
    {
      name: 'CONTEMPORARY',
      slug: 'contemporary',
      image: '/images/velvet-plum.png',
    },
    {
      name: 'EXCLUSIVE',
      slug: 'exclusive',
      image: '/images/ocean-mist.png',
    }
  ];

  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] uppercase tracking-wide flex items-center justify-center gap-4">
            EXPLORE OUR PREMIUM COLLECTIONS
          </h2>
          <div className="flex justify-center mt-4">
             <div className="flex items-center">
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
                <div className="w-2 h-2 mx-2 rotate-45 bg-[var(--color-brand-burgundy)]"></div>
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
             </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {collections.map((collection) => (
            <Link 
              key={collection.name} 
              href="/collections"
              className="group block border border-[var(--color-brand-border)] bg-white hover:border-[var(--color-brand-burgundy)] transition-colors duration-300"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={`${collection.name} Collection`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="font-sans font-bold text-sm tracking-wider text-[var(--color-brand-dark)] mb-1">
                  {collection.name}
                </h3>
                <p className="text-[10px] tracking-widest text-[var(--color-brand-muted)] uppercase mb-3">
                  COLLECTION
                </p>
                <div className="flex items-center justify-center text-xs font-bold text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-burgundy)] transition-colors">
                  EXPLORE <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
