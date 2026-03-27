import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { seriesBySlugQuery, allSeriesSlugsQuery } from '@/lib/sanity/queries'
import { mapArtwork, mapSeries } from '@/lib/sanity/mappers'
import { urlFor } from '@/lib/sanity/image'
import type { SanitySeriesWithArtworks } from '@/lib/sanity/types'
import { SeriesHero } from '@/components/sections/SeriesHero'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'

export const revalidate = 3600

interface SeriesPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allSeriesSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch<SanitySeriesWithArtworks | null>(
    seriesBySlugQuery,
    { slug }
  )
  if (!doc) return {}
  const ogImage = urlFor(doc.coverImage)
    .width(1200)
    .height(630)
    .fit('crop')
    .url()
  return {
    title: `${doc.title} — Sangeeth`,
    description: doc.description,
    alternates: { canonical: `/series/${slug}` },
    openGraph: {
      title: `${doc.title} — Sangeeth`,
      description: doc.description,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: doc.title }],
    },
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params
  const doc = await client.fetch<SanitySeriesWithArtworks | null>(
    seriesBySlugQuery,
    { slug }
  )
  if (!doc) notFound()

  const series = mapSeries(doc)
  const artworks = (doc.artworks ?? []).map(mapArtwork)

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
