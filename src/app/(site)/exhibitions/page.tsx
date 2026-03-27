'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { allExhibitions, type Exhibition } from '@/data/exhibitions'

const TYPE_LABEL: Record<Exhibition['type'], string> = {
  solo: 'Solo',
  group: 'Group',
  selected: 'Selected',
}

function ExhibitionRow({
  exhibition,
  delay,
}: {
  exhibition: Exhibition
  delay: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay: reducedMotion ? 0 : delay,
        ease: 'easeOut' as const,
      }}
      className="grid grid-cols-1 gap-2 border-b border-[var(--color-border)] py-8 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8"
    >
      <span className="w-20 shrink-0 text-sm text-[var(--color-accent)]">
        {exhibition.dates.split(' ').slice(-1)[0]}
      </span>

      <div>
        <h3 className="font-serif text-lg leading-snug">{exhibition.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {exhibition.venue} &mdash; {exhibition.location}
        </p>
        {exhibition.description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
            {exhibition.description}
          </p>
        )}
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          {exhibition.dates}
        </p>
      </div>

      <span
        className={`self-start justify-self-start rounded-none px-2 py-0.5 text-xs tracking-widest uppercase sm:justify-self-end ${
          exhibition.type === 'solo'
            ? 'bg-[var(--color-accent)] text-white'
            : 'border border-[var(--color-border)] text-[var(--color-muted)]'
        }`}
      >
        {TYPE_LABEL[exhibition.type]}
      </span>
    </motion.article>
  )
}

export default function ExhibitionsPage() {
  const byYear = allExhibitions.reduce<Record<number, Exhibition[]>>(
    (acc, ex) => {
      ;(acc[ex.year] ??= []).push(ex)
      return acc
    },
    {}
  )

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main id="main-content" className="py-[var(--spacing-section)]">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 border-b border-[var(--color-border)] pb-10">
          <h1 className="font-serif text-4xl md:text-5xl">Exhibitions</h1>
          <p className="mt-4 text-[var(--color-muted)]">
            Solo, group, and selected exhibitions, 2016–present.
          </p>
        </header>

        <div className="space-y-16">
          {years.map((year) => (
            <section key={year} aria-labelledby={`year-${year}`}>
              <h2
                id={`year-${year}`}
                className="mb-4 font-serif text-2xl text-[var(--color-accent)]"
              >
                {year}
              </h2>
              <div>
                {byYear[year].map((ex, i) => (
                  <ExhibitionRow key={ex.id} exhibition={ex} delay={i * 0.07} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 border-t border-[var(--color-border)] pt-12 text-center">
          <p className="mb-6 text-[var(--color-muted)]">
            Interested in showing work, or attending a future exhibition?
          </p>
          <Link
            href="/contact"
            className="inline-block border border-[var(--color-foreground)] px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  )
}
