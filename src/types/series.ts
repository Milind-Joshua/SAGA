import type { ArtworkImage } from './artwork'

export interface Series {
  slug: string
  title: string
  description: string
  coverImage: ArtworkImage
  year: string
}
