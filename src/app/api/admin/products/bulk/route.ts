import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';
import { upsertJsonItem } from '@/lib/jsonStore';

export async function POST(req: NextRequest) {
  try {
    const { products } = await req.json();
    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {}

    const results = [];

    for (const p of products) {
      // 1. Save base64 image to disk
      const base64Data = p.imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}.jpg`;
      const filePath = join(uploadsDir, filename);
      
      await writeFile(filePath, buffer);
      const imageUrl = `/uploads/${filename}`;

      // Save to media library JSON
      upsertJsonItem('media.json', {
        id: uniqueSuffix,
        filename: `pdf-extract-${p.name}.jpg`,
        url: imageUrl,
        type: 'image/jpeg',
        size: buffer.length,
        createdAt: new Date().toISOString(),
      });

      // 2. Create the Product record
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + uniqueSuffix.slice(-5);
      const basePrice = p.price ? parseFloat(p.price) : null;
      
      const productData = {
        name: p.name,
        slug,
        collectionId: p.collectionId,
        priceMode: basePrice ? 'Base Price' : 'Request Quote',
        basePrice,
        isVisible: true,
        images: {
          create: [{ url: imageUrl, isMain: true }]
        }
      };

      try {
        const dbProduct = await prisma.product.create({
          data: productData,
          include: { images: true, collection: true }
        });
        
        // Save to JSON fallback
        upsertJsonItem('products.json', dbProduct);
        results.push(dbProduct);
      } catch (dbErr) {
        // Mock fallback if DB is offline
        const mockProduct = {
          id: `prd_${uniqueSuffix}`,
          name: p.name,
          slug,
          collectionId: p.collectionId,
          priceMode: basePrice ? 'Base Price' : 'Request Quote',
          basePrice,
          isVisible: true,
          images: [{ id: `img_${uniqueSuffix}`, url: imageUrl, isMain: true }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Expose to the in-memory global mock so the UI updates instantly
        const globalAny: any = global;
        if (!globalAny.__mockNewProducts) globalAny.__mockNewProducts = [];
        globalAny.__mockNewProducts.push(mockProduct);
        
        upsertJsonItem('products.json', mockProduct);
        results.push(mockProduct);
      }
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    console.error('Bulk Import Error:', error);
    return NextResponse.json({ error: 'Failed to process bulk import' }, { status: 500 });
  }
}
