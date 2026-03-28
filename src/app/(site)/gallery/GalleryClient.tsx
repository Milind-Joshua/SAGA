'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import {
  GalleryFilters,
  type FilterState,
} from '@/components/gallery/GalleryFilters'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import type { Artwork } from '@/types/artwork'
import type { Series } from '@/types/series'

interface GalleryClientProps {
  artworks: Artwork[]
  series: Series[]
  activeFilters: FilterState
}

function applyFilters(artworks: Artwork[], filters: FilterState): Artwork[] {
  return artworks.filter((artwork) => {
    if (filters.medium) {
      const tags = artwork.tags ?? []
      if (!tags.includes(filters.medium)) return false
    }
    if (filters.series) {
      if (filters.series === 'ungrouped') {
        if (artwork.series) return false
      } else {
        if (artwork.series !== filters.series) return false
      }
    }
    if (filters.availability) {
      const isAvailable = filters.availability === 'available'
      if (artwork.available !== isAvailable) return false
    }
    return true
  })
}

export function GalleryClient({
  artworks,
  series,
  activeFilters,
}: GalleryClientProps) {
  const router = useRouter()
  const pathname = usePathname()

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  const filtered = applyFilters(artworks, activeFilters)
  const seriesOptions = series.map((s) => ({ slug: s.slug, title: s.title }))

  return (
    <>
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={activeFilters}
      />
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
      </p>
      <GalleryGrid artworks={filtered} onClearFilters={clearFilters} />
    </>
  )
}
