import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allArtworks } from '@/data/artworks'
import { ArtworkDetail } from '@/components/gallery/ArtworkDetail'

interface ArtworkPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allArtworks.map((artwork) => ({ slug: artwork.slug }))
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params
  const artwork = allArtworks.find((a) => a.slug === slug)
  if (!artwork) return {}
  return {
    title: `${artwork.title} — Sangeeth`,
    description:
      artwork.description ??
      `${artwork.title}, ${artwork.medium}, ${artwork.dimensions}, ${artwork.year}.`,
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params
  const artwork = allArtworks.find((a) => a.slug === slug)
  if (!artwork) notFound()

  // Related: same series (excl. self), or same medium tag, capped at 3
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
