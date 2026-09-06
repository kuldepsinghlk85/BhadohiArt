import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Edit, Eye, PlusCircle } from 'lucide-react';

async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.productImage.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}

async function toggleProductVisibility(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const currentStatus = formData.get("currentStatus") === "true";
  if (!id) return;
  
  try {
    await prisma.product.update({
      where: { id },
      data: { isVisible: !currentStatus }
    });
  } catch (e) {
    // Fallback for mock data (global mutation)
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      const idx = globalAny.__mockNewProducts.findIndex((p: any) => p.id === id);
      if (idx !== -1) {
        globalAny.__mockNewProducts[idx].isVisible = !currentStatus;
      }
    }
  }
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}

export default async function AdminProductsPage() {
  let products: any[] = []; 
  try { 
    products = await prisma.product.findMany({
      include: {
        collection: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    const { mockProducts } = await import('@/lib/mockData');
    products = mockProducts.map(p => ({
      ...p,
      images: p.images || [{ url: p.image, isMain: true }],
      isVisible: p.isVisible !== undefined ? p.isVisible : true
    }));
  }

  const globalAny: any = global;
  if (globalAny.__mockNewProducts && globalAny.__mockNewProducts.length > 0) {
    products = [...globalAny.__mockNewProducts, ...products];
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Product Manager <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{products.length} Products</span>
        </h1>
        <Link 
          href="/admin/products/new" 
          className="bg-orange-500 text-white px-4 py-2 text-sm font-bold rounded flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm"
        >
          <PlusCircle size={16} />
          Add New Product
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
              <th className="p-4 font-bold">Image & Product</th>
              <th className="p-4 font-bold">Collection</th>
              <th className="p-4 font-bold">Price Mode</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No products found. Click "Add New Product" to get started!
                </td>
              </tr>
            ) : (
              products.map(product => {
                const mainImage = product.images?.find((img: any) => img.isMain)?.url || product.images?.[0]?.url || '/images/emerald-meadow.png';
                const isVisible = product.isVisible !== false; // default true
                
                return (
                  <tr key={product.id} className={`border-b border-gray-100 transition-colors ${isVisible ? 'hover:bg-orange-50' : 'bg-gray-50 hover:bg-gray-100 opacity-70'}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 relative">
                          <Image 
                            src={mainImage} 
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{product.name}</p>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {product.id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.collection?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-700">
                        {product.priceMode}
                      </span>
                    </td>
                    <td className="p-4">
                      <form action={toggleProductVisibility}>
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="currentStatus" value={String(isVisible)} />
                        <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all hover:scale-105 ${isVisible ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700' : 'bg-gray-200 text-gray-600 hover:bg-green-100 hover:text-green-700'}`} title="Click to toggle visibility">
                          <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                          {isVisible ? 'LIVE' : 'HIDDEN'}
                        </button>
                      </form>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                          title="View on site"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.id}/edit`} 
                          className="p-1.5 text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </Link>
                        <form action={deleteProduct} className="inline-block">
                          <input type="hidden" name="id" value={product.id} />
                          <button type="submit" className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Delete Product">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
