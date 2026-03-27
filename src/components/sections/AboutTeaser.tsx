'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export function AboutTeaser() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="about-teaser-title"
      className="bg-[var(--color-border)]/20 py-[var(--spacing-section)]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          <h2
            id="about-teaser-title"
            className="mb-6 font-serif text-3xl md:text-4xl"
          >
            About the Artist
          </h2>
          <p className="mb-4 leading-relaxed text-[var(--color-muted)]">
            Sangeeth is a painter and draughtsperson working across oil,
            watercolour, and mixed media. Her work explores the quiet intensity
            of everyday landscapes — coastal light, forest interiors, domestic
            still lives — rendered with a disciplined yet expressive hand.
          </p>
          <p className="mb-8 leading-relaxed text-[var(--color-muted)]">
            Based between Dublin and the west coast of Ireland, she exhibits
            regularly across Europe and maintains a working studio open to
            collectors by appointment.
          </p>
          <Link
            href="/about"
            className="inline-block border-b border-[var(--color-foreground)] pb-1 text-sm tracking-widest uppercase transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            About the artist
          </Link>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            delay: reducedMotion ? 0 : 0.15,
            ease: 'easeOut',
          }}
          className="relative aspect-[4/5] overflow-hidden bg-[var(--color-border)]"
        >
          <Image
            src="https://picsum.photos/seed/saga-about/800/1000"
            alt="Sangeeth in her studio, standing before a large canvas"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="empty"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
