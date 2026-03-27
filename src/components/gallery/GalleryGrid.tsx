'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Artwork } from '@/types/artwork'
import { ArtworkCard } from './ArtworkCard'

interface GalleryGridProps {
  artworks: Artwork[]
  onClearFilters?: () => void
}

function SkeletonCard() {
  return (
    <div aria-hidden="true" data-testid="skeleton-card">
      <div className="mb-4 aspect-[3/4] animate-pulse bg-[var(--color-border)]" />
      <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-[var(--color-border)]" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--color-border)]" />
    </div>
  )
}

export function GalleryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const gridVariantsReduced = {
  hidden: {},
  visible: {},
}

export function GalleryGrid({ artworks, onClearFilters }: GalleryGridProps) {
  const reducedMotion = useReducedMotion()

  if (artworks.length === 0) {
    return (
      <div
        className="flex flex-col items-center py-24 text-center"
        data-testid="gallery-empty-state"
      >
        <p className="mb-4 text-lg text-[var(--color-muted)]">
          No works match these filters.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
          >
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      data-testid="gallery-grid"
      variants={reducedMotion ? gridVariantsReduced : gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </motion.div>
  )
}
