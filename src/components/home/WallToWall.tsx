"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Diamond, ShieldCheck } from 'lucide-react';
import { WhatsAppInquiryModal } from '@/components/ecommerce/WhatsAppInquiryModal';

const SLIDER_IMAGES = [
  '/images/royal-amethyst.png',
  '/images/emerald-meadow.png',
  '/images/cinnamon-earth.png',
  '/images/ocean-mist.png'
];

export function WallToWall() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative w-full h-auto lg:h-[600px] flex flex-col lg:flex-row bg-[#FAF7F0] overflow-hidden">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-[40%] px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center relative z-10 bg-[#FAF7F0]">
          <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-sm uppercase mb-4 block">
            WALL-TO-WALL SOLUTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-brand-dark)] leading-tight mb-6">
            Professional Wall-to-Wall<br />
            Carpet Installation
          </h2>
          <p className="font-sans text-lg text-[var(--color-brand-dark)] mb-10 max-w-md">
            Perfect for Hotels, Offices, Hospitals &amp; Luxury Residences.
          </p>
          <div>
            <Button variant="default" size="lg" onClick={() => setIsInquiryModalOpen(true)}>
              BOOK SITE VISIT
            </Button>
          </div>
        </div>

        {/* Right Image Slider Area */}
        <div className="w-full lg:w-[60%] h-[400px] lg:h-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/50 to-transparent w-[30%] hidden lg:block z-10" />
          
          {SLIDER_IMAGES.map((src, index) => (
            <img 
              key={src}
              src={src} 
              alt={`Wall to Wall Carpet Installation ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          
          {/* Slider Indicators */}
          <div className="absolute bottom-32 right-8 z-30 flex gap-2">
            {SLIDER_IMAGES.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-[var(--color-brand-burgundy)] scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Benefit Markers Overlay */}
          <div className="absolute bottom-8 left-0 right-0 z-20 px-8 flex justify-end">
            <div className="flex gap-4 md:gap-8 flex-wrap justify-end">
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-brand-burgundy)] bg-black/40 backdrop-blur-sm flex items-center justify-center text-[var(--color-brand-burgundy)]">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-white font-sans text-xs font-bold text-center drop-shadow-md">
                  Expert Installation<br/>Team
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-brand-burgundy)] bg-black/40 backdrop-blur-sm flex items-center justify-center text-[var(--color-brand-burgundy)]">
                  <Diamond className="w-6 h-6" />
                </div>
                <span className="text-white font-sans text-xs font-bold text-center drop-shadow-md">
                  Premium Quality<br/>Material
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-brand-burgundy)] bg-black/40 backdrop-blur-sm flex items-center justify-center text-[var(--color-brand-burgundy)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-white font-sans text-xs font-bold text-center drop-shadow-md">
                  Seamless Finish<br/>Assurance
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      <WhatsAppInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)}
        message="Hi! I am interested in booking a site visit for a Wall-to-Wall Installation Service."
      />
    </>
  );
}
