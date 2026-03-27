import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import {
  artworkBySlugQuery,
  allArtworksQuery,
  allArtworkSlugsQuery,
} from '@/lib/sanity/queries'
import { mapArtwork } from '@/lib/sanity/mappers'
import type { SanityArtwork } from '@/lib/sanity/types'
import { ArtworkDetail } from '@/components/gallery/ArtworkDetail'

export const revalidate = 3600

interface ArtworkPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allArtworkSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch<SanityArtwork | null>(artworkBySlugQuery, {
    slug,
  })
  if (!doc) return {}
  return {
    title: `${doc.title} — Sangeeth`,
    description:
      doc.description ??
      `${doc.title}, ${doc.medium}${doc.dimensions ? ', ' + doc.dimensions : ''}, ${doc.year}.`,
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params

  const [doc, allDocs] = await Promise.all([
    client.fetch<SanityArtwork | null>(artworkBySlugQuery, { slug }),
    client.fetch<SanityArtwork[]>(allArtworksQuery),
  ])

  if (!doc) notFound()

  const artwork = mapArtwork(doc)
  const allArtworks = allDocs.map(mapArtwork)

  // Related: same series (excl. self), or same tags, capped at 3
  const related = allArtworks
    .filter((a) => {
      if (a.id === artwork.id) return false
      if (artwork.series && a.series === artwork.series) return true
      if (!artwork.series && a.tags?.some((t) => artwork.tags?.includes(t)))
        return true
      return false
    })
    .slice(0, 3)

  // All artworks in the same series (for lightbox navigation)
  const seriesArtworks = artwork.series
    ? allArtworks.filter((a) => a.series === artwork.series)
    : [artwork]

  return (
    <main id="main-content">
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={related}
        seriesArtworks={seriesArtworks}
      />
    </main>
  )
}
