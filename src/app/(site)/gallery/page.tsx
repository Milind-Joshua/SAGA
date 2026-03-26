import type { Metadata } from 'next'
import { allArtworks } from '@/data/artworks'
import { allSeries } from '@/data/series'
import { GalleryClient } from './GalleryClient'
import type { FilterState } from '@/components/gallery/GalleryFilters'

export const metadata: Metadata = {
  title: 'Gallery — Sangeeth',
  description:
    'Browse original paintings and works on paper by Sangeeth — oil, watercolour, and mixed media.',
}

interface GalleryPageProps {
  searchParams: Promise<{
    medium?: string
    series?: string
    availability?: string
  }>
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams

  const activeFilters: FilterState = {
    medium: params.medium ?? '',
    series: params.series ?? '',
    availability: params.availability ?? '',
  }

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <h1 className="mb-3 font-serif text-4xl md:text-5xl">Gallery</h1>
        <p className="text-[var(--color-muted)]">
          Original works in oil, watercolour, and mixed media
        </p>
      </header>

      <GalleryClient
        artworks={allArtworks}
        series={allSeries}
        activeFilters={activeFilters}
      />
    </main>
  )
}
