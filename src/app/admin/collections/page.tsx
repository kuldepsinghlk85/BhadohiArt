import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { readJsonStore } from '@/lib/jsonStore';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { mockCollections } from '@/lib/mockData';
import { revalidatePath } from 'next/cache';
import { deleteJsonItem } from '@/lib/jsonStore';

async function deleteCollection(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  
  try {
    await prisma.collection.delete({ where: { id } });
  } catch (e) {
    // Delete from JSON
    deleteJsonItem('collections.json', id);
  }
  revalidatePath('/admin/collections');
  revalidatePath('/collections');
}

export default async function AdminCollectionsPage() {
  let collections: any[] = [];
  
  try {
    collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    // Fallback to JSON and mock
    const jsonCollections = readJsonStore<any>('collections.json');
    collections = [...jsonCollections, ...mockCollections].map(c => ({
      ...c,
      _count: { products: 0 } // Mock count
    }));
    
    // De-duplicate by id or slug
    const unique = new Map();
    collections.forEach(c => unique.set(c.id || c.slug, c));
    collections = Array.from(unique.values());
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Categories & Portfolios <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{collections.length} Categories</span>
        </h1>
        <Link 
          href="/admin/collections/new" 
          className="bg-orange-500 text-white px-4 py-2 text-sm font-bold rounded flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm"
        >
          <PlusCircle size={16} />
          Create New Category
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
              <th className="p-4 font-bold">Image & Name</th>
              <th className="p-4 font-bold">Slug</th>
              <th className="p-4 font-bold">Products</th>
              <th className="p-4 font-bold">Slider Images</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No categories found. Click "Create New Category" to get started!
                </td>
              </tr>
            ) : (
              collections.map(collection => {
                const mainImage = collection.image || '/images/emerald-meadow.png';
                const sliderCount = collection.sliderImages?.length || 0;
                
                return (
                  <tr key={collection.id || collection.slug} className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 relative">
                          <Image 
                            src={mainImage} 
                            alt={collection.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{collection.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">{collection.description || 'No description'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                        /{collection.slug}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {collection._count?.products || 0} Products
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${sliderCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {sliderCount} Images
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/collections/${collection.id || collection.slug}/edit`} 
                          className="p-1.5 text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded transition-colors"
                          title="Edit Category"
                        >
                          <Edit size={16} />
                        </Link>
                        <form action={deleteCollection} className="inline-block">
                          <input type="hidden" name="id" value={collection.id} />
                          <button type="submit" className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Delete Category">
                            <Trash2 size={16} />
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
  );
}
