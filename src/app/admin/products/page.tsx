import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { DeleteButton } from '@/components/admin/DeleteButton';

async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.productImage.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      collection: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">Manage Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-[var(--color-brand-burgundy)] text-white px-4 py-2 text-sm font-bold hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          + Add New Product
        </Link>
      </div>

      <div className="bg-white border border-[var(--color-brand-border)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-[var(--color-brand-border)] text-[var(--color-brand-dark)]">
              <th className="p-4 font-bold text-sm">Name</th>
              <th className="p-4 font-bold text-sm">Collection</th>
              <th className="p-4 font-bold text-sm">Price Mode</th>
              <th className="p-4 font-bold text-sm">Rating</th>
              <th className="p-4 font-bold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-[var(--color-brand-muted)]">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                  <td className="p-4 text-sm">{product.name}</td>
                  <td className="p-4 text-sm">{product.collection.name}</td>
                  <td className="p-4 text-sm">{product.priceMode}</td>
                  <td className="p-4 text-sm">{product.rating}</td>
                  <td className="p-4 text-sm text-right">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-[var(--color-brand-burgundy)] hover:underline font-bold text-xs mr-4">
                      Edit
                    </Link>
                    <form action={deleteProduct} className="inline-block">
                      <input type="hidden" name="id" value={product.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
