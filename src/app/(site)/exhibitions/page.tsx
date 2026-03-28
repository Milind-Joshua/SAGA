import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { allExhibitionsQuery } from '@/lib/sanity/queries'
import type { SanityExhibition } from '@/lib/sanity/types'
import { ExhibitionsList } from './ExhibitionsList'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Exhibitions — Sangeeth',
  description:
    'Solo, group, and selected exhibitions by Sangeeth, 2016–present.',
  alternates: { canonical: '/exhibitions' },
  openGraph: {
    title: 'Exhibitions — Sangeeth',
    description:
      'Solo, group, and selected exhibitions by Sangeeth, 2016–present.',
    type: 'website',
  },
}

export default async function ExhibitionsPage() {
  const exhibitions =
    await client.fetch<SanityExhibition[]>(allExhibitionsQuery)

  return (
    <div className="py-[var(--spacing-section)]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <header className="mb-16 border-b border-[var(--color-border)] pb-10">
          <h1 className="font-serif text-4xl md:text-5xl">Exhibitions</h1>
          <p className="mt-4 text-[var(--color-muted)]">
            Solo, group, and selected exhibitions, 2016–present.
          </p>
        </header>

        <ExhibitionsList exhibitions={exhibitions} />

        {/* CTA */}
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
    </div>
  )
}
