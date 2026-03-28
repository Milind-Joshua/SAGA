import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { allArtworksQuery, allSeriesQuery } from '@/lib/sanity/queries'
import { mapArtwork, mapSeries } from '@/lib/sanity/mappers'
import type { SanityArtwork, SanitySeries } from '@/lib/sanity/types'
import { GalleryClient } from './GalleryClient'
import type { FilterState } from '@/components/gallery/GalleryFilters'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Gallery — Sangeeth',
  description:
    'Browse original paintings and works on paper by Sangeeth — oil, watercolour, and mixed media.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery — Sangeeth',
    description:
      'Browse original paintings and works on paper by Sangeeth — oil, watercolour, and mixed media.',
    type: 'website',
  },
}

interface GalleryPageProps {
  searchParams: Promise<{
    medium?: string
    series?: string
    availability?: string
  }>
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const [sanityArtworks, sanitySeries, params] = await Promise.all([
    client.fetch<SanityArtwork[]>(allArtworksQuery),
    client.fetch<SanitySeries[]>(allSeriesQuery),
    searchParams,
  ])

  const artworks = sanityArtworks.map(mapArtwork)
  const series = sanitySeries.map(mapSeries)

  const activeFilters: FilterState = {
    medium: params.medium ?? '',
    series: params.series ?? '',
    availability: params.availability ?? '',
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <h1 className="mb-3 font-serif text-4xl md:text-5xl">Gallery</h1>
        <p className="text-[var(--color-muted)]">
          Original works in oil, watercolour, and mixed media
        </p>
      </header>

      <GalleryClient
        artworks={artworks}
        series={series}
        activeFilters={activeFilters}
      />
    </div>
  )
}
