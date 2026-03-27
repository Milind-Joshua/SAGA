import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import {
  artworkBySlugQuery,
  allArtworksQuery,
  allArtworkSlugsQuery,
} from '@/lib/sanity/queries'
import { mapArtwork } from '@/lib/sanity/mappers'
import { urlFor } from '@/lib/sanity/image'
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
  const ogImage = urlFor(doc.image).width(1200).height(630).fit('crop').url()
  const description =
    doc.description ??
    `${doc.title}, ${doc.medium}${doc.dimensions ? ', ' + doc.dimensions : ''}, ${doc.year}.`
  return {
    title: `${doc.title} — Sangeeth`,
    description,
    alternates: { canonical: `/gallery/${slug}` },
    openGraph: {
      title: `${doc.title} — Sangeeth`,
      description,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: doc.title }],
    },
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    description: artwork.description,
    image: artwork.image.src,
    url: `${siteUrl}/gallery/${artwork.slug}`,
    dateCreated: String(artwork.year),
    artMedium: artwork.medium,
    artworkSurface: artwork.dimensions,
    creator: {
      '@type': 'Person',
      name: 'Sangeeth',
      url: siteUrl,
    },
    ...(artwork.available
      ? {
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: `${siteUrl}/contact?artwork=${artwork.slug}`,
          },
        }
      : {}),
  }

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={related}
        seriesArtworks={seriesArtworks}
      />
    </main>
  )
}
