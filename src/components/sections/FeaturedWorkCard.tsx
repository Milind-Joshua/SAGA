'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Artwork } from '@/types/artwork'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface FeaturedWorkCardProps {
  artwork: Artwork
  index: number
}

export function FeaturedWorkCard({ artwork, index }: FeaturedWorkCardProps) {
  const articleRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const staggerDelay = index * 0.12

        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            delay: staggerDelay,
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
            delay: staggerDelay + 0.15,
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
    <article ref={articleRef}>
      <Link
        href={`/gallery/${artwork.slug}`}
        className="group block focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <div
          ref={imageContainerRef}
          className="relative mb-4 aspect-[4/5] overflow-hidden bg-[var(--color-border)]"
        >
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
        <div
          ref={textRef}
          className="transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"
        >
          <h3 className="font-serif text-lg">{artwork.title}</h3>
          <p className="text-sm text-[var(--color-muted)]">
            {artwork.medium}, {artwork.year}
          </p>
        </div>
      </Link>
    </article>
  )
}
