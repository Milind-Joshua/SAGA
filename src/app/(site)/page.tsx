import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { client } from '@/lib/sanity/client'
import { homeFeaturedQuery, homeAboutQuery } from '@/lib/sanity/queries'
import { mapArtwork } from '@/lib/sanity/mappers'
import { urlFor } from '@/lib/sanity/image'
import type { SanityHomeFeatured, SanityAbout } from '@/lib/sanity/types'
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
  const [featuredData, aboutData] = await Promise.all([
    client.fetch<SanityHomeFeatured>(homeFeaturedQuery),
    client.fetch<SanityAbout>(homeAboutQuery),
  ])

  const featuredArtworks = (featuredData?.featuredArtworks ?? []).map(
    mapArtwork
  )

  // Use dedicated hero image from siteSettings
  const heroImage = featuredData?.heroImage?.asset
    ? {
        src: urlFor(featuredData.heroImage)
          .width(2560)
          .format('webp')
          .quality(95)
          .url(),
        alt:
          featuredData.heroImage.alt ?? 'SAGA — Sangeeth Art Gallery & Atelier',
      }
    : null

  const portraitUrl = aboutData?.portrait?.asset
    ? urlFor(aboutData.portrait).width(800).format('webp').quality(85).url()
    : null

  const studioImages = aboutData?.studioImages ?? []
  // Mirror About page: Atelier uses studioImages[1], falling back to studioImages[0]
  const studioImageSource = studioImages[1]?.asset
    ? studioImages[1]
    : (studioImages[0] ?? null)
  const studioImageUrl = studioImageSource?.asset
    ? urlFor(studioImageSource).width(2560).format('webp').quality(95).url()
    : null

  return (
    <>
      <h1 className="sr-only">SAGA — Sangeeth Art Gallery &amp; Atelier</h1>
      <Hero image={heroImage} />
      <FeaturedWorks artworks={featuredArtworks} />
      <AboutTeaser portraitUrl={portraitUrl} />
      <StudioTeaser imageUrl={studioImageUrl} />
    </>
  )
}
