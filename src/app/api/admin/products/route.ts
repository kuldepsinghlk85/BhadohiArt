import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, collectionId, priceMode, isBestSeller, isGrandRoomLook, description, features, sizes, images } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        collectionId,
        priceMode,
        isBestSeller,
        isGrandRoomLook,
        description,
        features: JSON.stringify(features),
        rating: 5,
        images: {
          create: images.length > 0 ? images.map((url: string, idx: number) => ({
            url,
            isMain: idx === 0
          })) : [{ url: '/images/emerald-meadow.png', isMain: true }]
        },
        variants: {
          create: sizes.map((s: any) => ({
            size: s.size,
            price: s.price ? parseFloat(s.price) : null,
            stock: 10
          }))
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
