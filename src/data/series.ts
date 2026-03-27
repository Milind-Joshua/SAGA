import type { Series } from '@/types/series'

export const allSeries: Series[] = [
  {
    slug: 'coastal',
    title: 'Coastal Light',
    description:
      'A series of oil paintings made along the western coast of Ireland, studying the particular quality of Atlantic light across different seasons and times of day. Each work is painted on location, in a single session.',
    coverImage: {
      src: 'https://picsum.photos/seed/coastal-light-iii/1200/800',
      thumbnailSrc: 'https://picsum.photos/seed/coastal-light-iii/1200/800',
      lightboxSrc: 'https://picsum.photos/seed/coastal-light-iii/1200/800',
      alt: 'Large-scale coastal painting — ochres and slate blues, expressive brushwork',
      width: 1200,
      height: 800,
    },
    year: '2024',
  },
  {
    slug: 'forest',
    title: 'Forest Interiors',
    description:
      'Three large-format paintings made inside the same stand of oak woodland across different seasons. The series is a sustained investigation of light as it moves through an enclosed natural space — its presence, its absence, and everything between.',
    coverImage: {
      src: 'https://picsum.photos/seed/forest-interior-i/1200/800',
      thumbnailSrc: 'https://picsum.photos/seed/forest-interior-i/1200/800',
      lightboxSrc: 'https://picsum.photos/seed/forest-interior-i/1200/800',
      alt: 'Forest interior with dappled light on the floor, dense oak canopy above',
      width: 1200,
      height: 800,
    },
    year: '2023',
  },
  {
    slug: 'still-life',
    title: 'Domestic Studies',
    description:
      'Watercolour studies of ordinary domestic objects — ceramic vessels, cloth, fruit. A quieter counterpoint to the landscape work, concerned with stillness, shadow, and the weight of familiar things.',
    coverImage: {
      src: 'https://picsum.photos/seed/still-life-vessel/1200/800',
      thumbnailSrc: 'https://picsum.photos/seed/still-life-vessel/1200/800',
      lightboxSrc: 'https://picsum.photos/seed/still-life-vessel/1200/800',
      alt: 'Ceramic vessel on linen cloth, soft watercolour washes',
      width: 1200,
      height: 800,
    },
    year: '2023–2024',
  },
]
