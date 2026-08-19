import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductClient from './EditProductClient';

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let product: any = null;
  let collections: any[] = [];
  
  try {
    product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        variants: true
      }
    });
    collections = await prisma.collection.findMany();
  } catch (e) {
    console.error("Failed to load product for edit page", e);
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-[var(--color-brand-burgundy)]">
        <h2>Failed to load product. The database might be unreachable.</h2>
        <Link href="/admin/products" className="underline mt-4 inline-block">Return to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/products" className="text-[var(--color-brand-burgundy)] font-bold">
          ← Back
        </Link>
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">Edit Product</h1>
      </div>

      <div className="bg-white p-6 border border-[var(--color-brand-border)] max-w-2xl">
        <EditProductClient product={product} collections={collections} />
      </div>
    </div>
  )
}
