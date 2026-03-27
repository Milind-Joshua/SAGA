'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface StudioTeaserProps {
  imageUrl?: string | null
}

export function StudioTeaser({ imageUrl }: StudioTeaserProps) {
  const reducedMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="studio-teaser-title"
      className="relative overflow-hidden"
    >
      {/* Full-width studio image */}
      <div className="relative aspect-[16/9] min-h-[400px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="The SAGA atelier — a bright, north-facing studio with works in progress and shelves of pigments"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900" />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              ease: 'easeOut',
            }}
            className="w-full max-w-2xl text-center text-white"
          >
            <h2
              id="studio-teaser-title"
              className="mb-4 font-serif text-3xl md:text-5xl"
            >
              The Atelier
            </h2>
            <p className="mb-8 text-white/80">
              A working studio in the west of Ireland, open to collectors and
              patrons by appointment. See works in progress, discuss
              commissions, and experience art in the space it was made.
            </p>
            <Link
              href="/about#atelier"
              className="block w-full border border-white px-8 py-3 text-center text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white sm:inline-block sm:w-auto"
            >
              Visit the Studio
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
