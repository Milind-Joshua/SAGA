'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Artwork } from '@/types/artwork'

const Lightbox = dynamic(() => import('./Lightbox').then((m) => m.Lightbox), {
  ssr: false,
})

interface ArtworkDetailProps {
  artwork: Artwork
  relatedArtworks: Artwork[]
  seriesArtworks: Artwork[]
}

export function ArtworkDetail({
  artwork,
  relatedArtworks,
  seriesArtworks,
}: ArtworkDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      {/* Detail layout */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link
          href="/gallery"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <span aria-hidden="true">←</span> Back to Gallery
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr]">
          {/* Image panel */}
          <div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              aria-label={`View ${artwork.title} in full screen`}
            >
              <div
                className="relative overflow-hidden bg-[var(--color-border)]"
                style={{
                  aspectRatio: `${artwork.image.width} / ${artwork.image.height}`,
                }}
              >
                <Image
                  src={artwork.image.src}
                  alt={artwork.image.alt}
                  fill
                  priority
                  quality={92}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder={artwork.image.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={artwork.image.blurDataURL}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </div>
              <p className="mt-2 text-right text-xs text-[var(--color-muted)]">
                <span className="hidden sm:inline">Click</span>
                <span className="sm:hidden">Tap</span> to enlarge
              </p>
            </button>
          </div>

          {/* Details panel */}
          <div className="flex flex-col">
            <h1 className="mb-2 font-serif text-3xl md:text-4xl">
              {artwork.title}
            </h1>

            <div className="mb-6 space-y-1 text-sm text-[var(--color-muted)]">
              <p>{artwork.year}</p>
              <p>{artwork.medium}</p>
              <p>{artwork.dimensions}</p>
              {artwork.seriesTitle && (
                <p>
                  Series:{' '}
                  <Link
                    href={`/series/${artwork.series}`}
                    className="text-[var(--color-foreground)] underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
                  >
                    {artwork.seriesTitle}
                  </Link>
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                  artwork.available
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-border)] text-[var(--color-muted)]'
                }`}
              >
                {artwork.available ? 'Available' : 'Sold'}
              </span>
            </div>

            {artwork.description && (
              <p className="mb-8 leading-relaxed text-[var(--color-muted)]">
                {artwork.description}
              </p>
            )}

            {artwork.available && (
              <Link
                href={`/contact?artwork=${artwork.slug}`}
                className="block w-full border border-[var(--color-foreground)] px-8 py-3 text-center text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] sm:inline-block sm:w-auto"
              >
                Inquire
              </Link>
            )}
          </div>
        </div>

        {/* Related works */}
        {relatedArtworks.length > 0 && (
          <section aria-labelledby="related-works-title" className="mt-24">
            <h2
              id="related-works-title"
              className="mb-8 font-serif text-2xl md:text-3xl"
            >
              Related Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedArtworks.map((related) => (
                <Link
                  key={related.id}
                  href={`/gallery/${related.slug}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                  <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-[var(--color-border)]">
                    <Image
                      src={related.image.thumbnailSrc}
                      alt={related.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder={related.image.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={related.image.blurDataURL}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                    />
                  </div>
                  <h3 className="font-serif text-base">{related.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {related.medium}, {related.year}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        artworks={seriesArtworks.length > 1 ? seriesArtworks : [artwork]}
        initialIndex={seriesArtworks.findIndex((a) => a.id === artwork.id)}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
