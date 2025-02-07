import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://levenue.tech',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://levenue.tech/explore',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: 'https://levenue.tech/library',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    }
    // Add other important routes
  ];
}
