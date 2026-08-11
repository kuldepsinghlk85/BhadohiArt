"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The wall-to-wall carpet installation at our luxury hotel was flawless. The quality of Bhadohi Arts Weave is unmatched, bringing a touch of heritage and elegance to our spaces.",
    author: "Rajiv Oberoi",
    role: "Luxury Hotel Group, New Delhi"
  },
  {
    id: 2,
    quote: "We ordered custom hand-knotted rugs for our new corporate office. The craftsmanship is extraordinary and the team was incredibly professional throughout the process.",
    author: "Anita Desai",
    role: "Interior Designer, Mumbai"
  },
  {
    id: 3,
    quote: "Bhadohi Arts Weave delivered exactly what they promised. The plush texture and deep colors of their Infinity collection completely transformed my living room.",
    author: "Vikram Singh",
    role: "Homeowner, Bangalore"
  },
  {
    id: 4,
    quote: "As an architect, I appreciate attention to detail. The intricate traditional motifs on their heritage carpets are simply breathtaking. Highly recommended.",
    author: "Elena Rossi",
    role: "Principal Architect, London"
  }
];

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#FAF7F0]">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] uppercase tracking-wide">
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="flex justify-center mt-4">
             <div className="flex items-center">
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
                <div className="w-2 h-2 mx-2 rotate-45 bg-[var(--color-brand-burgundy)]"></div>
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
             </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--color-brand-border)] bg-white items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-cream)] transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="bg-white border border-[var(--color-brand-border)] p-8 md:p-12 text-center relative shadow-sm min-h-[300px] flex flex-col justify-center">
            <Quote className="w-12 h-12 text-[var(--color-brand-cream)] absolute top-6 left-1/2 -translate-x-1/2 z-0 opacity-50" />
            
            <div className="relative z-10 transition-opacity duration-500 animate-in fade-in" key={currentTestimonial.id}>
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)] mx-0.5" />
                ))}
              </div>
              
              <p className="font-serif text-xl md:text-2xl text-[var(--color-brand-dark)] italic leading-relaxed mb-8">
                "{currentTestimonial.quote}"
              </p>
              
              <div>
                <h4 className="font-sans font-bold text-sm text-[var(--color-brand-dark)] mb-1 uppercase tracking-wider">
                  {currentTestimonial.author}
                </h4>
                <p className="text-xs text-[var(--color-brand-muted)]">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--color-brand-border)] bg-white items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-cream)] transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Mobile Arrows */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[var(--color-brand-border)] bg-white flex items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-cream)] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[var(--color-brand-border)] bg-white flex items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-cream)] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
