import type { Series } from '@/types/series'

// All images are public domain paintings sourced from The Metropolitan Museum of Art Open Access
const M = 'https://images.metmuseum.org/CRDImages/ep/web-large'

export const allSeries: Series[] = [
  {
    slug: 'coastal',
    title: 'Coastal Light',
    description:
      'A series of oil paintings made along the western coast of Ireland, studying the particular quality of Atlantic light across different seasons and times of day. Each work is painted on location, in a single session.',
    coverImage: {
      src: `${M}/DP169472.jpg`,
      alt: 'Eugène Isabey — A Storm off the Normandy Coast, 1856, oil on canvas',
      width: 1024,
      height: 768,
    },
    year: '2024',
  },
  {
    slug: 'forest',
    title: 'Forest Interiors',
    description:
      'Three large-format paintings made inside the same stand of oak woodland across different seasons. The series is a sustained investigation of light as it moves through an enclosed natural space — its presence, its absence, and everything between.',
    coverImage: {
      src: `${M}/DP-31520-001.jpg`,
      alt: 'Théodore Rousseau — The Forest in Winter at Sunset, ca. 1846–67, oil on canvas',
      width: 1024,
      height: 754,
    },
    year: '2023',
  },
  {
    slug: 'still-life',
    title: 'Domestic Studies',
    description:
      'Watercolour studies of ordinary domestic objects — ceramic vessels, cloth, fruit. A quieter counterpoint to the landscape work, concerned with stillness, shadow, and the weight of familiar things.',
    coverImage: {
      src: `${M}/DT47.jpg`,
      alt: 'Paul Cézanne — Still Life with Apples and Primroses, ca. 1890, oil on canvas',
      width: 1024,
      height: 818,
    },
    year: '2023–2024',
  },
]
