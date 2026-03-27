import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { allArtworkSlugsQuery, allSeriesSlugsQuery } from '@/lib/sanity/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artworkSlugs, seriesSlugs] = await Promise.all([
    client.fetch<string[]>(allArtworkSlugsQuery).catch(() => [] as string[]),
    client.fetch<string[]>(allSeriesSlugsQuery).catch(() => [] as string[]),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/series`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/exhibitions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const artworkRoutes: MetadataRoute.Sitemap = artworkSlugs.map((slug) => ({
    url: `${BASE_URL}/gallery/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const seriesRoutes: MetadataRoute.Sitemap = seriesSlugs.map((slug) => ({
    url: `${BASE_URL}/series/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...artworkRoutes, ...seriesRoutes]
}
