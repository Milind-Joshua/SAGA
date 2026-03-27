import type { Series } from '@/types/series'

const W = 'https://upload.wikimedia.org/wikipedia/commons/thumb'

export const allSeries: Series[] = [
  {
    slug: 'coastal',
    title: 'Coastal Light',
    description:
      'A series of oil paintings made along the western coast of Ireland, studying the particular quality of Atlantic light across different seasons and times of day. Each work is painted on location, in a single session.',
    coverImage: {
      src: `${W}/6/6a/Gustave_Courbet_-_The_Wave_-_WGA5526.jpg/1024px-Gustave_Courbet_-_The_Wave_-_WGA5526.jpg`,
      alt: 'Gustave Courbet — The Wave, 1870, oil on canvas',
      width: 1024,
      height: 724,
    },
    year: '2024',
  },
  {
    slug: 'forest',
    title: 'Forest Interiors',
    description:
      'Three large-format paintings made inside the same stand of oak woodland across different seasons. The series is a sustained investigation of light as it moves through an enclosed natural space — its presence, its absence, and everything between.',
    coverImage: {
      src: `${W}/a/af/Ivan_Shishkin_-_Morning_in_a_Pine_Forest_-_Google_Art_Project.jpg/1024px-Ivan_Shishkin_-_Morning_in_a_Pine_Forest_-_Google_Art_Project.jpg`,
      alt: 'Ivan Shishkin — Morning in a Pine Forest, 1889, oil on canvas',
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
      src: `${W}/2/2e/Paul_C%C3%A9zanne_-_Apples_and_Oranges_-_Google_Art_Project.jpg/1024px-Paul_C%C3%A9zanne_-_Apples_and_Oranges_-_Google_Art_Project.jpg`,
      alt: 'Paul Cézanne — Apples and Oranges, c.1899, oil on canvas',
      width: 1024,
      height: 818,
    },
    year: '2023–2024',
  },
]
