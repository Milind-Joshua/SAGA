import type { Artwork } from '@/types/artwork'

// All images are public domain paintings sourced from Wikimedia Commons
const W = 'https://upload.wikimedia.org/wikipedia/commons/thumb'

export const allArtworks: Artwork[] = [
  // ── Coastal series ──────────────────────────────────────────────────────────
  {
    id: '1',
    slug: 'coastal-light-i',
    title: 'Coastal Light I',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '80 × 100 cm',
    description:
      'Warm ochres dissolve into deep indigo where the sea meets a hazy horizon. Painted on a single overcast morning, this work captures the transient quality of Atlantic light before the tide turns.',
    image: {
      src: `${W}/6/6a/Gustave_Courbet_-_The_Wave_-_WGA5526.jpg/1024px-Gustave_Courbet_-_The_Wave_-_WGA5526.jpg`,
      alt: 'Gustave Courbet — The Wave, 1870, oil on canvas',
      width: 1024,
      height: 724,
    },
    series: 'coastal',
    seriesTitle: 'Coastal Light',
    available: true,
    tags: ['oil', 'landscape', 'coastal'],
  },
  {
    id: '2',
    slug: 'coastal-light-ii',
    title: 'Coastal Light II',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '80 × 100 cm',
    description:
      'A companion piece to Coastal Light I, painted the following dawn. The palette shifts toward silvery lilac as morning mist lifts from the water, revealing a flat calm beneath.',
    image: {
      src: `${W}/e/ed/J._M._W._Turner_-_Fishermen_at_Sea_-_Google_Art_Project.jpg/1024px-J._M._W._Turner_-_Fishermen_at_Sea_-_Google_Art_Project.jpg`,
      alt: 'J.M.W. Turner — Fishermen at Sea, 1796, oil on canvas',
      width: 1024,
      height: 766,
    },
    series: 'coastal',
    seriesTitle: 'Coastal Light',
    available: false,
    tags: ['oil', 'landscape', 'coastal'],
  },
  {
    id: '3',
    slug: 'coastal-light-iii',
    title: 'Coastal Light III',
    year: 2024,
    medium: 'Oil on linen',
    dimensions: '100 × 120 cm',
    description:
      'The largest of the Coastal Light series. Broken brushwork and scraping techniques evoke the restless energy of a western shore in autumn — the canvas itself retains the texture of wind.',
    image: {
      src: `${W}/a/a5/Winslow_Homer_-_Breezing_Up_%28A_Fair_Wind%29_-_Google_Art_Project.jpg/1024px-Winslow_Homer_-_Breezing_Up_%28A_Fair_Wind%29_-_Google_Art_Project.jpg`,
      alt: 'Winslow Homer — Breezing Up (A Fair Wind), 1876, oil on canvas',
      width: 1024,
      height: 731,
    },
    series: 'coastal',
    seriesTitle: 'Coastal Light',
    available: true,
    tags: ['oil', 'landscape', 'coastal'],
  },

  // ── Forest series ────────────────────────────────────────────────────────────
  {
    id: '4',
    slug: 'forest-interior-i',
    title: 'Forest Interior I',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '90 × 120 cm',
    description:
      'Entering a dense stand of oak in late afternoon, light pools on the forest floor in isolated patches. The painting explores the relationship between darkness and luminosity in enclosed natural spaces.',
    image: {
      src: `${W}/a/af/Ivan_Shishkin_-_Morning_in_a_Pine_Forest_-_Google_Art_Project.jpg/1024px-Ivan_Shishkin_-_Morning_in_a_Pine_Forest_-_Google_Art_Project.jpg`,
      alt: 'Ivan Shishkin — Morning in a Pine Forest, 1889, oil on canvas',
      width: 1024,
      height: 754,
    },
    series: 'forest',
    seriesTitle: 'Forest Interiors',
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },
  {
    id: '5',
    slug: 'forest-interior-ii',
    title: 'Forest Interior II',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '90 × 120 cm',
    description:
      'A winter version of the same woodland — stripped of leaf, the canopy opens and cold blue sky presses through bare branches. The palette is deliberately austere: charcoal, pale ash, a thread of yellow.',
    image: {
      src: `${W}/b/b9/Caspar_David_Friedrich_-_Der_Chasseur_im_Walde.jpg/830px-Caspar_David_Friedrich_-_Der_Chasseur_im_Walde.jpg`,
      alt: 'Caspar David Friedrich — Der Chasseur im Walde, 1814, oil on canvas',
      width: 830,
      height: 1024,
    },
    series: 'forest',
    seriesTitle: 'Forest Interiors',
    available: false,
    tags: ['oil', 'landscape', 'forest'],
  },
  {
    id: '6',
    slug: 'forest-interior-iii',
    title: 'Forest Interior III',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '120 × 90 cm',
    description:
      'Dappled light filtering through a dense forest canopy, painted with loose expressive brushwork. The horizontal format emphasises the depth of the woodland rather than its height.',
    image: {
      src: `${W}/3/3c/Ivan_Shishkin_-_The_Rye_-_Google_Art_Project.jpg/1024px-Ivan_Shishkin_-_The_Rye_-_Google_Art_Project.jpg`,
      alt: 'Ivan Shishkin — The Rye, 1878, oil on canvas',
      width: 1024,
      height: 691,
    },
    series: 'forest',
    seriesTitle: 'Forest Interiors',
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },

  // ── Still Life series ────────────────────────────────────────────────────────
  {
    id: '7',
    slug: 'still-life-with-vessel',
    title: 'Still Life with Vessel',
    year: 2024,
    medium: 'Watercolour on paper',
    dimensions: '50 × 70 cm',
    description:
      'A simple ceramic vessel on a linen cloth, rendered in translucent watercolour washes. The painting is as much about the shadow the object casts as about the object itself.',
    image: {
      src: `${W}/b/b8/Jean-Baptiste-Sim%C3%A9on_Chardin_-_The_Silver_Goblet_-_WGA4757.jpg/750px-Jean-Baptiste-Sim%C3%A9on_Chardin_-_The_Silver_Goblet_-_WGA4757.jpg`,
      alt: 'Jean-Baptiste-Siméon Chardin — The Silver Goblet, c.1728, oil on canvas',
      width: 750,
      height: 895,
    },
    series: 'still-life',
    seriesTitle: 'Domestic Studies',
    available: false,
    tags: ['watercolour', 'still life'],
  },
  {
    id: '8',
    slug: 'still-life-with-pears',
    title: 'Still Life with Pears',
    year: 2024,
    medium: 'Watercolour on paper',
    dimensions: '50 × 70 cm',
    description:
      'Three pears arranged on a stone windowsill. The work is part of a domestic study practice — returning to ordinary objects with fresh eyes, seeking the monumental within the quotidian.',
    image: {
      src: `${W}/2/2e/Paul_C%C3%A9zanne_-_Apples_and_Oranges_-_Google_Art_Project.jpg/1024px-Paul_C%C3%A9zanne_-_Apples_and_Oranges_-_Google_Art_Project.jpg`,
      alt: 'Paul Cézanne — Apples and Oranges, c.1899, oil on canvas',
      width: 1024,
      height: 818,
    },
    series: 'still-life',
    seriesTitle: 'Domestic Studies',
    available: true,
    tags: ['watercolour', 'still life'],
  },
  {
    id: '9',
    slug: 'still-life-with-cloth',
    title: 'Still Life with Cloth',
    year: 2023,
    medium: 'Watercolour on paper',
    dimensions: '40 × 60 cm',
    description:
      'A folded linen cloth occupies almost the entire picture plane. The challenge here is purely tonal — the white of the cloth against the off-white of the paper, differentiated only by shadow and crease.',
    image: {
      src: `${W}/5/5c/Jean_Baptiste_Simeon_Chardin_-_The_Brioche_-_Google_Art_Project.jpg/1024px-Jean_Baptiste_Simeon_Chardin_-_The_Brioche_-_Google_Art_Project.jpg`,
      alt: 'Jean-Baptiste-Siméon Chardin — The Brioche, 1763, oil on canvas',
      width: 1024,
      height: 861,
    },
    series: 'still-life',
    seriesTitle: 'Domestic Studies',
    available: true,
    tags: ['watercolour', 'still life'],
  },

  // ── Ungrouped works ──────────────────────────────────────────────────────────
  {
    id: '10',
    slug: 'morning-light',
    title: 'Morning Light',
    year: 2024,
    medium: 'Oil on board',
    dimensions: '30 × 40 cm',
    description:
      'A small-format study painted in a single sitting at first light. The brevity of the painting session is legible in the work — marks are decisive, nothing is overworked.',
    image: {
      src: `${W}/7/7e/Camille_Corot_-_Souvenir_of_Mortefontaine.jpg/1024px-Camille_Corot_-_Souvenir_of_Mortefontaine.jpg`,
      alt: 'Camille Corot — Souvenir of Mortefontaine, 1864, oil on canvas',
      width: 1024,
      height: 737,
    },
    available: true,
    tags: ['oil', 'landscape', 'study'],
  },
  {
    id: '11',
    slug: 'dusk-study',
    title: 'Dusk Study',
    year: 2023,
    medium: 'Oil on board',
    dimensions: '30 × 40 cm',
    description:
      'The counterpart to Morning Light — painted at dusk, when colour temperature shifts dramatically and familiar forms become ambiguous. A companion piece intended to hang alongside its pair.',
    image: {
      src: `${W}/9/9b/Frederic_Edwin_Church_-_Twilight_in_the_Wilderness.jpg/1024px-Frederic_Edwin_Church_-_Twilight_in_the_Wilderness.jpg`,
      alt: 'Frederic Edwin Church — Twilight in the Wilderness, 1860, oil on canvas',
      width: 1024,
      height: 609,
    },
    available: false,
    tags: ['oil', 'landscape', 'study'],
  },
  {
    id: '12',
    slug: 'autumn-path',
    title: 'Autumn Path',
    year: 2023,
    medium: 'Oil on canvas',
    dimensions: '60 × 80 cm',
    description:
      'A path through deciduous woodland in October. The painting is structured around the recession of the path itself — a formal device that draws the eye into the picture while the peripheral foliage burns with seasonal colour.',
    image: {
      src: `${W}/e/ec/John_Everett_Millais_-_Autumn_Leaves.jpg/849px-John_Everett_Millais_-_Autumn_Leaves.jpg`,
      alt: 'John Everett Millais — Autumn Leaves, 1856, oil on canvas',
      width: 849,
      height: 1024,
    },
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },
]

export const featuredArtworks = allArtworks.slice(0, 3)
