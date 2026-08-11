"use client";

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#FAF7F0] border border-[var(--color-brand-border)] overflow-hidden">
        <img 
          src={mainImage} 
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button 
            key={i} 
            onClick={() => setMainImage(img)}
            className={`aspect-square border ${mainImage === img ? 'border-[var(--color-brand-burgundy)]' : 'border-[var(--color-brand-border)]'} overflow-hidden`}
          >
            <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
