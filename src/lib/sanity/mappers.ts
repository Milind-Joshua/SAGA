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
      src: urlFor(doc.image).width(1200).url(),
      alt: doc.image.alt ?? doc.title,
      width: 1200,
      height: 1200,
    },
    series: doc.series?.slug.current,
    seriesTitle: doc.series?.title,
    available: doc.available,
    price: doc.price,
    tags: doc.tags,
  }
}

export function mapSeries(doc: SanitySeries): Series {
  return {
    slug: doc.slug.current,
    title: doc.title,
    description: doc.description,
    coverImage: {
      src: urlFor(doc.coverImage).width(1200).url(),
      alt: doc.coverImage.alt ?? doc.title,
      width: 1200,
      height: 800,
    },
    year: doc.year ?? '',
  }
}
