import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, collectionId, priceMode, isBestSeller, isGrandRoomLook, description, features, sizes, images } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // First delete existing variants and images if we are providing new ones.
    // For simplicity, we just clear and recreate them.
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    
    // Only delete existing images if new images are uploaded
    if (images && images.length > 0) {
       await prisma.productImage.deleteMany({ where: { productId: id } });
    }

    const updateData: any = {
      name,
      slug,
      collectionId,
      priceMode,
      isBestSeller,
      isGrandRoomLook,
      description,
      features: JSON.stringify(features),
      variants: {
        create: sizes.map((s: any) => ({
          size: s.size,
          price: s.price ? parseFloat(s.price) : null,
          stock: 10
        }))
      }
    };

    if (images && images.length > 0) {
      updateData.images = {
        create: images.map((url: string, idx: number) => ({
          url,
          isMain: idx === 0
        }))
      };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
