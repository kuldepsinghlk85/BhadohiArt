import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-sm uppercase mb-4 block">
            OUR STORY
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-brand-dark)] mb-8">
            Crafting Elegance Since Inception
          </h1>
          <p className="font-sans text-xl text-[var(--color-brand-muted)] leading-relaxed max-w-3xl mx-auto">
            We are a leading carpet manufacturer based in Bhadohi, proudly known as the Carpet City of India. With a commitment to quality craftsmanship, innovative designs, and premium materials, we specialize in creating elegant handmade and machine-made carpets.
          </p>
        </div>

        {/* Introduction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="relative h-[500px] w-full">
            <div className="absolute inset-0 bg-[var(--color-brand-burgundy)] translate-x-4 translate-y-4"></div>
            <img 
              src="/images/ocean-mist.png" 
              alt="Carpet Weaving Craftsmanship" 
              className="absolute inset-0 w-full h-full object-cover border border-[var(--color-brand-border)] z-10"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] mb-6">
              A Legacy of Craftsmanship
            </h2>
            <p className="font-sans text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">
              Our carpets are crafted by skilled artisans who combine traditional weaving techniques with modern trends to deliver style, comfort, and durability. Whether for homes, offices, hotels, or commercial spaces, our products elevate any interior.
            </p>
            <p className="font-sans text-lg text-[var(--color-brand-muted)] leading-relaxed">
              We focus on customer satisfaction, timely delivery, and customized solutions to meet every flooring need. From handloom marvels to expansive wall-to-wall installations, every thread weaves a story of dedication.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white border border-[var(--color-brand-border)] p-12 md:p-20 text-center mb-24">
          <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-sm uppercase mb-4 block">
            THE FUTURE
          </span>
          <h2 className="font-serif text-4xl text-[var(--color-brand-dark)] mb-8">
            Our Global & Local Vision
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 font-sans text-lg text-[var(--color-brand-muted)] leading-relaxed">
            <p>
              We have been successfully serving the international market for many years by delivering premium quality carpets and customized flooring solutions to clients across various countries. Our experience in global markets has given us a deep understanding of international standards in design, durability, comfort, and customer satisfaction.
            </p>
            <p>
              Now, we see tremendous potential in the Indian market, where rapid growth in hotels, hospitals, apartments, offices, and commercial spaces has created increasing demand for high-quality carpet solutions. We believe this is the right time to bring our expertise and internationally trusted products to customers across India.
            </p>
          </div>
        </div>

        {/* Installation & Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] mb-6">
              Beyond Manufacturing
            </h2>
            <p className="font-sans text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">
              Our goal is to offer Indian customers world-class wall-to-wall carpet solutions that meet global standards while remaining competitively priced. We provide carpets in a wide variety of designs, textures, colors, and custom sizes.
            </p>
            <p className="font-sans text-lg text-[var(--color-brand-muted)] leading-relaxed">
              In addition to manufacturing, we provide professional installation services through our trained and experienced staff, ensuring perfect fitting and finishing for every project. From product selection to final installation, we are proud to bring global experience together with Indian craftsmanship.
            </p>
          </div>
          <div className="relative h-[400px] w-full order-1 md:order-2">
            <div className="absolute inset-0 bg-[#E8E1D5] -translate-x-4 translate-y-4"></div>
            <img 
              src="/images/royal-amethyst.png" 
              alt="Professional Installation" 
              className="absolute inset-0 w-full h-full object-cover border border-[var(--color-brand-border)] z-10"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
