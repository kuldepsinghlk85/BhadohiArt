"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Collection {
  id: string;
  name: string;
  slug: string;
}

interface ExtractedProduct {
  id: string;
  imageDataUrl: string;
  name: string;
  price: string;
  collectionId: string;
}

export default function PdfImporter({ collections }: { collections: Collection[] }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [extractedProducts, setExtractedProducts] = useState<ExtractedProduct[]>([]);
  const router = useRouter();

  // Load PDF.js dynamically to avoid SSR and Webpack issues
  const processPdf = async (file: File) => {
    setIsProcessing(true);
    setExtractedProducts([]);

    try {
      // Use dynamic import for pdf.js
      const pdfjsLib = await import('pdfjs-dist');
      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const products: ExtractedProduct[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        
        // 1. Render to Canvas to get the Image Data URL
        const viewport = page.getViewport({ scale: 1.5 }); // Good quality
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context!,
          viewport: viewport
        }).promise;

        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);

        // 2. Extract Text to try and guess the product name
        let name = `Design ${i}`;
        try {
          const textContent = await page.getTextContent();
          const strings = textContent.items.map((item: any) => item.str).filter(s => s.trim().length > 0);
          if (strings.length > 0) {
            name = strings.slice(0, 2).join(' ').substring(0, 50);
          }
        } catch (e) {
          console.log("Could not extract text from page", i);
        }

        products.push({
          id: `ext_${Date.now()}_${i}`,
          imageDataUrl,
          name,
          price: '',
          collectionId: collections[0]?.id || ''
        });
      }

      setExtractedProducts(products);
    } catch (error) {
      console.error("PDF parsing error", error);
      alert("Failed to parse PDF. Make sure it's a valid PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        processPdf(file);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

  const handleUpdateProduct = (id: string, field: keyof ExtractedProduct, value: string) => {
    setExtractedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const removeProduct = (id: string) => {
    setExtractedProducts(prev => prev.filter(p => p.id !== id));
  };

  const publishProducts = async () => {
    if (extractedProducts.length === 0) return;
    setIsPublishing(true);

    try {
      const res = await fetch('/api/admin/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: extractedProducts })
      });

      if (!res.ok) throw new Error('Failed to publish');
      
      alert('Products successfully published!');
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Error publishing products. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      {extractedProducts.length === 0 && !isProcessing && (
        <div 
          onDragOver={e => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <input 
            type="file" 
            accept=".pdf,application/pdf"
            className="hidden" 
            id="pdf-upload"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) processPdf(e.target.files[0]);
            }}
          />
          <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-700 font-bold mb-1">Drag and drop a PDF Catalog here</p>
            <p className="text-gray-500 text-sm">or click to browse from your computer</p>
          </label>
        </div>
      )}

      {isProcessing && (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Analyzing PDF...</h3>
          <p className="text-sm text-gray-500 mt-2">Extracting images and designs. This might take a minute depending on the PDF size.</p>
        </div>
      )}

      {extractedProducts.length > 0 && !isProcessing && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Found {extractedProducts.length} Designs</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => setExtractedProducts([])}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isPublishing}
              >
                Cancel
              </button>
              <button 
                onClick={publishProducts}
                disabled={isPublishing}
                className="px-6 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2 font-bold"
              >
                {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Publish All to Store
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extractedProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
                <div className="relative aspect-square bg-gray-100 border-b border-gray-200 group">
                  <img src={product.imageDataUrl} className="w-full h-full object-contain" alt={product.name} />
                  <button 
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from import"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="p-4 space-y-4 flex-1 flex flex-col">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Product Name</label>
                    <input 
                      type="text" 
                      value={product.name}
                      onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Base Price</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5000"
                        value={product.price}
                        onChange={(e) => handleUpdateProduct(product.id, 'price', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                      <select 
                        value={product.collectionId}
                        onChange={(e) => handleUpdateProduct(product.id, 'collectionId', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                      >
                        {collections.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
