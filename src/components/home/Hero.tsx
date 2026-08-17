"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { WhatsAppInquiryModal } from '@/components/ecommerce/WhatsAppInquiryModal';

const SLIDE_IMAGES = [
  '/images/products/infinity-01.jpg',
  '/images/products/infinity-02.jpg',
  '/images/products/infinity-03.jpg',
  '/images/products/infinity-04.jpg',
  '/images/products/infinity-05.jpg',
  '/images/products/infinity-06.jpg',
  '/images/products/infinity-07.jpg',
  '/images/products/infinity-08.jpg',
  '/images/products/infinity-09.jpg',
  '/images/products/infinity-10.jpg'
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-[#FAF7F0] overflow-hidden flex items-center">
      {/* Background Images */}
      {SLIDE_IMAGES.map((img, index) => (
        <div 
          key={index}
          className={`absolute top-0 right-0 w-full md:w-[75%] h-full bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
          style={{ 
            backgroundImage: `url('${img}')`,
            backgroundPosition: img.includes('infinity-') ? 'top center' : 'center'
          }}
        />
      ))}
      
      {/* Soft white fade gradient on the left to blend with the text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/80 to-transparent w-full md:w-[80%] z-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-20 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6 transition-all duration-700 transform translate-y-0 opacity-100">
            <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]" />
            <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-sm uppercase">
              Handcrafted Luxury
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--color-brand-dark)] leading-tight mb-6">
            Crafting Elegance,<br />
            Woven for Generations
          </h1>

          {/* Supporting Text */}
          <p className="text-[var(--color-brand-dark)] font-sans text-lg mb-8 font-medium">
            Handmade • Handloom • Heritage • Machine Made<br />
            Wall-to-Wall Carpets
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/collections">
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                Explore Collection
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => setIsInquiryModalOpen(true)}>
              Request Catalogue
            </Button>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {SLIDE_IMAGES.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[var(--color-brand-burgundy)] w-8' 
                : 'bg-black/20 hover:bg-black/40'
            }`}
            aria-label={`Go to slide ${index + 1}`} 
          />
        ))}
      </div>

      <WhatsAppInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)}
        message="Hi! I would like to request the latest catalogue."
      />
    </section>
  );
}
