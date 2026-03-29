'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Artwork } from '@/types/artwork'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ArtworkCardProps {
  artwork: Artwork
  index?: number
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const articleRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: articleRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        )

        gsap.fromTo(
          textRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: articleRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })
      return () => mm.revert()
    },
    { scope: articleRef }
  )

  return (
    <article ref={articleRef} data-testid="artwork-card">
      <Link
        href={`/gallery/${artwork.slug}`}
        className="group block focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <div
          ref={imageContainerRef}
          className="relative mb-4 aspect-[3/4] overflow-hidden bg-[var(--color-border)]"
        >
          <Image
            src={artwork.image.thumbnailSrc}
            alt={artwork.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            placeholder={artwork.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={artwork.image.blurDataURL}
            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.02] motion-reduce:transition-none"
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
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100 [@media(hover:none)]:opacity-100">
            <div className="translate-y-2 transition-transform duration-300 will-change-transform group-hover:translate-y-0 motion-reduce:translate-y-0 [@media(hover:none)]:translate-y-0">
              <p className="text-sm text-white/80">{artwork.medium}</p>
            </div>
          </div>
        </div>
        <div ref={textRef}>
          <h2 className="font-serif text-lg leading-tight">{artwork.title}</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {artwork.year} · {artwork.dimensions}
          </p>
        </div>
      </Link>
    </article>
  )
}
