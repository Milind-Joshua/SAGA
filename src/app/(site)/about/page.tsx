import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { AboutPageContent } from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About — SAGA',
  description:
    'About Sangeeth — painter and draughtsperson working in oil, watercolour, and mixed media.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const about = await client.fetch(aboutQuery)

  const heroImageUrl = about?.studioImages?.[0]?.asset
    ? urlFor(about.studioImages[0]).width(2560).format('webp').quality(95).url()
    : null

  const portraitUrl = about?.portrait?.asset
    ? urlFor(about.portrait).width(800).format('webp').quality(85).url()
    : null

  const studioImageUrl = about?.atelierImage?.asset
    ? urlFor(about.atelierImage).width(2560).format('webp').quality(95).url()
    : about?.studioImages?.[1]?.asset
      ? urlFor(about.studioImages[1])
          .width(2560)
          .format('webp')
          .quality(95)
          .url()
      : null

  return (
    <AboutPageContent
      heroImageUrl={heroImageUrl}
      portraitUrl={portraitUrl}
      studioImageUrl={studioImageUrl}
    />
  )
}
