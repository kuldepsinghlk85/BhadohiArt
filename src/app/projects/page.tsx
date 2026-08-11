import React from 'react';
import prisma from '@/lib/prisma';
import { ProjectsClient } from './ProjectsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Bhadohi Arts Weave',
  description: 'Explore our portfolio of luxury carpets in various room settings.',
};

export default async function ProjectsPage() {
  // Fetch all collections and their products (to get fallback images)
  const dbCollections = await prisma.collection.findMany({
    include: {
      products: {
        include: {
          images: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });

  // Fetch configured slider images from SiteSettings
  const sliderSettings = await prisma.siteSetting.findMany({
    where: {
      key: {
        startsWith: 'portfolio_slider_'
      }
    }
  });

  // Format data for the client component
  const categories = dbCollections.map(collection => {
    let images: string[] = [];
    let hasCustomSetting = false;

    // 1. Check if admin configured custom images for this collection's slider
    const setting = sliderSettings.find(s => s.key === `portfolio_slider_${collection.id}`);
    if (setting) {
      try {
        const parsedImages = JSON.parse(setting.value);
        if (Array.isArray(parsedImages)) {
          images = parsedImages;
          hasCustomSetting = true;
        }
      } catch (e) {
        // Ignore JSON parse error
      }
    }

    // 2. If NO custom settings were ever saved by admin, use default fallbacks
    if (!hasCustomSetting) {
      if (collection.name.toLowerCase() === 'infinity') {
        images = [
          '/images/INFINITY/img_p14_1.png',
          '/images/INFINITY/img_p15_1.png',
          '/images/INFINITY/img_p17_1.png',
          '/images/INFINITY/img_p18_1.png',
        ];
      } else {
        images = [
          '/images/emerald-meadow.png',
          '/images/ocean-mist.png',
          '/images/royal-amethyst.png',
          '/images/velvet-plum.png',
        ];
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      images: images
    };
  });

  return (
    <ProjectsClient categories={categories} />
  );
}
