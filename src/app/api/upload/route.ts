import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Check if the uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Directory exists
    }

    const uploadedUrls: string[] = [];

    // Iterate through all entries in the FormData
    for (const [key, value] of formData.entries()) {
      // We expect the files to be sent as 'images' or 'files'
      if (value instanceof File) {
        const file = value;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Make the filename unique to avoid collisions
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = file.name.split('.').pop();
        const filename = `${uniqueSuffix}.${ext}`;
        const filePath = join(uploadsDir, filename);
        
        await writeFile(filePath, buffer);
        uploadedUrls.push(`/uploads/${filename}`);
      }
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
  }
}
