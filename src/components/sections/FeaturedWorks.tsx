'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Artwork } from '@/types/artwork'

interface ArtworkCardProps {
  artwork: Artwork
  index: number
}

function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: 'easeOut',
      }}
    >
      <Link
        href={`/gallery/${artwork.slug}`}
        className="group block focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-[var(--color-border)]">
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            placeholder={artwork.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={artwork.image.blurDataURL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
        <div>
          <h3 className="font-serif text-lg">{artwork.title}</h3>
          <p className="text-sm text-[var(--color-muted)]">
            {artwork.medium}, {artwork.year}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

interface FeaturedWorksProps {
  artworks: Artwork[]
}

export function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  return (
    <section
      aria-labelledby="featured-works-title"
      className="mx-auto max-w-7xl px-6 py-[var(--spacing-section)]"
    >
      <div className="mb-12">
        <h2
          id="featured-works-title"
          className="mb-3 font-serif text-3xl md:text-4xl"
        >
          Featured Works
        </h2>
        <p className="text-[var(--color-muted)]">
          A selection of recent paintings and drawings
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        data-testid="featured-works-grid"
      >
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </section>
  )
}
