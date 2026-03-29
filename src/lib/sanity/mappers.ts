import type { Artwork } from '@/types/artwork'
import type { Series } from '@/types/series'
import type { SanityArtwork, SanitySeries } from './types'
import { urlFor } from './image'

export function mapArtwork(doc: SanityArtwork): Artwork {
  return {
    id: doc._id,
    slug: doc.slug.current,
    title: doc.title,
    year: doc.year,
    medium: doc.medium,
    dimensions: doc.dimensions ?? '',
    description: doc.description,
    image: {
      src: urlFor(doc.image).width(800).format('webp').quality(75).url(),
      thumbnailSrc: urlFor(doc.image)
        .width(800)
        .format('webp')
        .quality(75)
        .url(),
      lightboxSrc: urlFor(doc.image)
        .width(3840)
        .format('webp')
        .quality(95)
        .url(),
      alt: doc.image.alt?.trim() || doc.title,
      width: 2400,
      height: 2400,
      blurDataURL: urlFor(doc.image).width(20).blur(50).quality(30).url(),
    },
    series: doc.series?.slug.current,
    seriesTitle: doc.series?.title,
    available: doc.available,
    price: doc.price,
    tags: doc.tags,
  }
}

export function mapSeries(doc: SanitySeries): Series {
  const coverImage = doc.coverImage?.asset
    ? {
        src: urlFor(doc.coverImage)
          .width(1600)
          .format('webp')
          .quality(85)
          .url(),
        thumbnailSrc: urlFor(doc.coverImage)
          .width(1080)
          .format('webp')
          .quality(94)
          .url(),
        lightboxSrc: urlFor(doc.coverImage)
          .width(1600)
          .format('webp')
          .quality(85)
          .url(),
        alt: doc.coverImage.alt ?? doc.title,
        width: 1600,
        height: 1200,
        blurDataURL: urlFor(doc.coverImage)
          .width(20)
          .blur(50)
          .quality(30)
          .url(),
      }
    : null
  return {
    slug: doc.slug.current,
    title: doc.title,
    description: doc.description,
    coverImage,
    year: doc.year ?? '',
  }
}
