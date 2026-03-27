import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allSeries } from '@/data/series'
import { allArtworks } from '@/data/artworks'
import { SeriesHero } from '@/components/sections/SeriesHero'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'

interface SeriesPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allSeries.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params
  const series = allSeries.find((s) => s.slug === slug)
  if (!series) return {}
  return {
    title: `${series.title} — Sangeeth`,
    description: series.description,
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params
  const series = allSeries.find((s) => s.slug === slug)
  if (!series) notFound()

  const artworks = allArtworks.filter((a) => a.series === slug)

  return (
    <main id="main-content">
      <SeriesHero series={series} artworkCount={artworks.length} />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <Link
            href="/series"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
          >
            <span aria-hidden="true">←</span> All Series
          </Link>
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--color-muted)]">
            {series.description}
          </p>
        </div>

        <GalleryGrid artworks={artworks} />
      </div>
    </main>
  )
}
