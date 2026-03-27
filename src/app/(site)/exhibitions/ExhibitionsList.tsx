'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { SanityExhibition } from '@/lib/sanity/types'

const TYPE_LABEL: Record<'solo' | 'group' | 'selected', string> = {
  solo: 'Solo',
  group: 'Group',
  selected: 'Selected',
}

function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate) return ''
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  const startStr = start.toLocaleDateString('en-IE', {
    month: 'long',
    year: 'numeric',
  })
  if (!end) return startStr
  const endStr = end.toLocaleDateString('en-IE', {
    month: 'long',
    year: 'numeric',
  })
  // Same year: "January – March 2024", different years: "Dec 2023 – Jan 2024"
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-IE', { month: 'long' })} – ${endStr}`
  }
  return `${startStr} – ${endStr}`
}

function ExhibitionRow({
  exhibition,
  delay,
}: {
  exhibition: SanityExhibition
  delay: number
}) {
  const reducedMotion = useReducedMotion()
  const year = exhibition.startDate
    ? new Date(exhibition.startDate).getFullYear()
    : null
  const dateRange = formatDateRange(exhibition.startDate, exhibition.endDate)

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
        {year}
      </span>

      <div>
        <h3 className="font-serif text-lg leading-snug">{exhibition.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {exhibition.venue}
          {exhibition.location ? ` \u2014 ${exhibition.location}` : ''}
        </p>
        {exhibition.description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
            {exhibition.description}
          </p>
        )}
        {dateRange && (
          <p className="mt-2 text-xs text-[var(--color-muted)]">{dateRange}</p>
        )}
      </div>

      {exhibition.type && (
        <span
          className={`self-start justify-self-start rounded-none px-2 py-0.5 text-xs tracking-widest uppercase sm:justify-self-end ${
            exhibition.type === 'solo'
              ? 'bg-[var(--color-accent)] text-white'
              : 'border border-[var(--color-border)] text-[var(--color-muted)]'
          }`}
        >
          {TYPE_LABEL[exhibition.type]}
        </span>
      )}
    </motion.article>
  )
}

interface ExhibitionsListProps {
  exhibitions: SanityExhibition[]
}

export function ExhibitionsList({ exhibitions }: ExhibitionsListProps) {
  const byYear = exhibitions.reduce<Record<number, SanityExhibition[]>>(
    (acc, ex) => {
      const year = ex.startDate ? new Date(ex.startDate).getFullYear() : 0
      ;(acc[year] ??= []).push(ex)
      return acc
    },
    {}
  )

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-16">
      {years.map((year) => (
        <section key={year} aria-labelledby={`year-${year}`}>
          <h2
            id={`year-${year}`}
            className="mb-4 font-serif text-2xl text-[var(--color-accent)]"
          >
            {year || 'Undated'}
          </h2>
          <div>
            {byYear[year].map((ex, i) => (
              <ExhibitionRow key={ex._id} exhibition={ex} delay={i * 0.07} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
