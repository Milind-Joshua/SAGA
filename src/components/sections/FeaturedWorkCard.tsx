'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Artwork } from '@/types/artwork'

interface FeaturedWorkCardProps {
  artwork: Artwork
  index: number
}

export function FeaturedWorkCard({ artwork, index }: FeaturedWorkCardProps) {
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
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20 motion-reduce:transition-none"
          />
        </div>
        <div className="transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none">
          <h3 className="font-serif text-lg">{artwork.title}</h3>
          <p className="text-sm text-[var(--color-muted)]">
            {artwork.medium}, {artwork.year}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
