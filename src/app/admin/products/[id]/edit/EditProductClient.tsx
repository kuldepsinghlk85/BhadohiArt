"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';

export default function EditProductClient({ 
  product, 
  collections 
}: { 
  product: any, 
  collections: any[] 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  // Parse features safely
  const initialFeatures = product.features ? JSON.parse(product.features) : [''];
  const [features, setFeatures] = useState<string[]>(initialFeatures.length > 0 ? initialFeatures : ['']);
  
  // Initialize sizes
  const initialSizes = product.variants && product.variants.length > 0 
    ? product.variants.map((v: any) => ({ size: v.size, price: v.price?.toString() || '' }))
    : [{size: '', price: ''}];
  const [sizes, setSizes] = useState<{size: string, price: string}[]>(initialSizes);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSizeChange = (index: number, field: 'size' | 'price', value: string) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  
  const addSize = () => setSizes([...sizes, {size: '', price: ''}]);
  const removeSize = (index: number) => setSizes(sizes.filter((_, i) => i !== index));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Handle file uploads if new ones are added
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        const uploadData = new FormData();
        files.forEach(file => uploadData.append('files', file));
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.urls) {
          uploadedUrls = uploadJson.urls;
        }
      }

      const payload = {
        name: formData.get('name'),
        collectionId: formData.get('collectionId'),
        priceMode: formData.get('priceMode'),
        isBestSeller: formData.get('isBestSeller') === 'on',
        isGrandRoomLook: formData.get('isGrandRoomLook') === 'on',
        description: formData.get('description'),
        features: features.filter(f => f.trim() !== ''),
        sizes: sizes.filter(s => s.size.trim() !== ''),
        images: uploadedUrls // Empty means don't update images
      };

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Product Name</label>
        <input 
          name="name" 
          required 
          defaultValue={product.name}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Description</label>
        <textarea 
          name="description" 
          rows={4}
          defaultValue={product.description || ''}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Collection</label>
        <select 
          name="collectionId" 
          required
          defaultValue={product.collectionId}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        >
          <option value="">Select a collection</option>
          {collections.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Price Mode</label>
        <select 
          name="priceMode" 
          required
          defaultValue={product.priceMode}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        >
          <option value="ENQUIRE">Enquire Only (Hide Price)</option>
          <option value="FIXED">Fixed Price (Show Price)</option>
          <option value="VARIABLE">Variable Price</option>
        </select>
      </div>
      
      {/* Dynamic Features */}
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Features (Bullet Points)</label>
        <div className="space-y-2">
          {features.map((feat, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={feat}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
                placeholder="e.g. Hand-knotted wool"
              />
              <button type="button" onClick={() => removeFeature(index)} className="p-2 border border-[var(--color-brand-border)] hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addFeature} className="mt-2 text-sm text-[var(--color-brand-burgundy)] flex items-center gap-1 font-bold">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      {/* Dynamic Sizes */}
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Available Sizes</label>
        <div className="space-y-2">
          {sizes.map((size, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={size.size}
                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                className="flex-1 border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
                placeholder="Size (e.g. 5' x 8')"
              />
              <input
                value={size.price}
                onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                className="flex-1 border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
                placeholder="Price (Optional if Enquire)"
              />
              <button type="button" onClick={() => removeSize(index)} className="p-2 border border-[var(--color-brand-border)] hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addSize} className="mt-2 text-sm text-[var(--color-brand-burgundy)] flex items-center gap-1 font-bold">
          <Plus className="w-4 h-4" /> Add Size
        </button>
      </div>

      {/* Multiple Images Upload */}
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Product Images (Leave empty to keep existing)</label>
        <div className="mb-2 flex gap-2 overflow-x-auto">
          {product.images?.map((img: any) => (
             <img key={img.id} src={img.url} alt="Current" className="h-20 object-cover border" />
          ))}
        </div>
        <input 
          type="file" 
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files));
            }
          }}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2"
        />
        {files.length > 0 && (
          <p className="text-sm mt-1 text-[var(--color-brand-burgundy)]">{files.length} new file(s) selected - this will replace existing images!</p>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
           <input type="checkbox" name="isBestSeller" id="isBestSeller" defaultChecked={product.isBestSeller} className="accent-[var(--color-brand-burgundy)] w-4 h-4" />
           <label htmlFor="isBestSeller" className="text-sm font-bold text-[var(--color-brand-dark)]">Mark as Best Seller (Shows on Homepage)</label>
        </div>

        <div className="flex items-center gap-2">
           <input type="checkbox" name="isGrandRoomLook" id="isGrandRoomLook" defaultChecked={product.isGrandRoomLook} className="accent-[var(--color-brand-burgundy)] w-4 h-4" />
           <label htmlFor="isGrandRoomLook" className="text-sm font-bold text-[var(--color-brand-dark)]">Grand Room Look (Shows in Slideshow page)</label>
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="bg-[var(--color-brand-dark)] text-white px-6 py-3 font-bold hover:bg-[var(--color-brand-burgundy)] transition-colors disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
}
