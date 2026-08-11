import React from 'react';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductGallery } from '@/components/ecommerce/ProductGallery';
import { ProductActions } from '@/components/ecommerce/ProductActions';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      collection: true,
      variants: true
    }
  });

  if (!dbProduct) {
    notFound();
  }

  const mainImage = dbProduct.images.find(img => img.isMain)?.url || '/images/emerald-meadow.png';
  const allImages = dbProduct.images.length > 0 ? dbProduct.images.map(img => img.url) : [mainImage];

  // Parse features gracefully
  let featuresList: string[] = [];
  if (dbProduct.features) {
    try {
      featuresList = JSON.parse(dbProduct.features);
    } catch (e) {
      featuresList = [];
    }
  }

  const product = {
    name: dbProduct.name,
    price: dbProduct.priceMode === 'ENQUIRE' ? 'Request Quote' : (dbProduct.basePrice ? `₹${dbProduct.basePrice}` : 'Request Quote'),
    type: `${dbProduct.collection.name}`,
    rating: dbProduct.rating || 5,
    reviews: 24, // hardcoded for now
    description: dbProduct.description || 'Experience the ultimate luxury with this meticulously handcrafted carpet. Woven by master artisans in Bhadohi, this piece features intricate traditional motifs modernized for contemporary spaces. Made from 100% premium materials, it offers unparalleled softness and durability.',
    features: featuresList.length > 0 ? featuresList : [
      'Hand-knotted by expert artisans',
      'Premium Materials',
      'Eco-friendly natural dyes',
      'Anti-bacterial & Hypoallergenic',
      'Custom sizes available upon request'
    ],
    images: allImages,
    variants: dbProduct.variants
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb & Back */}
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <p className="text-sm font-bold text-[var(--color-brand-muted)] uppercase tracking-widest mb-2">
              {product.type}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-brand-dark)] mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)]' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm text-[var(--color-brand-muted)]">
                ({product.reviews} customer reviews)
              </span>
            </div>

            <p className="text-[var(--color-brand-dark)] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Interactive Size Selection & Actions */}
            <ProductActions 
              product={{
                id: dbProduct.id,
                name: dbProduct.name,
                price: product.price,
                image: product.images[0] || mainImage,
                slug: dbProduct.slug,
                priceMode: dbProduct.priceMode,
                variants: product.variants
              }} 
            />

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-cream)] flex items-center justify-center text-[var(--color-brand-burgundy)]">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-[var(--color-brand-dark)]">Free Pan-India Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-cream)] flex items-center justify-center text-[var(--color-brand-burgundy)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-[var(--color-brand-dark)]">Quality Guaranteed</span>
              </div>
            </div>

            {/* Accordion / Details (Simplified) */}
            <div className="mt-12 space-y-4">
              <div className="border border-[var(--color-brand-border)]">
                <div className="p-4 bg-[#FAF7F0] font-bold text-[var(--color-brand-dark)] uppercase tracking-wider text-sm border-b border-[var(--color-brand-border)]">
                  Product Features
                </div>
                <div className="p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-brand-dark)]">
                    {product.features.map((feat: string, i: number) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
