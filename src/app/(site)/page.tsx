import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { client } from '@/lib/sanity/client'
import { homeFeaturedQuery } from '@/lib/sanity/queries'
import { mapArtwork } from '@/lib/sanity/mappers'
import type { SanityHomeFeatured } from '@/lib/sanity/types'
import { Hero } from '@/components/sections/Hero'
import { FeaturedWorks } from '@/components/sections/FeaturedWorks'

const AboutTeaser = dynamic(() =>
  import('@/components/sections/AboutTeaser').then((m) => m.AboutTeaser)
)
const StudioTeaser = dynamic(() =>
  import('@/components/sections/StudioTeaser').then((m) => m.StudioTeaser)
)

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'SAGA — Sangeeth Art Gallery & Atelier',
  description:
    'Original works in oil, watercolour, and mixed media by Sangeeth. Paintings, drawings, and prints available to collectors worldwide.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SAGA — Sangeeth Art Gallery & Atelier',
    description:
      'Original works in oil, watercolour, and mixed media by Sangeeth. Paintings, drawings, and prints available to collectors worldwide.',
    type: 'website',
    url: '/',
  },
}

export default async function HomePage() {
  const data = await client.fetch<SanityHomeFeatured>(homeFeaturedQuery)
  const featuredArtworks = (data?.featuredArtworks ?? []).map(mapArtwork)

  return (
    <>
      <h1 className="sr-only">SAGA — Sangeeth Art Gallery &amp; Atelier</h1>
      <Hero />
      <FeaturedWorks artworks={featuredArtworks} />
      <AboutTeaser />
      <StudioTeaser />
    </>
  )
}
