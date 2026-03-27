export interface ArtworkImage {
  src: string
  thumbnailSrc: string
  lightboxSrc: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

export interface Artwork {
  id: string
  slug: string
  title: string
  year: number
  medium: string
  dimensions: string
  description?: string
  image: ArtworkImage
  series?: string
  seriesTitle?: string
  available: boolean
  price?: number
  tags?: string[]
}
