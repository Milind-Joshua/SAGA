// ── Shared ────────────────────────────────────────────────────────────────────

export interface SanitySlug {
  current: string
}

// Sanity image field value — includes the asset reference plus any custom fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImageAsset = Record<string, any> & {
  alt?: string
}

// ── Artwork ───────────────────────────────────────────────────────────────────

export interface SanityArtwork {
  _id: string
  slug: SanitySlug
  title: string
  year: number
  medium: string
  dimensions?: string
  description?: string
  image: SanityImageAsset
  series?: { slug: SanitySlug; title: string }
  available: boolean
  price?: number
  tags?: string[]
}

// ── Series ────────────────────────────────────────────────────────────────────

export interface SanitySeries {
  _id: string
  slug: SanitySlug
  title: string
  description: string
  coverImage: SanityImageAsset
  year: string
  artworkCount?: number
}

export interface SanitySeriesWithArtworks extends SanitySeries {
  artworks: SanityArtwork[]
}

// ── Exhibition ────────────────────────────────────────────────────────────────

export interface SanityExhibition {
  _id: string
  title: string
  venue: string
  location?: string
  startDate?: string // ISO date string "YYYY-MM-DD"
  endDate?: string
  status?: 'upcoming' | 'current' | 'past'
  type?: 'solo' | 'group' | 'selected'
  url?: string
  description?: string
}

// ── About ─────────────────────────────────────────────────────────────────────

export interface SanityAbout {
  portrait: SanityImageAsset | null
  studioImages: SanityImageAsset[] | null
}

// ── Home ──────────────────────────────────────────────────────────────────────

export interface SanityHomeFeatured {
  heroImage: SanityImageAsset | null
  featuredArtworks: SanityArtwork[] | null
}
