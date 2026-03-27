import { groq } from 'next-sanity'

// ── Artworks ─────────────────────────────────────────────────────────────────

/** All artworks, ordered by year descending */
export const allArtworksQuery = groq`*[_type == "artwork"] | order(year desc) {
  _id, slug, title, year, medium, dimensions, description,
  image, series->{slug, title}, available, price, tags
}`

/** Single artwork by slug */
export const artworkBySlugQuery = groq`*[_type == "artwork" && slug.current == $slug][0] {
  _id, slug, title, year, medium, dimensions, description,
  image, series->{slug, title, description}, available, price, tags
}`

// ── Series ───────────────────────────────────────────────────────────────────

/** All series with artwork counts */
export const allSeriesQuery = groq`*[_type == "series"] | order(title asc) {
  _id, slug, title, description, coverImage, year,
  "artworkCount": count(*[_type == "artwork" && references(^._id)])
}`

/** Single series with its artworks */
export const seriesBySlugQuery = groq`*[_type == "series" && slug.current == $slug][0] {
  _id, slug, title, description, coverImage, year,
  "artworks": *[_type == "artwork" && references(^._id)] | order(year desc) {
    _id, slug, title, year, medium, image, available
  }
}`

// ── Exhibitions ──────────────────────────────────────────────────────────────

/** All exhibitions, ordered by start date descending */
export const allExhibitionsQuery = groq`*[_type == "exhibition"] | order(startDate desc) {
  _id, title, venue, location, startDate, endDate, status, type, url, description
}`

// ── About ────────────────────────────────────────────────────────────────────

/** About page singleton content */
export const aboutQuery = groq`*[_type == "about"][0] {
  artistName, tagline, bio, statement, pullQuote,
  portrait, studioImages, techniques
}`

// ── Home Page ────────────────────────────────────────────────────────────────

/** Featured artworks from site settings for the home page */
export const homeFeaturedQuery = groq`*[_type == "siteSettings"][0] {
  "featuredArtworks": featuredArtworks[]->{
    _id, slug, title, year, medium, image, available
  }
}`

// ── Slugs (for generateStaticParams) ─────────────────────────────────────────

/** All artwork slugs */
export const allArtworkSlugsQuery = groq`*[_type == "artwork"].slug.current`

/** All series slugs */
export const allSeriesSlugsQuery = groq`*[_type == "series"].slug.current`
