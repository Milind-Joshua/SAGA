'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Artwork } from '@/types/artwork'

interface ArtworkCardProps {
  artwork: Artwork
  index?: number
}

export function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay: reducedMotion ? 0 : (index % 6) * 0.08,
        ease: 'easeOut',
      }}
      data-testid="artwork-card"
    >
      <Link
        href={`/gallery/${artwork.slug}`}
        className="group block focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[var(--color-border)]">
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            placeholder={artwork.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={artwork.image.blurDataURL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          {/* Availability badge */}
          <div
            className={`absolute top-3 right-3 px-2 py-1 text-xs tracking-wider uppercase ${
              artwork.available
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-black/50 text-white/70'
            }`}
          >
            {artwork.available ? 'Available' : 'Sold'}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
            <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0 motion-reduce:translate-y-0">
              <p className="text-sm text-white/80">{artwork.medium}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-lg leading-tight">{artwork.title}</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {artwork.year} · {artwork.dimensions}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
