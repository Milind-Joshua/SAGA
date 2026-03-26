export interface Artwork {
  id: string
  slug: string
  title: string
  year: number
  medium: string
  dimensions: string
  image: {
    src: string
    alt: string
    width: number
    height: number
    blurDataURL?: string
  }
  series?: string
  available?: boolean
}
