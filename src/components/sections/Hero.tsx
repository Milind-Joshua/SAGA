'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

interface HeroProps {
  image?: {
    src: string
    alt: string
    blurDataURL?: string
  } | null
  title?: string
  tagline?: string
}

export function Hero({
  image = null,
  title = 'Sangeeth',
  tagline = 'Original works in oil, watercolour, and mixed media',
}: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Hide scroll indicator after 100px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Letters: y 40 → 0, stagger 0.04s, delay 0.3s
        tl.from(lettersRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          delay: 0.3,
        })

        // Subtitle: y 20, opacity 0 → 1 at 0.9s from start
        tl.from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.9)

        // CTA: opacity 0 → 1 at 1.3s from start
        tl.from(ctaRef.current, { opacity: 0, duration: 0.5 }, 1.3)

        // Scroll indicator: fade in at 1.6s
        tl.from(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 }, 1.6)
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  const letters = title.split('')

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className="relative flex h-[calc(100vh-73px)] min-h-[560px] items-end overflow-hidden"
    >
      {/* Full-bleed image — or dark gradient background when no image is set */}
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className="object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950"
        />
      )}

      {/* Dark gradient overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      {/* Linen/canvas texture layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='l'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23l)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'multiply',
          opacity: 0.08,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <h1
          id="hero-title"
          className="mb-4 font-serif text-4xl text-white sm:text-5xl md:text-7xl"
          aria-label={title}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el
              }}
              className="inline-block"
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="mb-8 max-w-md text-base text-white/80 sm:text-lg md:text-xl"
        >
          {tagline}
        </p>
        <Link
          ref={ctaRef}
          href="/gallery"
          className="block w-full rounded-none border border-white px-8 py-3 text-center text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white sm:inline-block sm:w-auto"
        >
          View Gallery
        </Link>
      </div>

      {/* Scroll indicator — 1px vertical line with pulse */}
      <div
        ref={scrollIndicatorRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
      >
        <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
          Scroll
        </span>
        <div className="h-12 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  )
}
