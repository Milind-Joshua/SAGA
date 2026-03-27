import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { FeaturedWorks } from '@/components/sections/FeaturedWorks'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { StudioTeaser } from '@/components/sections/StudioTeaser'
import { featuredArtworks } from '@/data/artworks'

export const metadata: Metadata = {
  title: 'SAGA — Sangeeth Art Gallery & Atelier',
  description:
    'Original works in oil, watercolour, and mixed media by Sangeeth. Paintings, drawings, and prints available to collectors worldwide.',
}

export default function HomePage() {
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
