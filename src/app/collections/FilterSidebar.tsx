"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  collections: { id: string; name: string; slug: string }[];
}

export function FilterSidebar({ collections }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selected categories (can be multiple)
  const currentCategories = searchParams.getAll('category');
  const currentPriceRange = searchParams.get('price') || '';

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll('category');
    
    // Remove all existing category params
    params.delete('category');
    
    // Add back the ones we want to keep
    if (existing.includes(slug)) {
      existing.filter(c => c !== slug).forEach(c => params.append('category', c));
    } else {
      existing.forEach(c => params.append('category', c));
      params.append('category', slug);
    }
    
    router.push(`/collections?${params.toString()}`);
  };

  const handlePriceChange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPriceRange === range) {
      params.delete('price');
    } else {
      params.set('price', range);
    }
    router.push(`/collections?${params.toString()}`);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white p-6 border border-[var(--color-brand-border)] sticky top-24">
        <h3 className="font-sans font-bold text-[var(--color-brand-dark)] uppercase tracking-widest text-sm mb-6 pb-2 border-b border-[var(--color-brand-border)]">
          Filters
        </h3>
        
        <div className="mb-6">
          <h4 className="font-bold text-xs text-[var(--color-brand-muted)] uppercase mb-3">Categories</h4>
          <ul className="space-y-2 text-sm text-[var(--color-brand-dark)]">
            {collections.map(collection => (
              <li key={collection.id} className="flex items-center gap-2 cursor-pointer" onClick={() => handleCategoryChange(collection.slug)}>
                <input 
                  type="checkbox" 
                  className="accent-[var(--color-brand-burgundy)] cursor-pointer" 
                  checked={currentCategories.includes(collection.slug)}
                  readOnly
                /> 
                <span>{collection.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs text-[var(--color-brand-muted)] uppercase mb-3">Price Range</h4>
          <ul className="space-y-2 text-sm text-[var(--color-brand-dark)]">
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => handlePriceChange('under-10k')}>
              <input type="checkbox" className="accent-[var(--color-brand-burgundy)] cursor-pointer" checked={currentPriceRange === 'under-10k'} readOnly /> 
              <span>Under ₹10,000</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => handlePriceChange('10k-25k')}>
              <input type="checkbox" className="accent-[var(--color-brand-burgundy)] cursor-pointer" checked={currentPriceRange === '10k-25k'} readOnly /> 
              <span>₹10,000 - ₹25,000</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => handlePriceChange('above-25k')}>
              <input type="checkbox" className="accent-[var(--color-brand-burgundy)] cursor-pointer" checked={currentPriceRange === 'above-25k'} readOnly /> 
              <span>Above ₹25,000</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
